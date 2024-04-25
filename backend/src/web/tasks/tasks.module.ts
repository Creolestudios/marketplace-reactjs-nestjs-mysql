import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';
import {
  OutstandingTransactionsEntity,
  TransactionsEntity,
  UserEntity,
} from 'src/entities/user.entity';
import {
  TaskBidsEntity,
  TaskMediaEntity,
  TasksEntity,
  TaskReviewsEntity,
  TaskCancellationHistoryEntity,
  ReportedTasksEntity,
} from 'src/entities/task.entity';
import { NotificationsEntity } from 'src/entities/notification.entity';
import { CategoryEntity } from 'src/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TasksEntity,
      TaskMediaEntity,
      TaskBidsEntity,
      TaskReviewsEntity,
      TaskCancellationHistoryEntity,
      ReportedTasksEntity,
      TransactionsEntity,
      NotificationsEntity,
      CategoryEntity,
      OutstandingTransactionsEntity,
    ]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
