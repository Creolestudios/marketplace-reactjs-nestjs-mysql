import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, In, IsNull, Not, Repository } from 'typeorm';
import { filter, find, map, remove, uniqBy, values } from 'lodash';
import { ChatMessageInterface, MarkChatReadInterface } from './chat.gateway';
import { UserEntity } from 'src/entities/user.entity';
import {
  ChatRoomsEntity,
  RoomParticipantsEntity,
  ChatMessagesEntity,
  ChatMessagesReadEntity,
} from 'src/entities/chat.entity';
import { GlobalResponseType } from 'src/utils/types';
import { I18nContext } from 'nestjs-i18n';
import {
  FILE_ERROR,
  FILE_PATH,
  FILE_SIZE,
  JwtPayload,
  ResponseMap,
  SuccessMessage,
  VALIDATION_CHAT_MSG,
  VALIDATION_TASK_MSG,
} from 'src/utils/constant';
import { TaskBidsEntity, TasksEntity } from 'src/entities/task.entity';
import {
  chatFileFilter,
  editChatFileName,
  chatFileUpload,
} from 'src/utils/file-uploading.utils';
import { FileNameDto } from 'src/dto/file.dto';
import {
  MarkChatReadDto,
  MarkChatRoomTrashDto,
  ViewChatAttachmentsDto,
  ViewChatHistoryDto,
  ViewRecentChatsDto,
} from 'src/dto/user.dto';
import {
  BID_STATUS,
  CHAT_BY_TYPE,
  CHAT_READ_STATUS,
  CHAT_ROOM_STATUS,
  ORDER_BY_TYPE,
  TASK_STATUS,
  USER_ROLE,
} from 'src/utils/enums';
import { maskChatData } from 'src/utils/functions.utils';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(ChatMessagesEntity)
    private ChatMessageRepository: Repository<ChatMessagesEntity>,
    @InjectRepository(ChatRoomsEntity)
    private ChatRoomRepository: Repository<ChatRoomsEntity>,
    @InjectRepository(RoomParticipantsEntity)
    private RoomParticipantsRepository: Repository<RoomParticipantsEntity>,
    @InjectRepository(TasksEntity)
    private TaskRepository: Repository<TasksEntity>,
    @InjectRepository(TaskBidsEntity)
    private TaskBidsRepository: Repository<TaskBidsEntity>,
    @InjectRepository(ChatMessagesReadEntity)
    private ChatMessagesReadRepository: Repository<ChatMessagesReadEntity>,
  ) {}

  public makeUserOfflineOnline = async (user_id: number): Promise<any> => {
    try {
      const userData = await this.UserRepository.findOne({
        where: { id: user_id, deleted_at: IsNull() },
      });
      // Mark Last Seen
      if (userData) {
        userData.last_seen = new Date();
        await userData.save();
      }
    } catch (err) {
      console.log('User Online Err:', err);
      return ResponseMap(
        {
          data: err,
        },
        'false',
      );
    }
  };

  /**
   * Author: Abhee Hudani
   * Description: User create chat message
   * Created At: Jul 6, 2021
   * Update At: Jul 6, 2021
   **/
  public createMessage = async (
    user: JwtPayload,
    payload: ChatMessageInterface,
  ): GlobalResponseType => {
    try {
      //msg sending validations

      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });
      let chatInit = false;
      const taskData = await this.TaskRepository.findOne({
        where: {
          id: payload.task_id,
          deleted_at: IsNull(),
        },
      });

      if (!taskData) {
        throw new BadGatewayException(VALIDATION_TASK_MSG.no_task);
      }

      if (taskData) {
        if (
          taskData.task_status === TASK_STATUS.OPEN &&
          payload.files &&
          payload.files.length > 0
        ) {
          throw new BadGatewayException(
            VALIDATION_CHAT_MSG.no_attachment_open_task,
          );
        }

        // E can initiate a chat with S if S has offered a bid to E's task. In this case, S cannot initiate the chat.
        if (taskData.employer_id === user.user_id) {
          if (
            taskData.specialist_id === payload.receiver_id ||
            payload.receiver_id === adminData.id
          ) {
            chatInit = true;
          } else {
            const specialistBid = await this.TaskBidsRepository.findOne({
              task_id: payload.task_id,
              specialist_id: payload.receiver_id,
              deleted_at: IsNull(),
            });
            if (specialistBid) {
              chatInit = true;
            }
          }
          // If S wants to send message after task is marked as active
        } else if (
          (taskData.specialist_id === user.user_id &&
            taskData.employer_id === payload.receiver_id) ||
          payload.receiver_id === adminData.id
        ) {
          chatInit = true;
        }

        const specialistBid = await this.TaskBidsRepository.findOne({
          task_id: payload.task_id,
          specialist_id: user.user_id,
          deleted_at: IsNull(),
        });
        //TODO: check this condition
        if (specialistBid) {
          chatInit = true;
        }

        //S can initiate a chat with E if E has suggested his/her task to S. In this case, E cannot initiate the chat.
        if (taskData.invited_users) {
          const suggestedTask = JSON.parse(taskData.invited_users);
          const invited = find(suggestedTask, (data) => {
            return data.specialist_id === user.user_id ? true : false;
          });
          chatInit = invited;
        }
      }

      if (!chatInit && user.user_role !== USER_ROLE.ADMIN) {
        throw new BadGatewayException(VALIDATION_CHAT_MSG.no_init_chat);
      }

      filter(payload.files, (file) => {
        return chatFileFilter(file.fileName);
      });

      filter(payload.files, (file) => {
        const mime = file.fileMime.split('/')[0];
        const fileName = file.fileName;
        const fileSize = Buffer.byteLength(file.fileBuffer);
        if (
          (mime === 'application' || mime === 'image') &&
          fileSize > FILE_SIZE.chat_image_application
        ) {
          throw new BadGatewayException(
            `${fileName}: ${FILE_ERROR.big_image_application}`,
          );
        } else if (mime === 'video' && fileSize > FILE_SIZE.chat_video) {
          throw new BadGatewayException(`${fileName}: ${FILE_ERROR.big_video}`);
        }
      });

      const media = payload.files;

      const fileResponse = [];
      if (media) {
        for (let i = 0; i < media.length; i++) {
          const originalName = media[i].fileName;
          const fileBuffer = media[i].fileBuffer;
          const newName = editChatFileName(originalName);
          const fileSize = Buffer.byteLength(media[i].fileBuffer);
          const media_path = await chatFileUpload(
            newName,
            fileBuffer,
            FILE_PATH.chat_media,
          );
          const file_type = media[i].fileMime.split('/');
          const file = media_path;
          const fileNameObj: FileNameDto = {
            originalname: media[i].fileName,
            filename: file,
            mimetype: file_type[0],
            size: fileSize,
          };
          fileResponse.push(fileNameObj);
        }
      }
      let chatRoom: ChatRoomsEntity = null;
      if (payload.room_id) {
        chatRoom = await this.ChatRoomRepository.findOne({
          id: payload.room_id,
          task_id: payload.task_id,
          deleted_at: IsNull(),
        });
      } else {
        const sqlQuery = `
        SELECT cm.id as room_id, rp.user_id FROM  chat_rooms cm
        LEFT JOIN room_participants rp on cm.id = rp.room_id
        WHERE rp.user_id IN (${user.user_id},${payload.receiver_id}) AND cm.task_id = ${payload.task_id} AND rp.deleted_at IS NULL AND cm.deleted_at IS NULL
        `;
        const entityManager = getManager();
        const roomData = await entityManager.query(sqlQuery);
        const room = values(roomData);
        if (room && room.length === 2) {
          chatRoom = await this.ChatRoomRepository.findOne({
            id: +room[0].room_id,
            deleted_at: IsNull(),
          });
        }
      }

      let newChat: ChatMessagesEntity = null;

      if (chatRoom && payload.room_id) {
        const chatSenderParticipant = await this.RoomParticipantsRepository.findOne(
          {
            where: {
              room_id: chatRoom.id,
              user_id: user.user_id,
              deleted_at: IsNull(),
            },
          },
        );
        if (
          chatSenderParticipant &&
          chatSenderParticipant.room_status !== CHAT_ROOM_STATUS.ACTIVE
        ) {
          if (user.user_role === USER_ROLE.ADMIN) {
            chatSenderParticipant.room_status = CHAT_ROOM_STATUS.ACTIVE;
            await chatSenderParticipant.save();
          } else {
            throw new BadGatewayException(VALIDATION_CHAT_MSG.room_not_active);
          }
        }
        const chatRecipientParticipant = await this.RoomParticipantsRepository.findOne(
          {
            where: {
              room_id: chatRoom.id,
              user_id: payload.receiver_id,
              deleted_at: IsNull(),
            },
          },
        );
        if (
          chatRecipientParticipant &&
          chatRecipientParticipant.room_status !== CHAT_ROOM_STATUS.ACTIVE
        ) {
          if (user.user_role === USER_ROLE.ADMIN) {
            chatRecipientParticipant.room_status = CHAT_ROOM_STATUS.ACTIVE;
            await chatSenderParticipant.save();
          } else {
            throw new BadGatewayException(VALIDATION_CHAT_MSG.room_not_active);
          }
        }

        if (user.user_role === USER_ROLE.ADMIN) {
          const chatAdminParticipant = await this.RoomParticipantsRepository.findOne(
            {
              where: {
                room_id: chatRoom.id,
                user_id: user.user_id,
                deleted_at: IsNull(),
              },
            },
          );
          if (!chatAdminParticipant) {
            const adminRoomParticipant = new RoomParticipantsEntity();
            adminRoomParticipant.room_id = chatRoom.id;
            adminRoomParticipant.user_id = user.user_id;
            adminRoomParticipant.room_status = CHAT_ROOM_STATUS.ACTIVE;
            await adminRoomParticipant.save();
          }

          //Admin changes the status of rooms which are not active
          await this.RoomParticipantsRepository.update(
            {
              room_id: chatRoom.id,
              room_status: Not(CHAT_ROOM_STATUS.ACTIVE),
              deleted_at: IsNull(),
            },
            {
              room_status: CHAT_ROOM_STATUS.ACTIVE,
            },
          );
        }

        if (
          (chatSenderParticipant && chatRecipientParticipant) ||
          user.user_role === USER_ROLE.ADMIN
        ) {
          newChat = new ChatMessagesEntity();
          newChat.user_id = user.user_id;
          newChat.read_status = CHAT_READ_STATUS.UNREAD;
          if (taskData.task_status !== TASK_STATUS.ACTIVE) {
            // If task not active !
            newChat.message = payload.message
              ? maskChatData(payload.message, 7)
              : null;
          } else {
            newChat.message = payload.message;
          }
          newChat.media =
            fileResponse.length > 0 ? JSON.stringify(fileResponse) : null;
          newChat.room_id = chatRoom.id;
          await newChat.save();
        }
      } else {
        const newRoom = new ChatRoomsEntity();
        newRoom.task_id = payload.task_id;
        await newRoom.save();

        const senderRoomParticipant = new RoomParticipantsEntity();
        senderRoomParticipant.room_id = newRoom.id;
        senderRoomParticipant.user_id = user.user_id;
        senderRoomParticipant.room_status = CHAT_ROOM_STATUS.ACTIVE;
        await senderRoomParticipant.save();

        const recipientRoomParticipant = new RoomParticipantsEntity();
        recipientRoomParticipant.room_id = newRoom.id;
        recipientRoomParticipant.user_id = payload.receiver_id;
        recipientRoomParticipant.room_status = CHAT_ROOM_STATUS.ACTIVE;
        await recipientRoomParticipant.save();

        newChat = new ChatMessagesEntity();
        newChat.user_id = user.user_id;
        newChat.read_status = CHAT_READ_STATUS.UNREAD;
        if (taskData.task_status !== TASK_STATUS.ACTIVE) {
          // If task not active !
          newChat.message = payload.message
            ? maskChatData(payload.message, 7)
            : null;
        } else {
          newChat.message = payload.message;
        }
        newChat.media =
          fileResponse.length > 0 ? JSON.stringify(fileResponse) : null;
        newChat.room_id = newRoom.id;
        await newChat.save();
      }

      const senderData = await this.UserRepository.findOne({
        where: { id: user.user_id, deleted_at: IsNull() },
      });

      const receiverData = await this.UserRepository.findOne({
        where: { id: payload.receiver_id, deleted_at: IsNull() },
      });

      const createdAt = newChat.created_at;

      return ResponseMap(
        {
          task: taskData,
          media: fileResponse,
          message_id: newChat.id,
          message: newChat.message,
          sender_data: senderData,
          receiver_data: [receiverData],
          created_at: createdAt,
          is_read: CHAT_READ_STATUS.UNREAD,
          room_id: newChat.room_id,
        },
        'true',
      );
    } catch (err) {
      console.log('ERR', err);
      return ResponseMap(
        {
          data: err,
        },
        'false',
      );
    }
  };

  /**
   * Author: Abhee Hudani
   * Description: Mark chat as read via socket
   * Created At: Jul 13, 2021
   * Update At: Jul 13, 2021
   **/
  public readMessage = async (
    user: JwtPayload,
    markChatRead: MarkChatReadInterface,
  ): GlobalResponseType => {
    try {
      const chatRoom = await this.ChatRoomRepository.findOne({
        id: markChatRead.room_id,
        deleted_at: IsNull(),
      });

      if (!chatRoom) {
        throw new BadRequestException(VALIDATION_CHAT_MSG.no_room_found);
      }

      const chatParticipants = await this.RoomParticipantsRepository.find({
        where: {
          room_id: chatRoom.id,
          deleted_at: IsNull(),
        },
      });
      const allParticipants = map(chatParticipants, 'user_id');
      const readMessages: Array<number> = [];

      if (
        !allParticipants.includes(user.user_id) &&
        user.user_role !== USER_ROLE.ADMIN
      ) {
        throw new BadRequestException(VALIDATION_CHAT_MSG.user_not_participant);
      } else {
        if (markChatRead.read_all) {
          const allUnreadMessages = await this.ChatMessageRepository.find({
            where: {
              room_id: chatRoom.id,
              user_id: Not(user.user_id),
              read_status: CHAT_READ_STATUS.UNREAD,
              deleted_at: IsNull(),
            },
          });
          for (let i = 0; i < allUnreadMessages.length; i++) {
            const msg = allUnreadMessages[i];
            const chatMessage = await this.ChatMessagesReadRepository.findOne({
              where: {
                chat_messages_id: msg.id,
                read_by: user.user_id,
                deleted_at: IsNull(),
              },
            });
            if (!chatMessage) {
              readMessages.push(msg.id);
              const readMessage = new ChatMessagesReadEntity();
              readMessage.chat_messages_id = msg.id;
              readMessage.read_by = user.user_id;
              readMessage.read_at = new Date();
              await readMessage.save();
            }
            const msgReadByAll = await this.ChatMessagesReadRepository.findAndCount(
              {
                where: {
                  chat_messages_id: msg.id,
                  read_by: In(allParticipants),
                  deleted_at: IsNull(),
                },
              },
            );
            if (msgReadByAll[1] === allParticipants.length - 1) {
              msg.read_status = CHAT_READ_STATUS.READ;
              await msg.save();
            }
          }
        } else {
          const chatIDs = markChatRead.chat_id;
          const allUnreadMessages = await this.ChatMessageRepository.find({
            where: {
              id: In(chatIDs),
              room_id: chatRoom.id,
              user_id: Not(user.user_id),
              read_status: CHAT_READ_STATUS.UNREAD,
              deleted_at: IsNull(),
            },
          });
          for (let i = 0; i < allUnreadMessages.length; i++) {
            const msg = allUnreadMessages[i];
            const chatMessage = await this.ChatMessagesReadRepository.findOne({
              where: {
                chat_messages_id: msg.id,
                read_by: user.user_id,
                deleted_at: IsNull(),
              },
            });
            if (!chatMessage) {
              readMessages.push(msg.id);
              const readMessage = new ChatMessagesReadEntity();
              readMessage.chat_messages_id = msg.id;
              readMessage.read_by = user.user_id;
              readMessage.read_at = new Date();
              await readMessage.save();
            }
            const msgReadByAll = await this.ChatMessagesReadRepository.findAndCount(
              {
                where: {
                  chat_messages_id: msg.id,
                  read_by: In(allParticipants),
                  deleted_at: IsNull(),
                },
              },
            );
            if (msgReadByAll[1] === allParticipants.length - 1) {
              msg.read_status = CHAT_READ_STATUS.READ;
              await msg.save();
            }
          }
        }
      }
      return ResponseMap(
        {
          room: chatRoom,
          chat_id: readMessages,
          id: markChatRead.chat_id,
          read: true,
        },
        'true',
      );
    } catch (err) {
      console.log('ERR', err);
      return ResponseMap(
        {
          data: err,
        },
        'false',
      );
    }
  };

  /**
   * Author: Abhee Hudani
   * Description: User chat listing API
   * Created At: Jul 6, 2021
   * Update At: Jul 12, 2021
   **/
  async viewRecentChats(
    user: UserEntity,
    viewRecentChatsDto: ViewRecentChatsDto,
    i18n: I18nContext,
  ): GlobalResponseType {
    try {
      const adminData = await this.UserRepository.findOne({
        user_role: USER_ROLE.ADMIN,
        deleted_at: IsNull(),
      });

      const userData = await this.UserRepository.findOne({
        id: user.id,
        deleted_at: IsNull(),
      });

      let chat_by_condition = '';
      let task_join = '';
      let room_status = '';
      let user_join = '';
      let search_condition = '';

      if (viewRecentChatsDto.chat_by !== null) {
        switch (viewRecentChatsDto.chat_by) {
          // it work same as my task employer and specialist filter
          case CHAT_BY_TYPE.EMPLOYER:
            // it shows those task chats in which i worked as employer
            task_join = ' LEFT JOIN tasks t on cr.task_id = t.id';
            chat_by_condition = ` AND t.employer_id = ${user.id}`;
            break;
          case CHAT_BY_TYPE.SPECIALIST:
            task_join = ' LEFT JOIN tasks t on cr.task_id = t.id';
            chat_by_condition = ` AND t.specialist_id = ${user.id}`;
            break;
          case CHAT_BY_TYPE.BOTH:
            task_join = '';
            chat_by_condition = '';
            break;
        }
      }

      if (viewRecentChatsDto.search && viewRecentChatsDto.search.length > 0) {
        task_join = ' LEFT JOIN tasks t on cr.task_id = t.id';
        user_join =
          ' LEFT JOIN users u on t.specialist_id = u.id OR t.employer_id = u.id';
        search_condition = `AND (u.full_name LIKE '%${viewRecentChatsDto.search}%' OR t.title LIKE '%${viewRecentChatsDto.search}%') `;
      }

      if (viewRecentChatsDto.chat_type) {
        if (viewRecentChatsDto.chat_type === CHAT_ROOM_STATUS.ACTIVE) {
          room_status = ` AND rp.room_status = ${CHAT_ROOM_STATUS.ACTIVE}`;
        }
        if (viewRecentChatsDto.chat_type === CHAT_ROOM_STATUS.TRASH) {
          room_status = ` AND rp.room_status = ${CHAT_ROOM_STATUS.TRASH}`;
        }
        if (viewRecentChatsDto.chat_type === CHAT_ROOM_STATUS.ARCHIVED) {
          if (user.id === adminData.id) {
            room_status = ` AND rp.room_status = ${CHAT_ROOM_STATUS.ARCHIVED}`;
          } else {
            throw new BadRequestException(
              await i18n.translate(
                'validation_chat.user_can_not_archived_chat',
              ),
            );
          }
        }
      }

      const sqlQuery = `
      SELECT MAX(cr.id) as room_id, cr.task_id,rp.room_status, rp.user_id, cm.user_id as sender, cm.message, cm.media, cm.read_status, cm.created_at from chat_rooms as cr
      LEFT JOIN room_participants rp on cr.id = rp.room_id
      LEFT JOIN chat_messages cm on cr.id = cm.room_id
      ${task_join}
      ${user_join}
      WHERE rp.user_id = ${user.id} ${chat_by_condition} ${room_status} ${search_condition}
      GROUP BY cr.task_id, rp.room_status, rp.user_id, cm.user_id, cm.message, cm.media, cm.read_status, cm.created_at
      ORDER BY cm.created_at DESC`;

      const entityManager = getManager();
      const resultResponse = await entityManager.query(sqlQuery);
      const resultValues = values(resultResponse);
      const total_unique_chats = uniqBy(resultValues, 'task_id');
      const allChatData = [];

      for (let i = 0; i < total_unique_chats.length; i++) {
        const room_id = +total_unique_chats[i].room_id;
        const task = +total_unique_chats[i].task_id;
        const media = total_unique_chats[i].media;
        const sender = +total_unique_chats[i].sender;
        const message = total_unique_chats[i].message;
        const createdAt = total_unique_chats[i].created_at;
        const allUsers: Array<Partial<UserEntity>> = [];
        let sender_id = 0;

        const chatParticipants = await this.RoomParticipantsRepository.find({
          where: {
            room_id: room_id,
            deleted_at: IsNull(),
          },
        });

        const taskData = await this.TaskRepository.findOne({
          where: {
            id: task,
            deleted_at: IsNull(),
          },
        });

        for (let i = 0; i < chatParticipants.length; i++) {
          const user = await this.UserRepository.findOne({
            where: { id: chatParticipants[i].user_id },
          });
          allUsers.push(user);
        }
        sender_id = sender;
        const allParticipants = map(chatParticipants, 'user_id');

        const receiver_id = remove(allParticipants, (user_id) => {
          return user_id === sender_id || user_id === adminData.id
            ? false
            : true;
        })[0];

        const fileResponse = media && media.length > 0 ? JSON.parse(media) : [];
        // it find total messages not sent by this user
        const allUnreadMessages = await this.ChatMessageRepository.findAndCount(
          {
            user_id: Not(userData.id),
            room_id: room_id,
            read_status: CHAT_READ_STATUS.UNREAD,
          },
        );
        const allUnreadMsgs = allUnreadMessages[0];
        let unreadCount = 0;
        // it check for the message read status of logged in user, whether it is read by logged in user or not
        for (let i = 0; i < allUnreadMsgs.length; i++) {
          const readMsg = await this.ChatMessagesReadRepository.findOne({
            where: {
              chat_messages_id: allUnreadMsgs[i].id,
              read_by: user.id,
              deleted_at: IsNull(),
            },
          });
          if (!readMsg) {
            unreadCount = unreadCount + 1;
          }
        }

        const object = {
          room_id: room_id,
          task: taskData,
          media: fileResponse,
          message: message,
          sender_id: sender_id,
          receiver_id: receiver_id,
          users: allUsers,
          unreadCount: unreadCount,
          created: createdAt,
        };

        allChatData.push(object);
      }
      return ResponseMap(
        {
          chatData: allChatData,
        },
        await i18n.translate('success.success'),
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Author: Abhee Hudani
   * Description: User chat history for single chat room
   * Created At: Jul 8, 2021
   * Update At: Jul 8, 2021
   **/
  async viewChatHistory(
    user: UserEntity,
    viewChatDetailsDto: ViewChatHistoryDto,
    i18n: I18nContext,
  ): GlobalResponseType {
    try {
      const take = viewChatDetailsDto.limit;
      const page = viewChatDetailsDto.page;
      const skip = (page - 1) * take;
      let userRoomData: any = null;
      let otherParticipantRoom: any = null;

      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      const chatRoom = await this.ChatRoomRepository.findOne({
        id: viewChatDetailsDto.room_id,
        deleted_at: IsNull(),
      });

      if (!chatRoom) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.no_room_found'),
        );
      }

      const chatParticipants = await this.RoomParticipantsRepository.find({
        where: {
          room_id: chatRoom.id,
          deleted_at: IsNull(),
        },
      });
      const allParticipants = map(chatParticipants, 'user_id');

      if (
        user.user_role !== USER_ROLE.ADMIN &&
        !allParticipants.includes(user.id)
      ) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.user_not_participant'),
        );
      }

      const userIds = filter(allParticipants, (user_id) => {
        return user_id === adminData.id ? false : true;
      });

      const user1 = userIds[0];
      const user2 = userIds[1];

      const userRoomDataA = filter(chatParticipants, (room) => {
        if (user.id === adminData.id) {
          if (room.user_id === user1) {
            return room;
          }
        } else {
          if (room.user_id === user.id) {
            return room;
          }
        }
      })[0];

      userRoomData = userRoomDataA;
      let room_status = {
        active: true,
        message: null,
      };

      const otherParticipantRoomA = filter(chatParticipants, (room) => {
        if (user.id === adminData.id) {
          if (room.user_id === user2) {
            return room;
          }
        } else {
          if (room.user_id !== user.id && room.user_id !== adminData.id) {
            return room;
          }
        }
      })[0];

      otherParticipantRoom = otherParticipantRoomA;

      if (
        userRoomData.room_status !== CHAT_ROOM_STATUS.ACTIVE ||
        otherParticipantRoom.room_status !== CHAT_ROOM_STATUS.ACTIVE
      ) {
        room_status = {
          active: false,
          message: await i18n.translate('validation_chat.room_not_active'),
        };
      }

      if (
        userRoomData.room_status === CHAT_ROOM_STATUS.ARCHIVED &&
        user.user_role !== USER_ROLE.ADMIN
      ) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.room_permanent_deleted'),
        );
      }

      const taskDetails = await this.TaskRepository.findOne({
        where: { id: chatRoom.task_id, deleted_at: IsNull() },
      });

      const allParticipantsData = await this.UserRepository.find({
        where: { id: In(allParticipants), deleted_at: IsNull() },
      });

      const allChats = await this.ChatMessageRepository.findAndCount({
        where: { room_id: chatRoom.id, deleted_at: IsNull() },
        order: { created_at: ORDER_BY_TYPE.DESC },
        skip: skip,
        take: take,
      });

      const chatHistory: Array<any> = [];
      const chatMessages = allChats[0];
      if (chatMessages.length > 0) {
        for (let i = 0; i < chatMessages.length; i++) {
          const msg = chatMessages[i];
          const obj = {
            room_id: msg.room_id,
            message_id: msg.id,
            message: msg.message,
            media:
              msg.media && msg.media.length > 0 ? JSON.parse(msg.media) : [],
            is_read: msg.read_status,
            created_at: msg.created_at,
            sender_data: filter(allParticipantsData, (data) => {
              if (data.id === msg.user_id) {
                return data;
              }
            })[0],
            receiver_data: filter(allParticipantsData, (data) => {
              if (data.id !== msg.user_id) {
                return data;
              }
            }),
          };
          chatHistory.push(obj);
        }
      }

      let bid_details: TaskBidsEntity = null;
      if (taskDetails.specialist_id) {
        bid_details = await this.TaskBidsRepository.findOne({
          task_id: taskDetails.id,
          specialist_id: taskDetails.specialist_id,
          bid_status: BID_STATUS.ACTIVE,
          deleted_at: IsNull(),
        });
      }

      return ResponseMap(
        {
          chat: chatHistory,
          task: taskDetails,
          room: chatRoom,
          room_status: room_status,
          totalData: allChats[1],
          bid_details: bid_details ? bid_details : null,
        },
        await i18n.translate('success.success'),
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Author: Abhee Hudani
   * Description: delete or permanent delete single chat room
   * Created At: Jul 8, 2021
   * Update At: Jul 8, 2021
   **/
  async markChatHistoryTrash(
    user: UserEntity,
    markChatRoomTrash: MarkChatRoomTrashDto,
    i18n: I18nContext,
  ): GlobalResponseType {
    try {
      const chatRoom = await this.ChatRoomRepository.findOne({
        id: markChatRoomTrash.room_id,
        deleted_at: IsNull(),
      });

      if (!chatRoom) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.no_room_found'),
        );
      }

      const chatParticipants = await this.RoomParticipantsRepository.find({
        where: {
          room_id: chatRoom.id,
          deleted_at: IsNull(),
        },
      });
      const allParticipants = map(chatParticipants, 'user_id');

      if (!allParticipants.includes(user.id)) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.user_not_participant'),
        );
      } else {
        const userRoomData = await this.RoomParticipantsRepository.findOne({
          where: {
            room_id: chatRoom.id,
            user_id: user.id,
            deleted_at: IsNull(),
          },
        });

        if (userRoomData.room_status === CHAT_ROOM_STATUS.ARCHIVED) {
          throw new BadRequestException(
            await i18n.translate('validation_chat.room_already_archived'),
          );
        }
        if (
          userRoomData.room_status !== CHAT_ROOM_STATUS.ACTIVE &&
          markChatRoomTrash.room_status === 1
        ) {
          throw new BadRequestException(
            await i18n.translate('validation_chat.room_not_active_trash'),
          );
        }
        if (
          userRoomData.room_status === CHAT_ROOM_STATUS.TRASH &&
          markChatRoomTrash.room_status !== 2
        ) {
          throw new BadRequestException(
            await i18n.translate('validation_chat.room_not_trash_archive'),
          );
        }
        userRoomData.room_status =
          markChatRoomTrash.room_status === 1
            ? CHAT_ROOM_STATUS.TRASH
            : CHAT_ROOM_STATUS.ARCHIVED;
        await userRoomData.save();
        return ResponseMap(
          {
            room: userRoomData,
          },
          await i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Author: Abhee Hudani
   * Description: mark chat messages as read
   * Created At: Jul 8, 2021
   * Update At: Jul 12, 2021
   **/
  async markChatRead(
    user: UserEntity,
    markChatRead: MarkChatReadDto,
    i18n: I18nContext,
  ): GlobalResponseType {
    try {
      const chatRoom = await this.ChatRoomRepository.findOne({
        id: markChatRead.room_id,
        deleted_at: IsNull(),
      });

      if (!chatRoom) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.no_room_found'),
        );
      }

      const chatParticipants = await this.RoomParticipantsRepository.find({
        where: {
          room_id: chatRoom.id,
          deleted_at: IsNull(),
        },
      });
      const allParticipants = map(chatParticipants, 'user_id');

      if (!allParticipants.includes(user.id)) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.user_not_participant'),
        );
      } else {
        if (markChatRead.read_all) {
          const allUnreadMessages = await this.ChatMessageRepository.find({
            where: {
              room_id: chatRoom.id,
              user_id: Not(user.id),
              read_status: CHAT_READ_STATUS.UNREAD,
              deleted_at: IsNull(),
            },
          });
          for (let i = 0; i < allUnreadMessages.length; i++) {
            const msg = allUnreadMessages[i];
            const chatMessage = await this.ChatMessagesReadRepository.findOne({
              where: {
                chat_messages_id: msg.id,
                read_by: user.id,
                deleted_at: IsNull(),
              },
            });
            if (!chatMessage) {
              const readMessage = new ChatMessagesReadEntity();
              readMessage.chat_messages_id = msg.id;
              readMessage.read_by = user.id;
              readMessage.read_at = new Date();
              await readMessage.save();
            }
            const msgReadByAll = await this.ChatMessagesReadRepository.findAndCount(
              {
                where: {
                  chat_messages_id: msg.id,
                  read_by: In(allParticipants),
                  deleted_at: IsNull(),
                },
              },
            );
            if (msgReadByAll[1] === allParticipants.length - 1) {
              msg.read_status = CHAT_READ_STATUS.READ;
              await msg.save();
            }
          }
        } else {
          const chatIDs = markChatRead.chat_id;
          const allUnreadMessages = await this.ChatMessageRepository.find({
            where: {
              id: In(chatIDs),
              room_id: chatRoom.id,
              user_id: Not(user.id),
              read_status: CHAT_READ_STATUS.UNREAD,
              deleted_at: IsNull(),
            },
          });
          for (let i = 0; i < allUnreadMessages.length; i++) {
            const msg = allUnreadMessages[i];
            const chatMessage = await this.ChatMessagesReadRepository.findOne({
              where: {
                chat_messages_id: msg.id,
                read_by: user.id,
                deleted_at: IsNull(),
              },
            });
            if (!chatMessage) {
              const readMessage = new ChatMessagesReadEntity();
              readMessage.chat_messages_id = msg.id;
              readMessage.read_by = user.id;
              readMessage.read_at = new Date();
              await readMessage.save();
            }
            const msgReadByAll = await this.ChatMessagesReadRepository.findAndCount(
              {
                where: {
                  chat_messages_id: msg.id,
                  read_by: In(allParticipants),
                  deleted_at: IsNull(),
                },
              },
            );
            if (msgReadByAll[1] === allParticipants.length - 1) {
              msg.read_status = CHAT_READ_STATUS.READ;
              await msg.save();
            }
          }
        }
      }
      return ResponseMap(
        {
          room: chatRoom,
        },
        await i18n.translate('success.success'),
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Author: Abhee Hudani
   * Description: view past attachments of a chat room
   * Created At: Jul 8, 2021
   * Update At: Jul 8, 2021
   **/
  async viewChatAttachments(
    user: UserEntity,
    viewChatAttachments: ViewChatAttachmentsDto,
    i18n: I18nContext,
  ): GlobalResponseType {
    try {
      const take = viewChatAttachments.limit;
      const page = viewChatAttachments.page;
      const skip = (page - 1) * take;

      const chatRoom = await this.ChatRoomRepository.findOne({
        id: viewChatAttachments.room_id,
        deleted_at: IsNull(),
      });

      if (!chatRoom) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.no_room_found'),
        );
      }

      const chatParticipants = await this.RoomParticipantsRepository.find({
        where: {
          room_id: chatRoom.id,
          deleted_at: IsNull(),
        },
      });

      const allParticipantIDs = map(chatParticipants, 'user_id');
      const fileResponse: Array<any> = [];

      if (!allParticipantIDs.includes(user.id)) {
        throw new BadRequestException(
          await i18n.translate('validation_chat.user_not_participant'),
        );
      } else {
        const allParticipantsData = await this.UserRepository.find({
          where: { id: In(allParticipantIDs), deleted_at: IsNull() },
        });

        const allMessages = await this.ChatMessageRepository.findAndCount({
          where: {
            room_id: chatRoom.id,
            media: Not(IsNull()),
            deleted_at: IsNull(),
          },
          order: { created_at: ORDER_BY_TYPE.DESC },
          skip: skip,
          take: take,
        });
        const chatMessages = allMessages[0];
        for (let i = 0; i < chatMessages.length; i++) {
          const msg = chatMessages[i];
          const obj = {
            message: msg.message,
            media:
              msg.media && msg.media.length > 0 ? JSON.parse(msg.media) : [],
            sender_data: filter(allParticipantsData, (data) => {
              if (data.id === msg.user_id) {
                return data;
              }
            })[0],
            receiver_data: filter(allParticipantsData, (data) => {
              if (data.id !== msg.user_id) {
                return data;
              }
            }),
            created_at: msg.created_at,
          };
          fileResponse.push(obj);
        }
        return ResponseMap(
          {
            room: chatRoom,
            attachments: fileResponse,
            totalData: allMessages[1],
          },
          await i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
