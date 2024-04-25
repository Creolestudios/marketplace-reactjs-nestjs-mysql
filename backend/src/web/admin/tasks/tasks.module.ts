import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import {
  ReportedTasksEntity,
  TaskBidsEntity,
  TaskDisgreementHistoryEntity,
  TaskMediaEntity,
  TasksEntity,
} from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TasksEntity,
      TaskBidsEntity,
      TaskMediaEntity,
      ReportedTasksEntity,
      CategoryEntity,
      TaskDisgreementHistoryEntity,
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
