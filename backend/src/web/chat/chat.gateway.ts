import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { WsGuard } from '../auth/ws-auth.guard';
import { SocketUser } from '../auth/user-socket.decorator';
import { JwtPayload } from 'src/utils/constant';
import {
  validateChatMessage,
  validateChatReadMessage,
} from 'src/validations/ChatMessageValidator';

export interface ChatMessageInterface {
  files?: [
    {
      fileName: string;
      fileBuffer: ArrayBuffer | SharedArrayBuffer;
      fileMime: string;
    },
  ];
  room_id?: number;
  message?: string;
  receiver_id: number;
  task_id: number;
}

export interface MarkChatReadInterface {
  chat_id: Array<number>;
  room_id: number;
  read_all: boolean;
}

const onlineUsers: any = {};
@WebSocketGateway(
  process.env.WEB_SOCKET_PORT ? parseInt(process.env.WEB_SOCKET_PORT) : null,
)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @Inject()
  chatService: ChatService;
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @UseGuards(WsGuard)
  @SubscribeMessage('msgToServer')
  async handleMessage(
    @SocketUser() user: JwtPayload,
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: ChatMessageInterface,
  ): Promise<void> {
    const validate = await validateChatMessage(payload);
    if (!validate.valid) {
      return this.server.emit('msgToClientError', validate);
    }
    const message = await this.chatService.createMessage(user, payload);
    if (message.message === 'true') {
      return this.server.emit('msgToClient', message);
    } else {
      return this.server.emit('msgToClientError', message.data);
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('readMsgToServer')
  async handleReadMessage(
    @SocketUser() user: JwtPayload,
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MarkChatReadInterface,
  ): Promise<void> {
    const validate = await validateChatReadMessage(payload);
    if (!validate.valid) {
      return this.server.emit('readMsgToClientError', validate);
    }
    const message = await this.chatService.readMessage(user, payload);
    if (message.message === 'true') {
      return this.server.emit('readMsgToClient', message);
    } else {
      return this.server.emit('readMsgToClientError', message.data);
    }
  }

  @SubscribeMessage('connectUser')
  async handleOnline(
    @ConnectedSocket() client: Socket,
    @MessageBody() user_id: number,
  ): Promise<void> {
    onlineUsers[client.id] = user_id;
    this.server.emit('online', onlineUsers);
  }

  @SubscribeMessage('listUser')
  async onlineUsersList(@ConnectedSocket() client: Socket): Promise<void> {
    this.server.emit('online', onlineUsers);
  }

  async afterInit(server: Server): Promise<void> {
    this.logger.log('MessageGateway Initialized');
  }

  async handleDisconnect(client: Socket): Promise<void> {
    const user_id = onlineUsers[client.id];
    delete onlineUsers[client.id];
    if (user_id) {
      await this.chatService.makeUserOfflineOnline(user_id);
    }
    this.server.emit('disconnect', onlineUsers);
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
