import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  OutstandingTransactionsEntity,
  TransactionsEntity,
  UserCardsEntity,
  UserCategoriesServicesEntity,
  UserEntity,
  UserReportProfileEntity,
} from 'src/entities/user.entity';
import {
  TaskBidsEntity,
  TaskReviewsEntity,
  TasksEntity,
} from 'src/entities/task.entity';
import { ServicesEntity } from 'src/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserCardsEntity,
      TasksEntity,
      TaskBidsEntity,
      TransactionsEntity,
      OutstandingTransactionsEntity,
      TaskReviewsEntity,
      UserCategoriesServicesEntity,
      ServicesEntity,
      UserReportProfileEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
