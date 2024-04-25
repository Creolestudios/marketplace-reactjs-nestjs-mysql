import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import {
  ChatMessagesEntity,
  ChatMessagesReadEntity,
  ChatRoomsEntity,
  RoomParticipantsEntity,
} from 'src/entities/chat.entity';
import { TaskBidsEntity, TasksEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TasksEntity,
      TaskBidsEntity,
      ChatMessagesEntity,
      ChatRoomsEntity,
      ChatMessagesReadEntity,
      RoomParticipantsEntity,
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
