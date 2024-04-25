import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportedTasksEntity, TasksEntity } from 'src/entities/task.entity';
import {
  OutstandingTransactionsEntity,
  TransactionsEntity,
  UserEntity,
} from 'src/entities/user.entity';
import { UsersModule } from 'src/web/users/users.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TransactionsEntity,
      TasksEntity,
      ReportedTasksEntity,
      OutstandingTransactionsEntity,
    ]),
    UsersModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
