import { Injectable, Logger } from '@nestjs/common';
import { getManager, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { filter, map, toString, uniq, values } from 'lodash';
import { TasksEntity } from 'src/entities/task.entity';
import { NotificationsEntity } from 'src/entities/notification.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  BID_STATUS,
  NOTIFICATION_STATUS,
  NOTIFICATION_USER,
  TASK_STATUS,
  TASK_TYPE,
} from 'src/utils/enums';
import {
  EMAIL_IMAGE_DOMAIN,
  EMAIL_IMAGE_PATH,
  EMAIL_SUBJECT,
  EMAIL_TEMPLATE,
  MARKETPLACE_WEB,
} from 'src/utils/constant';

@Injectable()
export class CronJobService {
  constructor(
    @InjectRepository(TasksEntity)
    private TaskRepository: Repository<TasksEntity>,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    private readonly mailerService: MailerService,
  ) {}
  private readonly logger = new Logger(CronJobService.name);

  // this is used to check open task which is going to archive
  @Cron(CronExpression.EVERY_5_MINUTES)
  async archiveTask(): Promise<void> {
    this.logger.log('Archive Task Cron-Job Started');
    const task_type: Array<number> = [
      TASK_TYPE.TO_FINISH_WORK,
      TASK_TYPE.SPECIFY_PERIOD,
    ];
    const sqlQuery = `
    SELECT *
    FROM tasks t 
    WHERE (deleted_at IS NULL AND task_status = ${
      TASK_STATUS.OPEN
    } AND date_and_time IN (${toString(task_type)}) ) 
    AND (NOW()>= (t.end_date_time - INTERVAL 5 MINUTE) )`;

    const entityManager = getManager();
    const resultResponse = await entityManager.query(sqlQuery);
    const resultValues: TasksEntity[] = values(resultResponse);
    if (resultValues.length > 0) {
      for (let i = 0; i < resultValues.length; i++) {
        try {
          await this.TaskRepository.update(
            { id: resultValues[i].id, deleted_at: IsNull() },
            { task_status: TASK_STATUS.ARCHIVED },
          );

          const notification_route_employer = {
            type: TASK_STATUS.ARCHIVED,
            user_type: NOTIFICATION_USER.EMPLOYER,
            id: resultValues[i].id,
          };

          const notificationText = `The task ${resultValues[i].title} has passed the due date and it is moved to archived task.`;
          const notificationText_DA = `Opgaven ${resultValues[i].title} har passeret forfaldsdatoen, og den flyttes til arkiveret opgave.`;
          const notification = new NotificationsEntity();
          notification.recipient_id = resultValues[i].employer_id;
          notification.routes = JSON.stringify(notification_route_employer);
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();
        } catch (error) {
          this.logger.error(
            error.message,
            error.trace,
            'Archive Cron-Job Error:::::',
          );
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_3_HOURS)
  async bidTaskNotification() {
    this.logger.log('Task Bid Email Notification Cron-Job Started');
    const sqlQuery = `
    SELECT tb.id, tb.specialist_id, t.title as task_title, tb.bid_amount, t.employer_id, tb.task_id, u.full_name as specialist_name FROM task_bids tb
    LEFT JOIN tasks t on t.id = tb.task_id
    LEFT JOIN users u on u.id = tb.specialist_id
    WHERE
    MINUTE(TIMEDIFF(tb.created_at,(t.created_at + INTERVAL 1 HOUR))) < 3 * 60
    AND
    tb.created_at > (NOW() -INTERVAL 3 HOUR)
    AND tb.bid_status = ${BID_STATUS.OPEN}
    AND t.tasK_status = ${TASK_STATUS.OPEN}
    AND tb.deleted_at IS NULL AND t.deleted_at IS NULL`;
    const entityManager = getManager();
    const resultResponse = await entityManager.query(sqlQuery);
    const bidNotificationData = values(resultResponse);
    const allTaskIDs = uniq(map(bidNotificationData, 'task_id'));
    for (let i = 0; i < allTaskIDs.length; i++) {
      try {
        const task_id = +allTaskIDs[i];
        const allBidData = filter(bidNotificationData, (data) => {
          return +data.task_id === task_id;
        });
        if (allBidData.length > 0) {
          const employerData = await this.UserRepository.findOne({
            where: { id: allBidData[0].employer_id, deleted_at: IsNull() },
          });
          const specialist_name_arr = map(allBidData, 'specialist_name');
          const task_title = allBidData[0].task_title;

          await this.mailerService
            .sendMail({
              to: employerData.email,
              from: process.env.SENDGRID_USER_EMAIL,
              subject: EMAIL_SUBJECT.task_bid_placed,
              template: EMAIL_TEMPLATE.task_bid_placed_list,
              context: {
                web_url: MARKETPLACE_WEB,
                image_domain: EMAIL_IMAGE_DOMAIN,
                image_path: EMAIL_IMAGE_PATH.images,
                task_title: task_title,
                specialist_name: specialist_name_arr,
                task_id: task_id,
              },
            })
            .then(() =>
              this.logger.log('EMAIL SENT TO:::::', employerData.email),
            )
            .catch((err) => {
              this.logger.error(err.response);
            });
        }
      } catch (error) {
        this.logger.error(error.message, error.trace, error.context);
      }
    }
  }
}
