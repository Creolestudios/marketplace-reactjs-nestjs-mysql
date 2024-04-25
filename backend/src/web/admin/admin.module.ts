import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ChatModule } from './chat/chat.module';
import { TasksModule } from './tasks/tasks.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    TypeOrmModule.forRoot(typeOrmConfig),
    ChatModule,
    TasksModule,
    TransactionsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
