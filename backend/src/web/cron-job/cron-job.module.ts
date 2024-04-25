import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronJobService } from './cron-job.service';
import { NotificationsEntity } from 'src/entities/notification.entity';
import { TasksEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksEntity, NotificationsEntity, UserEntity]),
  ],
  providers: [CronJobService],
})
export class CronJobModule {}
