import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { values, uniqBy, map, remove, toString } from 'lodash';
import { Repository, IsNull, getManager, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext } from 'nestjs-i18n';
import {
  ChatMessagesEntity,
  ChatMessagesReadEntity,
  RoomParticipantsEntity,
} from 'src/entities/chat.entity';
import { ResponseMap } from 'src/utils/constant';
import {
  BID_STATUS,
  CHAT_READ_STATUS,
  TASK_STATUS,
  USER_ROLE,
} from 'src/utils/enums';
import { GlobalResponseType } from 'src/utils/types';
import { ChatFilterDto } from 'src/dto/admin.dto';
import { TaskBidsEntity, TasksEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(ChatMessagesEntity)
    private ChatMessageRepository: Repository<ChatMessagesEntity>,
    @InjectRepository(ChatMessagesReadEntity)
    private ChatMessagesReadRepository: Repository<ChatMessagesReadEntity>,
    @InjectRepository(RoomParticipantsEntity)
    private RoomParticipantsRepository: Repository<RoomParticipantsEntity>,
    @InjectRepository(TasksEntity)
    private TaskRepository: Repository<TasksEntity>,
    @InjectRepository(TaskBidsEntity)
    private TaskBidsRepository: Repository<TaskBidsEntity>,
  ) {}

  /**
   * Author: Abhee Hudani
   * Description: Admin chat listing API
   * Created At: Jul 12, 2021
   * Update At: Jul 12, 2021
   **/
  async viewChatList(
    user: UserEntity,
    chatFilterDto: ChatFilterDto,
    i18n: I18nContext,
  ): GlobalResponseType {
    try {
      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      const userData = await this.UserRepository.findOne({
        id: user.id,
        deleted_at: IsNull(),
      });

      const taskStatusCondition: Array<number> = [];
      let taskConditions = '';
      let task_join = '';
      let user_join = '';
      let search_condition = '';




      if (chatFilterDto.start_date && chatFilterDto.end_date) {
        task_join = ' LEFT JOIN tasks t on cr.task_id = t.id';
        taskConditions =
          taskConditions +
          ` AND t.created_at BETWEEN '${chatFilterDto.start_date}' AND '${chatFilterDto.end_date}' `;
      }

      if (chatFilterDto.search && chatFilterDto.search.length > 0) {
        task_join = ' LEFT JOIN tasks t on cr.task_id = t.id';
        user_join =
          ' LEFT JOIN users u on t.specialist_id = u.id OR t.employer_id = u.id';
        search_condition = `AND (u.full_name LIKE '%${chatFilterDto.search}%' OR t.title LIKE '%${chatFilterDto.search}%') `;
      }

      chatFilterDto.open_task === 1
        ? taskStatusCondition.push(TASK_STATUS.OPEN)
        : 0;
      chatFilterDto.active_task === 1
        ? taskStatusCondition.push(TASK_STATUS.ACTIVE)
        : 0;
      chatFilterDto.completed_task === 1
        ? taskStatusCondition.push(TASK_STATUS.COMPLETED)
        : 0;
      chatFilterDto.cancelled_task === 1
        ? taskStatusCondition.push(TASK_STATUS.CANCELLED)
        : 0;
      chatFilterDto.reported_task === 1
        ? taskStatusCondition.push(TASK_STATUS.REPORTED)
        : 0;

      if (taskStatusCondition.length > 0) {
        task_join = ' LEFT JOIN tasks t on cr.task_id = t.id';
        taskConditions =
          taskConditions +
          ` AND t.task_status IN (${toString(taskStatusCondition)})`;
      }

      const sqlQuery = `
      SELECT MAX(cr.id) as room_id, cr.task_id,rp.room_status, rp.user_id, cm.user_id as sender, cm.message, cm.media, cm.read_status, cm.created_at from chat_rooms as cr
      LEFT JOIN room_participants rp on cr.id = rp.room_id
      LEFT JOIN chat_messages cm on cr.id = cm.room_id
      ${task_join}
      ${user_join}
      WHERE rp.deleted_at IS NULL ${search_condition} ${taskConditions}
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
        const sender_id = sender;
        const allUsers: Array<Partial<UserEntity>> = [];

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

        const allParticipants = map(chatParticipants, 'user_id');
        const receiver_id = remove(allParticipants, (user_id) => {
          return user_id === sender_id ? false : true;
        });

        const fileResponse = media && media.length > 0 ? JSON.parse(media) : [];
        const allUnreadMessages = await this.ChatMessageRepository.findAndCount(
          // to get all unread room messages
          {
            user_id: Not(userData.id),
            room_id: room_id,
            read_status: CHAT_READ_STATUS.UNREAD,
          },
        );
        const allUnreadMsgs = allUnreadMessages[0];
        let unreadCount = 0;
        for (let i = 0; i < allUnreadMsgs.length; i++) {
          const readMsg = await this.ChatMessagesReadRepository.findOne({
            // to get count of total unread messages of login user
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

        let bid_details: TaskBidsEntity = null;
        if (taskData.specialist_id) {
          bid_details = await this.TaskBidsRepository.findOne({
            task_id: taskData.id,
            specialist_id: taskData.specialist_id,
            bid_status: BID_STATUS.ACTIVE,
            deleted_at: IsNull(),
          });
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
          bid_details: bid_details ? bid_details : null,
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
}
