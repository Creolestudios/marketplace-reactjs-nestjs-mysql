import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TasksEntity, TaskBidsEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  ChatMessagesEntity,
  ChatMessagesReadEntity,
  ChatRoomsEntity,
  RoomParticipantsEntity,
} from 'src/entities/chat.entity';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TasksEntity,
      TaskBidsEntity,
      ChatMessagesEntity,
      ChatRoomsEntity,
      RoomParticipantsEntity,
      ChatMessagesReadEntity,
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
