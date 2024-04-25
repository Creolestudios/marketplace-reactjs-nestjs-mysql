import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { getManager, In, IsNull, Not, Repository } from 'typeorm';
import {
  assign,
  concat,
  filter,
  find,
  includes,
  map,
  mean,
  orderBy,
  pull,
  remove,
  toString,
  uniqBy,
  values,
} from 'lodash';
import * as moment from 'moment';
import { I18nRequestScopeService } from 'nestjs-i18n';
import Stripe from 'src/utils/stripe';
import { FileNameDto } from 'src/dto/file.dto';
import {
  AcceptRejectBidDto,
  NewTaskDto,
  GetTaskBidDto,
  MyTaskDto,
  MyTaskFilterDto,
  TaskBidsDTO,
  CancelTaskDto,
  AcceptRejectTaskCancellationDto,
  RateReviewTaskDto,
  FindTaskDto,
  InviteTaskDto,
  CompleteTaskDto,
  ReportTaskDto,
  CheckoutTaskDto,
  ViewReportedTaskDto,
  ShareContactDetailsDto,
  GuestFindTaskDto,
} from 'src/dto/task.dto';
import {
  ReportedTasksEntity,
  TaskBidsEntity,
  TaskCancellationHistoryEntity,
  TaskDisgreementHistoryEntity,
  TaskMediaEntity,
  TaskReviewsEntity,
  TasksEntity,
} from 'src/entities/task.entity';
import {
  OutstandingTransactionsEntity,
  TransactionsEntity,
  UserEntity,
} from 'src/entities/user.entity';
import { NotificationsEntity } from 'src/entities/notification.entity';
import { UsersService } from '../users/users.service';
import {
  CUSTOM_RESPONSE_STATUS,
  EMAIL_IMAGE_DOMAIN,
  EMAIL_IMAGE_PATH,
  EMAIL_TEMPLATE,
  FILE_PATH,
  FILE_SIZE,
  FILE_TYPE,
  MARKETPLACE_WEB,
  REPORT_TASK_REASON,
  ResponseMap,
  VALIDATION_PAYMENT_MSG,
} from 'src/utils/constant';
import { TASK_NOTIFICATION } from 'src/utils/notification-constant';
import {
  ACCEPT_REJECT,
  BID_STATUS,
  CHARGE_STATUS,
  CreateTaskDateAndTime,
  MediaType,
  NOTIFICATION_STATUS,
  PAYMENT_TYPE,
  NOTIFICATION_USER,
  REPORTED_BY,
  REPORTED_TASK_STATUS,
  SpecialistPreference,
  STRIPE_CURRENCY,
  TASK_CANCELLATION_BY,
  TASK_CREATE_UPDATE_REPOST,
  TASK_DATE_AND_TIME,
  TASK_STATUS,
  TASK_TYPE,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
  USER_ROLE,
  USER_TYPE,
  STRIPE_MINIMUM_CHARGE,
  UserWorkAs,
  LANGUAGE,
  TASK_CANCELLATION_DISGREE_BY,
  USER_TYPE_NUMBER,
} from 'src/utils/enums';
import { GlobalResponseType } from 'src/utils/types';
import {
  editFileName,
  fileDelete,
  fileRemovalFromSystem,
  fileUpload,
} from 'src/utils/file-uploading.utils';
import { CategoryEntity } from 'src/entities/category.entity';
import {
  cutMarketplacePercentage,
  random3Digit,
} from 'src/utils/functions.utils';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(UserEntity)
    private UsersRepository: Repository<UserEntity>,
    @InjectRepository(TasksEntity)
    private TaskRepository: Repository<TasksEntity>,
    @InjectRepository(TaskCancellationHistoryEntity)
    private TaskCancellationHistoryRepository: Repository<TaskCancellationHistoryEntity>,
    @InjectRepository(TaskMediaEntity)
    private TaskMediaRepository: Repository<TaskMediaEntity>,
    @InjectRepository(TaskBidsEntity)
    private TaskBidsRepository: Repository<TaskBidsEntity>,
    @InjectRepository(TaskReviewsEntity)
    private TaskReviewsRepository: Repository<TaskReviewsEntity>,
    @InjectRepository(ReportedTasksEntity)
    private ReportedTasksRepository: Repository<ReportedTasksEntity>,
    @InjectRepository(TransactionsEntity)
    private TransactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(NotificationsEntity)
    private NotificationsRepository: Repository<NotificationsEntity>,
    @InjectRepository(CategoryEntity)
    private CategoryRepository: Repository<CategoryEntity>,
    @InjectRepository(OutstandingTransactionsEntity)
    private OutstandingTransactionRepository: Repository<OutstandingTransactionsEntity>,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  /**
   * @author Abhee Hudani
   * @param taskDto Create / Update / Repost Task details
   * @description Create & update open task
   * repost an archive task
   * @Created May 6, 2021
   * @Updated June 23, 2021
   **/
  async createUpdateReOpenTask(
    user: UserEntity,
    taskDto: NewTaskDto,
    media: Express.Multer.File[],
  ): GlobalResponseType {
    try {
      for (const data of media) {
        const file_type = data.mimetype.split('/');
        if (
          file_type[0] === FILE_TYPE.image &&
          +data.size > FILE_SIZE.task_image
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_image',
            )}`,
          );
        } else if (
          file_type[0] === FILE_TYPE.video &&
          +data.size > FILE_SIZE.task_video
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_video',
            )}`,
          );
        }
      }

      let task: TasksEntity = null;
      if (taskDto.task_action === TASK_CREATE_UPDATE_REPOST.CREATE) {
        task = new TasksEntity();
      } else if (taskDto.task_action === TASK_CREATE_UPDATE_REPOST.UPDATE) {
        task = await this.TaskRepository.findOne({
          where: {
            id: taskDto.task_id,
            employer_id: user.id,
            task_status: TASK_STATUS.OPEN,
            deleted_at: IsNull(),
          },
        });
      } else {
        // Archive
        task = await this.TaskRepository.findOne({
          where: {
            id: taskDto.task_id,
            employer_id: user.id,
            task_status: TASK_STATUS.ARCHIVED,
            deleted_at: IsNull(),
          },
        });
      }
      if (!task) {
        throw new BadGatewayException(
          await this.i18n.translate('validation_task.no_open_task'),
        );
      }
      const fileResponse: Array<FileNameDto> = [];
      const startTime = +taskDto.start_time;
      const startMinute = taskDto.start_minute ? +taskDto.start_minute : 0;
      const endTime = +taskDto.end_time;
      const endMinute = taskDto.end_minute ? +taskDto.end_minute : 0;

      const adminData = await this.UsersRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });
      const category = await this.CategoryRepository.findOne({
        where: {
          id: taskDto.category_id,
          inserted_by: adminData.id,
          deleted_at: IsNull(),
        },
      });
      if (!category) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_category_found'),
        );
      }

      const subCategory = await this.CategoryRepository.findOne({
        where: {
          id: taskDto.sub_category_id,
          inserted_by: adminData.id,
          parent_id: category.id,
          deleted_at: IsNull(),
        },
      });
      if (!subCategory) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_sub_category_found'),
        );
      }

      if (taskDto.date_and_time === TASK_DATE_AND_TIME.GET_STARTED) {
        const start_date = new Date(`${taskDto.start_date}`);
        start_date.setHours(startTime);
        start_date.setMinutes(startMinute);
        task.start_date_time = start_date;
        task.end_date_time = null;
      } else if (taskDto.date_and_time === TASK_DATE_AND_TIME.TO_FINISH_WORK) {
        const end_date = new Date(`${taskDto.end_date}`);
        end_date.setHours(endTime);
        end_date.setMinutes(endMinute);
        task.end_date_time = end_date;
        task.start_date_time = null;
      } else if (taskDto.date_and_time === TASK_DATE_AND_TIME.SPECIFY_PERIOD) {
        const start_date = new Date(`${taskDto.start_date}`);
        start_date.setHours(startTime);
        start_date.setMinutes(startMinute);
        const end_date = new Date(`${taskDto.end_date}`);
        end_date.setHours(endTime);
        end_date.setMinutes(endMinute);
        task.start_date_time = start_date;
        task.end_date_time = end_date;
      }

      task.title = taskDto.title;
      task.description = taskDto.description;
      task.employer_id = user.id;
      task.category_id = taskDto.category_id;
      task.sub_category_id = taskDto.sub_category_id;
      task.date_and_time = CreateTaskDateAndTime[`${taskDto.date_and_time}`];
      task.estimated_budget = taskDto.estimated_budget;
      task.specialist_preference =
        SpecialistPreference[`${taskDto.specialist_preference}`];
      task.zipcode = taskDto.zipcode;
      task.address = taskDto.address;
      task.nemid_authorized = taskDto.nemid_authorized
        ? taskDto.nemid_authorized
        : 0;
      task.remote_job = taskDto.remote_job ? taskDto.remote_job : 0;
      task.address = taskDto.address ? taskDto.address : null;
      task.latitude = taskDto.latitude ? taskDto.latitude : null;
      task.longitude = taskDto.longitude ? taskDto.longitude : null;
      task.share_contact_details = taskDto.share_contact_details
        ? taskDto.share_contact_details
        : 0;

      if (taskDto.task_action === TASK_CREATE_UPDATE_REPOST.CREATE) {
        task.task_status = TASK_STATUS.OPEN;
        const findFirstTask = await this.TaskRepository.findOne({
          where: { employer_id: user.id, deleted_at: IsNull() },
        });
        await task.save();
        for (let i = 0; i < media.length; i++) {
          const newName = editFileName(media[i]);
          const media_path = fileUpload(newName, media[i], FILE_PATH.new_task);
          const file_type = media[i].mimetype.split('/');
          const task_media = new TaskMediaEntity();
          task_media.task_id = task.id;
          task_media.media = media_path;
          task_media.media_type = MediaType[`${file_type[0]}`];
          await task_media.save();
          const fileNameObj: FileNameDto = {
            originalname: media[i].originalname,
            filename: media_path,
            mimetype: file_type[0],
            size: media[i].size,
          };
          fileResponse.push(fileNameObj);
        }

        const userData = await this.usersService.findUserById(user.id);

        await this.mailerService
          .sendMail({
            to: userData.email,
            from: process.env.SENDGRID_USER_EMAIL,
            subject: await this.i18n.translate('email_subject.task_created'),
            template: EMAIL_TEMPLATE.task_create,
            context: {
              web_url: MARKETPLACE_WEB,
              image_domain: EMAIL_IMAGE_DOMAIN,
              image_path: EMAIL_IMAGE_PATH.images,
              task_title: task.title,
              task_first: findFirstTask ? '' : 'first',
            },
          })
          .catch((err) => {
            console.log('Task Create Mailer Error', err);
          });

        return ResponseMap(
          {
            task: task,
            media: fileResponse,
            task_acton: TASK_CREATE_UPDATE_REPOST.CREATE,
          },
          await this.i18n.translate('success.success'),
        );
      } else {
        // Update || Archived

        const task_status = task.task_status;
        if (task.task_status === TASK_STATUS.ARCHIVED) {
          task.task_status = TASK_STATUS.OPEN;
        }
        await task.save();

        // const task_media = await this.TaskMediaRepository.find({
        //   select: ['media'],
        //   where: {
        //     task_id: taskDto.task_id,
        //     deleted_at: IsNull(),
        //   },
        // });
        // const originalTaskMedia = [];
        // let deleteMedia = [];

        if (taskDto.delete_media && taskDto.delete_media.length > 0) {
          for (const delete_media of taskDto.delete_media) {
            const taskMedia = await this.TaskMediaRepository.findOne({
              where: { media: delete_media, task_id: taskDto.task_id },
            });

            if (taskMedia) {
              taskMedia.deleted_at = new Date();
              const filePath = `upload${taskMedia.media.split('upload')[1]}`;
              fileDelete(filePath);
              await this.TaskMediaRepository.save(taskMedia);
            }
          }
        }

        // if (task_media.length > 0) {
        // for (let i = 0; i < task_media.length; i++) {
        //   originalTaskMedia.push(task_media[i].media);
        // }
        // deleteMedia = originalTaskMedia;
        // for (let i = 0; i < media.length; i++) {
        // const mediaName = `${process.env.IMAGE_SITE_URL}${FILE_PATH.new_task}/${media[i].originalname}`;
        // if (includes({ ...originalTaskMedia }, mediaName)) {
        //   deleteMedia = pull(originalTaskMedia, mediaName);
        // } else {
        // const newName = editFileName(media[i]);
        // const media_path = fileUpload(
        //   newName,
        //   media[i],
        //   FILE_PATH.new_task,
        // );
        // const file_type = media[i].mimetype.split('/');
        // const task_media = new TaskMediaEntity();
        // task_media.task_id = task.id;
        // task_media.media = media_path;
        // task_media.media_type = MediaType[`${file_type[0]}`];
        // await task_media.save();
        // const fileNameObj: FileNameDto = {
        //   originalname: media[i].originalname,
        //   filename: media_path,
        //   mimetype: file_type[0],
        //   size: media[i].size,
        // };
        // fileResponse.push(fileNameObj);
        // }
        // }

        // console.log(deleteMedia);

        // for (let delete_media of deleteMedia) {
        //   console.log(delete_media);

        //   const taskMedia = await this.TaskMediaRepository.findOne({
        //     where: { media: delete_media },
        //   });
        //   console.log(taskMedia);

        //   if (taskMedia) {
        //     taskMedia.deleted_at = new Date();

        //     const filePath = `upload${taskMedia.media.split('upload')[1]}`;
        //     fileDelete(filePath);

        //     await this.TaskMediaRepository.save(taskMedia);
        //   }
        // }
        // } else {
        for (let i = 0; i < media.length; i++) {
          const newName = editFileName(media[i]);
          const media_path = fileUpload(newName, media[i], FILE_PATH.new_task);
          const task_media = new TaskMediaEntity();
          const file_type = media[i].mimetype.split('/');
          task_media.task_id = task.id;
          task_media.media = media_path;
          task_media.media_type = MediaType[`${file_type[0]}`];
          await task_media.save();
          const fileNameObj: FileNameDto = {
            originalname: media[i].originalname,
            filename: media_path,
            mimetype: file_type[0],
            size: media[i].size,
          };
          fileResponse.push(fileNameObj);
        }
        // }
        const taskReopen = await this.i18n.translate(
          'notification.task_reopen',
          {
            lang: LANGUAGE.EN,
            args: { task_title: task.title },
          },
        );
        const taskReopen_DA = await this.i18n.translate(
          'notification.task_reopen',
          {
            lang: LANGUAGE.DE,
            args: { task_title: task.title },
          },
        );
        const taskUpdate = await this.i18n.translate(
          'notification.task_updated',
          {
            lang: LANGUAGE.EN,
            args: { task_title: task.title },
          },
        );
        const taskUpdate_DA = await this.i18n.translate(
          'notification.task_updated',
          {
            lang: LANGUAGE.DE,
            args: { task_title: task.title },
          },
        );
        const notification_route = {
          type: TASK_STATUS.OPEN,
          user_type: NOTIFICATION_USER.EMPLOYER,
          id: task.id,
        };
        const notificationText =
          task_status === TASK_STATUS.ARCHIVED ? taskReopen : taskUpdate;
        const notificationText_DA =
          task_status === TASK_STATUS.ARCHIVED ? taskReopen_DA : taskUpdate_DA;
        const notification = new NotificationsEntity();
        notification.recipient_id = user.id;
        notification.read_flag = NOTIFICATION_STATUS.UNREAD;
        notification.routes = JSON.stringify(notification_route);
        notification.notification_text = notificationText;
        notification.notification_text_da = notificationText_DA;
        await notification.save();

        return ResponseMap(
          {
            task: task,
            media: fileResponse,
            task_action:
              task_status === TASK_STATUS.ARCHIVED
                ? TASK_CREATE_UPDATE_REPOST.REPOST
                : TASK_CREATE_UPDATE_REPOST.UPDATE,
          },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async shareContactDetails(
    user: UserEntity,
    shareDetailsDto: ShareContactDetailsDto,
  ): GlobalResponseType {
    try {
      const task = await this.TaskRepository.findOne({
        where: {
          id: shareDetailsDto.task_id,
          employer_id: user.id,
          task_status: In([TASK_STATUS.OPEN, TASK_STATUS.ACTIVE]),
          deleted_at: IsNull(),
        },
      });
      task.share_contact_details = shareDetailsDto.share_contact_details;
      await task.save();
      return ResponseMap(
        {
          task: task,
          status: shareDetailsDto.share_contact_details,
        },
        await this.i18n.translate('success.success'),
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Vaibhavi Rathod
   * @param myTaskFilterDto Listing filtration according to conditions
   * @description Listing of My Task depending on user Type: Employer and Specialist
   * @Created May 9, 2021
   * @Updated May 31, 2021
   **/
  async myTaskList(
    user: UserEntity,
    myTaskFilterDto: MyTaskFilterDto,
  ): GlobalResponseType {
    try {
      const take = myTaskFilterDto.limit;
      const page = myTaskFilterDto.page;
      const skip = (page - 1) * take;

      const whereObject = {
        deleted_at: IsNull(),
      };

      const condition: Array<number> = [];
      myTaskFilterDto.active_task === 1
        ? condition.push(TASK_STATUS.ACTIVE)
        : 0;
      myTaskFilterDto.archived_task === 1
        ? condition.push(TASK_STATUS.ARCHIVED)
        : 0;
      myTaskFilterDto.completed_task === 1
        ? condition.push(TASK_STATUS.COMPLETED)
        : 0;
      myTaskFilterDto.cancelled_task === 1
        ? condition.push(TASK_STATUS.CANCELLED)
        : 0;
      myTaskFilterDto.reported_task === 1
        ? condition.push(TASK_STATUS.REPORTED)
        : 0;
      myTaskFilterDto.resolved_task === 1
        ? condition.push(TASK_STATUS.REPORTED)
        : 0;

      if (myTaskFilterDto.user_type === USER_TYPE.EMPLOYER) {
        myTaskFilterDto.open_task && myTaskFilterDto.open_task === 1
          ? condition.push(TASK_STATUS.OPEN)
          : 0;

        myTaskFilterDto.cancelled_task === 1
          ? condition.push(
              TASK_STATUS.CANCELLATION_REQUEST_BY_SPECIALIST,
              TASK_STATUS.CANCELLATION_REQUEST_BY_EMPLOYER,
            )
          : 0;

        assign(whereObject, { employer_id: user.id });
        let taskConditionClause = '';
        if (condition.length > 0) {
          assign(whereObject, { task_status: In(condition) });

          taskConditionClause = ` AND t1.task_status IN (${toString(
            condition,
          )})`;
        }
        const allTasks = await this.TaskRepository.findAndCount({
          where: whereObject,
        });

        let tasksIDs = map(values(allTasks[0]), 'id');
        let taskCount = allTasks[1];

        const tasks = [];
        const sqlQuery = `
            SELECT u.id as user_specialist_id, rt.status as reported_status, u.full_name as specialist_name, t1.id as task_id, count(t3.id) as total_bid, t1.category_id, t1.sub_category_id,t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized,t1.specialist_id, t2.media, t2.media_type, t1.title as task_title, t1.created_at, t1.updated_at
            FROM tasks t1 LEFT JOIN task_media t2 ON (t1.id = t2.task_id AND t2.deleted_at IS NULL)
              LEFT JOIN task_bids t3 ON t1.id = t3.task_id
              LEFT JOIN users u on u.id = t1.specialist_id
              LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE t1.employer_id = ${user.id} ${taskConditionClause}
            GROUP BY u.id, rt.status, u.full_name, t1.id, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type
            ORDER BY t1.updated_at DESC
            LIMIT ${take}
            OFFSET ${skip}
        `;
        // UNION ALL

        //     SELECT u.id as user_specialist_id,rt.status as reported_status, u.full_name as specialist_name, t1.id as task_id, count(t3.id) as total_bid,t1.category_id, t1.sub_category_id,t1.zipcode,t1.estimated_budget ,t1.task_status,  t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, t1.title as task_title, t1.created_at, t1.updated_at
        //     FROM task_media t2 LEFT JOIN tasks t1 ON t2.task_id = t1.id
        //       LEFT JOIN task_bids t3 ON t2.task_id = t3.task_id
        //       LEFT JOIN users u on u.id = t1.specialist_id
        //       LEFT JOIN reported_tasks rt on t1.id = rt.task_id
        //     WHERE t1.id IS NULL AND t2.deleted_at IS NULL
        //     GROUP BY u.id, rt.status, u.full_name, t1.id, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type
        //     UNION ALL

        //     SELECT u.id as user_specialist_id, rt.status as reported_status, u.full_name as specialist_name, t1.id as task_id, count(t3.id) as total_bid,t1.category_id, t1.sub_category_id,t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, t1.title as task_title, t1.created_at, t1.updated_at
        //     FROM task_bids t3 LEFT JOIN tasks t1 ON t1.id = t3.task_id
        //       LEFT JOIN task_media t2 ON t2.task_id = t3.task_id
        //       LEFT JOIN users u on t3.specialist_id = u.id
        //       LEFT JOIN reported_tasks rt on t1.id = rt.task_id
        //     WHERE t1.id IS NULL AND t2.task_id IS NULL AND t2.deleted_at IS NULL
        //     GROUP BY u.id, rt.status, u.full_name, t1.id, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type

        const entityManager = getManager();
        const resultResponse = await entityManager.query(sqlQuery);
        const resultValues = values(resultResponse);
        const total_unique_tasks = orderBy(
          uniqBy(resultValues, 'task_id'),
          ['updated_at'],
          ['desc'],
        );

        for (let i = 0; i < total_unique_tasks.length; i++) {
          let date: Date = null;
          if (
            total_unique_tasks[i].task_type === TASK_TYPE.GET_STARTED ||
            total_unique_tasks[i].task_type === TASK_TYPE.SPECIFY_PERIOD
          ) {
            date = total_unique_tasks[i].start_date_time;
          } else {
            date = total_unique_tasks[i].end_date_time;
          }

          if (
            myTaskFilterDto.reported_task === 0 &&
            myTaskFilterDto.resolved_task === 1 &&
            +total_unique_tasks[i].task_status === TASK_STATUS.REPORTED &&
            +total_unique_tasks[i].reported_status === REPORTED_TASK_STATUS.OPEN
          ) {
            tasksIDs = tasksIDs.filter(
              (id) => id !== +total_unique_tasks[i].task_id,
            );
            taskCount = tasksIDs.length;
            continue;
          }

          if (
            myTaskFilterDto.reported_task === 1 &&
            myTaskFilterDto.resolved_task === 0 &&
            +total_unique_tasks[i].task_status === TASK_STATUS.REPORTED &&
            +total_unique_tasks[i].reported_status ===
              REPORTED_TASK_STATUS.RESOLVED
          ) {
            tasksIDs = tasksIDs.filter(
              (id) => id !== +total_unique_tasks[i].task_id,
            );
            taskCount = tasksIDs.length;
            continue;
          }

          if (
            myTaskFilterDto.resolved_task === 1 &&
            +total_unique_tasks[i].task_status === TASK_STATUS.REPORTED
          ) {
            const resolvedTask = await this.ReportedTasksRepository.findOne({
              where: {
                task_id: +total_unique_tasks[i].task_id,
                reported_by: REPORTED_BY.EMPLOYER,
                status: REPORTED_TASK_STATUS.RESOLVED,
                deleted_at: IsNull(),
              },
            });
            total_unique_tasks[i].task_resolved = resolvedTask ? true : false;
          }

          const moment_date = moment(new Date(date));
          const moment_current_date = moment(new Date());
          const hours_diff = moment_date.diff(moment_current_date, 'hours');
          total_unique_tasks[i].urgency =
            hours_diff > 0 && hours_diff <= 48 ? true : false;

          const specialistData = {
            id: total_unique_tasks[i].specialist_id,
            name: total_unique_tasks[i].specialist_name,
          };
          const taskData = {
            id: total_unique_tasks[i].task_id,
            title: total_unique_tasks[i].task_title,
            total_bid: +total_unique_tasks[i].total_bid,
            category_id: total_unique_tasks[i].category_id,
            sub_category_id: total_unique_tasks[i].sub_category_id,
            zipcode: total_unique_tasks[i].zipcode,
            estimated_budget: +total_unique_tasks[i].estimated_budget,
            task_status: +total_unique_tasks[i].task_status,
            task_type: +total_unique_tasks[i].task_type,
            start_date_time: total_unique_tasks[i].start_date_time,
            end_date_time: total_unique_tasks[i].end_date_time,
            specialist_preference: +total_unique_tasks[i].specialist_preference,
            remote_job: +total_unique_tasks[i].remote_job,
            nemid_authorized: +total_unique_tasks[i].nemid_authorized,
            resolved_task:
              +total_unique_tasks[i].task_resolved ||
              +total_unique_tasks[i].reported_status,
            urgency: total_unique_tasks[i].urgency,
          };

          let taskMedia = {
            media: null,
            media_type: null,
          };
          const media = await this.TaskMediaRepository.findOne({
            where: {
              task_id: total_unique_tasks[i].task_id,
            },
          });
          if (media) {
            taskMedia = {
              media: media.media,
              media_type: media.media_type,
            };
          }
          const taskItems = {
            specialistData: specialistData,
            taskData: taskData,
            taskMedia: taskMedia,
          };

          tasks.push(taskItems);
        }

        return ResponseMap(
          {
            tasks: tasks,
            user_type: USER_TYPE.EMPLOYER,
            totalData: taskCount,
          },
          await this.i18n.translate('success.success'),
        );
      } else {
        myTaskFilterDto.cancelled_task === 1
          ? condition.push(
              TASK_STATUS.CANCELLATION_REQUEST_BY_SPECIALIST,
              TASK_STATUS.CANCELLATION_REQUEST_BY_EMPLOYER,
            )
          : 0;

        // Specialist
        // myTaskFilterDto.cancelled_task === 1
        //   ? condition.push(
        //       TASK_STATUS.CANCELLATION_REQUEST_BY_SPECIALIST,
        //       TASK_STATUS.CANCELLATION_REQUEST_BY_EMPLOYER,
        //     )
        //   : 0;

        let myTaskSqlCondition = `t.specialist_id =${user.id} AND task_status IN (2, 4, 5, 6, 7, 8) `;

        if (condition.length > 0) {
          myTaskSqlCondition = `t.specialist_id =${
            user.id
          } AND task_status IN (${toString(condition)}) `;
        }
        if (
          myTaskFilterDto.task_invitations &&
          myTaskFilterDto.task_invitations === 1
        ) {
          if (condition.length > 0) {
            myTaskSqlCondition = `( 
              (t.specialist_id =${user.id} AND t.task_status IN (${toString(
              condition,
            )}) ) OR(t.task_status = ${
              TASK_STATUS.OPEN
            } AND JSON_CONTAINS(t.invited_users,'{"specialist_id":${
              user.id
            }}')) 
            )`;
          } else {
            myTaskSqlCondition = ` 
             (t.task_status = ${TASK_STATUS.OPEN} AND JSON_CONTAINS(t.invited_users,'{"specialist_id":${user.id}}')) 
            `;
          }
        }

        const myTaskSql = `SELECT * FROM tasks t 
        WHERE t.deleted_at IS NULL AND ${myTaskSqlCondition}
        LIMIT ${skip},${take}
        `;

        const allTasksLength = `SELECT * FROM tasks t
        WHERE t.deleted_at IS NULL AND ${myTaskSqlCondition} `;

        const entityManager = getManager();
        const resultTaskResponse = await entityManager.query(myTaskSql);
        const totalResultTasks = values(
          await entityManager.query(allTasksLength),
        );

        const tasks = [];

        const tasksIDs = map(values(resultTaskResponse), 'id');
        if (tasksIDs.length > 0) {
          const sqlQuery = `
          SELECT t1.id as employer_id, t1.full_name as employer_name, t2.id as task_id, t2.task_status, t2.title as task_title, t2.date_and_time as task_type, t2.start_date_time, t2.end_date_time, t2.nemid_authorized, t2.remote_job, t2.specialist_preference,t2.zipcode as task_zipcode, t2.category_id, t2.sub_category_id, t2.estimated_budget, tm.id as media_id, tm.media, t2.invited_users, t1.updated_at
          FROM users t1
            INNER JOIN tasks t2 ON t1.id = t2.employer_id
            LEFT JOIN task_media tm ON t2.id = tm.task_id
          WHERE t2.id IN (${toString(tasksIDs)})
          ORDER BY tm.media_type DESC, task_id ASC`;

          const entityManager = getManager();
          const resultResponse = await entityManager.query(sqlQuery);
          const resultValues = values(resultResponse);
          const total_unique_tasks = orderBy(
            uniqBy(resultValues, 'task_id'),
            ['updated_at'],
            ['desc'],
          );
          for (let i = 0; i < total_unique_tasks.length; i++) {
            let date: Date = null;
            if (
              total_unique_tasks[i].task_type === TASK_TYPE.GET_STARTED ||
              total_unique_tasks[i].task_type === TASK_TYPE.SPECIFY_PERIOD
            ) {
              date = total_unique_tasks[i].start_date_time;
            } else {
              date = total_unique_tasks[i].end_date_time;
            }

            if (
              myTaskFilterDto.resolved_task === 1 &&
              +total_unique_tasks[i].task_status === TASK_STATUS.REPORTED
            ) {
              const resolvedTask = await this.ReportedTasksRepository.findOne({
                where: {
                  task_id: +total_unique_tasks[i].task_id,
                  reported_by: REPORTED_BY.SPECIALIST,
                  status: REPORTED_TASK_STATUS.RESOLVED,
                  deleted_at: IsNull(),
                },
              });
              total_unique_tasks[i].task_resolved = resolvedTask ? true : false;
            }

            let parsedInvitedUsers = [];
            if (total_unique_tasks[i].invited_users) {
              parsedInvitedUsers = JSON.parse(
                total_unique_tasks[i].invited_users,
              );
            }
            const isUserInvited = find(parsedInvitedUsers, (data) => {
              return data.specialist_id === user.id;
            });

            const moment_date = moment(new Date(date));
            const moment_current_date = moment(new Date());
            const hours_diff = moment_date.diff(moment_current_date, 'hours');
            total_unique_tasks[i].urgency =
              hours_diff > 0 && hours_diff <= 48 ? true : false;

            const employerData = {
              id: total_unique_tasks[i].employer_id,
              name: total_unique_tasks[i].employer_name,
            };
            const taskData = {
              id: total_unique_tasks[i].task_id,
              title: total_unique_tasks[i].task_title,
              category_id: total_unique_tasks[i].category_id,
              sub_category_id: total_unique_tasks[i].sub_category_id,
              zipcode: total_unique_tasks[i].task_zipcode,
              estimated_budget: +total_unique_tasks[i].estimated_budget,
              task_status: +total_unique_tasks[i].task_status,
              task_type: +total_unique_tasks[i].task_type,
              start_date_time: total_unique_tasks[i].start_date_time,
              end_date_time: total_unique_tasks[i].end_date_time,
              specialist_preference: +total_unique_tasks[i]
                .specialist_preference,
              remote_job: +total_unique_tasks[i].remote_job,
              nemid_authorized: +total_unique_tasks[i].nemid_authorized,
              resolved_task: +total_unique_tasks[i].task_resolved,
              invited: isUserInvited ? true : false,
              urgency: total_unique_tasks[i].urgency,
            };
            const taskMedia = {
              media: total_unique_tasks[i].media,
              media_type: total_unique_tasks[i].media_type,
            };
            const taskItems = {
              employerData: employerData,
              taskData: taskData,
              taskMedia: taskMedia,
            };

            tasks.push(taskItems);
          }
        }
        return ResponseMap(
          {
            tasks: tasks,
            user_type: USER_TYPE.SPECIALIST,
            totalData: totalResultTasks.length,
          },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param cancelTaskDto Task_id and User_type
   * @description  Generic Single Cancellation for Employer and Specialist
   * @Created May 6, 2021
   * @Updated May 21, 2021
   **/
  async cancelTaskRequest(
    user: UserEntity,
    cancelTaskDto: CancelTaskDto,
    media: Express.Multer.File[],
  ): GlobalResponseType {
    try {
      for (const data of media) {
        const file_type = data.mimetype.split('/');
        if (
          file_type[0] === FILE_TYPE.image &&
          +data.size > FILE_SIZE.task_image
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_image',
            )}`,
          );
        } else if (
          file_type[0] === FILE_TYPE.video &&
          +data.size > FILE_SIZE.task_video
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_video',
            )}`,
          );
        }
      }

      let task: TasksEntity = null;
      const employer_task_status: Array<number> = [
        TASK_STATUS.OPEN,
        TASK_STATUS.ACTIVE,
      ];
      let task_status: number = null;
      const specialist_task_status: Array<number> = [TASK_STATUS.ACTIVE];
      const fileResponse: Array<FileNameDto> = [];

      const userData = await this.usersService.findUserById(user.id);

      if (cancelTaskDto.user_type === USER_TYPE.EMPLOYER) {
        task = await this.TaskRepository.findOne({
          where: {
            id: cancelTaskDto.task_id,
            employer_id: user.id,
            task_status: In(employer_task_status),
            deleted_at: IsNull(),
          },
        });
        if (!task) {
          throw new BadRequestException(
            await this.i18n.translate(
              'validation_task.no_open_active_task_to_cancel',
            ),
          );
        }
        if (task.task_status === TASK_STATUS.ACTIVE && media.length === 0) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_proof_active_task'),
          );
        }
        if (task.cancelled_by) {
          const taskCancellation = new TaskCancellationHistoryEntity();
          taskCancellation.task_id = task.id;
          taskCancellation.cancelled_by = task.cancelled_by;
          taskCancellation.cancelled_by_type = task.cancelled_by_type;
          taskCancellation.cancellation_reason = task.cancellation_reason;
          taskCancellation.cancellation_proof = task.cancellation_proof;
          await taskCancellation.save();
        }
        for (let i = 0; i < media.length; i++) {
          const newName = editFileName(media[i]);
          const media_path = fileUpload(
            newName,
            media[i],
            FILE_PATH.cancel_task,
          );
          const file_type = media[i].mimetype.split('/');
          const fileNameObj: FileNameDto = {
            filename: media_path,
            mimetype: file_type[0],
          };
          fileResponse.push(fileNameObj);
        }

        task_status = task.task_status;
        task.task_status =
          task.task_status === TASK_STATUS.OPEN
            ? TASK_STATUS.CANCELLED
            : TASK_STATUS.CANCELLATION_REQUEST_BY_EMPLOYER;
        task.cancelled_by = user.id;
        task.cancelled_by_type = TASK_CANCELLATION_BY.EMPLOYER;
        task.cancellation_reason = cancelTaskDto.cancel_reason;
        task.cancellation_proof = JSON.stringify(fileResponse);
        await task.save();

        if (task_status === TASK_STATUS.OPEN) {
          const sqlQuery = `
          SELECT email, users.id as user_id
          FROM
              users
          LEFT OUTER JOIN
              task_bids tb ON users.id = tb.specialist_id
          WHERE task_id =${cancelTaskDto.task_id} AND tb.bid_status = ${BID_STATUS.OPEN} AND tb.deleted_at IS NULL AND users.deleted_at IS NULL`;

          const entityManager = getManager();
          const allBidUsers = await entityManager.query(sqlQuery);
          const bidderEmailAddresses = values(allBidUsers);

          const openTaskCancel = await this.i18n.translate(
            'notification.open_task_cancel',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title },
            },
          );

          const openTaskCancel_DA = await this.i18n.translate(
            'notification.open_task_cancel',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title },
            },
          );

          const notification_route = {
            type: TASK_STATUS.CANCELLED,
            user_type: NOTIFICATION_USER.SPECIALIST,
            id: task.id,
          };
          for (let i = 0; i < bidderEmailAddresses.length; i++) {
            const notificationText = openTaskCancel;
            const notificationText_DA = openTaskCancel_DA;
            const notification = new NotificationsEntity();
            notification.recipient_id = bidderEmailAddresses[i].user_id;
            notification.read_flag = NOTIFICATION_STATUS.UNREAD;
            notification.routes = JSON.stringify(notification_route);
            notification.notification_text = notificationText;
            notification.notification_text_da = notificationText_DA;
            await notification.save();

            await this.mailerService
              .sendMail({
                to: bidderEmailAddresses[i].email,
                from: process.env.SENDGRID_USER_EMAIL,
                subject: await this.i18n.translate(
                  'email_subject.task_cancelled',
                ),
                template: EMAIL_TEMPLATE.task_cancelled,
                context: {
                  web_url: MARKETPLACE_WEB,
                  image_domain: EMAIL_IMAGE_DOMAIN,
                  image_path: EMAIL_IMAGE_PATH.images,
                  task_message: 'on which you have bided',
                  task_title: task.title,
                  cancelled_by: userData.full_name,
                },
              })
              .catch((err) => {
                console.log('Employer Task Cancellation Mailer Error', err);
              });
          }

          const notification_route_employer = {
            type: TASK_STATUS.CANCELLED,
            user_type: NOTIFICATION_USER.EMPLOYER,
            id: task.id,
          };

          const notificationText = await this.i18n.translate(
            'notification.task_marked_closed',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title },
            },
          );
          const notificationText_DA = await this.i18n.translate(
            'notification.task_marked_closed',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title },
            },
          );
          const notification = new NotificationsEntity();
          notification.recipient_id = userData.id;
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.routes = JSON.stringify(notification_route_employer);
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();

          await this.mailerService
            .sendMail({
              to: userData.email,
              from: process.env.SENDGRID_USER_EMAIL,
              subject: await this.i18n.translate(
                'email_subject.task_cancelled',
              ),
              template: EMAIL_TEMPLATE.task_cancelled,
              context: {
                web_url: MARKETPLACE_WEB,
                image_domain: EMAIL_IMAGE_DOMAIN,
                image_path: EMAIL_IMAGE_PATH.images,
                task_title: task.title,
                task_message: '',
                cancelled_by: 'you',
                task_id: task.id,
              },
            })
            .catch((err) => {
              console.log('Employer Task Cancellation Mailer Error', err);
            });

          // ALL BIDS => OPEN, ACTIVE BIDS CLOSED
          await this.TaskBidsRepository.update(
            {
              task_id: task.id,
              bid_status: In([BID_STATUS.OPEN, BID_STATUS.ACTIVE]),
            },
            { bid_status: BID_STATUS.CLOSED },
          );
        } else if (task_status === TASK_STATUS.ACTIVE) {
          const sqlQuery = `
          SELECT email, u.id as user_id
          FROM
              users u
          LEFT JOIN
              tasks t ON u.id = t.employer_id OR u.id = t.specialist_id
          WHERE t.id =${task.id} AND t.deleted_at IS NULL AND u.deleted_at IS NULL`;

          const entityManager = getManager();
          const usersData = await entityManager.query(sqlQuery);
          const emailAddressData = values(usersData);

          const notification_route_employer = {
            type: TASK_STATUS.CANCELLATION_REQUEST_BY_EMPLOYER,
            user_type: NOTIFICATION_USER.EMPLOYER,
            id: task.id,
          };

          const notification_route_specialist = {
            type: TASK_STATUS.CANCELLATION_REQUEST_BY_EMPLOYER,
            user_type: NOTIFICATION_USER.SPECIALIST,
            id: task.id,
          };

          const notificationText = await this.i18n.translate(
            'notification.task_cancellation_request',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationText_DA = await this.i18n.translate(
            'notification.task_cancellation_request',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notification = new NotificationsEntity();
          notification.recipient_id = task.specialist_id;
          notification.routes = JSON.stringify(notification_route_specialist);
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();

          const activeTaskCancellation = await this.i18n.translate(
            'notification.task_cancellation_request_details_employer',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title },
            },
          );
          const activeTaskCancellation_DA = await this.i18n.translate(
            'notification.task_cancellation_request_details_employer',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title },
            },
          );
          const notificationEmployer = new NotificationsEntity();
          notificationEmployer.recipient_id = task.employer_id;
          notificationEmployer.routes = JSON.stringify(
            notification_route_employer,
          );
          notificationEmployer.read_flag = NOTIFICATION_STATUS.UNREAD;
          notificationEmployer.notification_text = activeTaskCancellation;
          notificationEmployer.notification_text_da = activeTaskCancellation_DA;
          await notificationEmployer.save();

          for (let i = 0; i < emailAddressData.length; i++) {
            await this.mailerService
              .sendMail({
                to: emailAddressData[i].email,
                from: process.env.SENDGRID_USER_EMAIL,
                subject: await this.i18n.translate(
                  'email_subject.task_cancellation_request_created_employer',
                ),
                template: EMAIL_TEMPLATE.task_cancel_request,
                context: {
                  web_url: MARKETPLACE_WEB,
                  image_domain: EMAIL_IMAGE_DOMAIN,
                  image_path: EMAIL_IMAGE_PATH.images,
                  task_title: task.title,
                  cancelled_by: userData.full_name,
                  task_id: task.id,
                },
              })
              .catch((err) => {
                console.log('Employer Task Cancellation Mailer Error', err);
              });
          }
        }
        return ResponseMap(
          {
            task: task,
            user_type: cancelTaskDto.user_type,
            action: CUSTOM_RESPONSE_STATUS.CANCELLATION,
          },
          await this.i18n.translate('success.success'),
        );
      } else {
        // Specialist
        task = await this.TaskRepository.findOne({
          where: {
            id: cancelTaskDto.task_id,
            specialist_id: user.id,
            task_status: In(specialist_task_status),
            deleted_at: IsNull(),
          },
        });
        if (!task) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_active_task'),
          );
        }
        if (media.length === 0) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_proof_active_task'),
          );
        }

        if (task.cancelled_by) {
          const taskCancellation = new TaskCancellationHistoryEntity();
          taskCancellation.task_id = task.id;
          taskCancellation.cancelled_by = task.cancelled_by;
          taskCancellation.cancelled_by_type = task.cancelled_by_type;
          taskCancellation.cancellation_reason = task.cancellation_reason;
          taskCancellation.cancellation_proof = task.cancellation_proof;
          await taskCancellation.save();
        }
        for (let i = 0; i < media.length; i++) {
          const newName = editFileName(media[i]);
          const media_path = fileUpload(
            newName,
            media[i],
            FILE_PATH.cancel_task,
          );
          const file_type = media[i].mimetype.split('/');
          const fileNameObj: FileNameDto = {
            filename: media_path,
            mimetype: file_type[0],
          };
          fileResponse.push(fileNameObj);
        }

        task.task_status = TASK_STATUS.CANCELLATION_REQUEST_BY_SPECIALIST;
        task.cancelled_by = user.id;
        task.cancelled_by_type = TASK_CANCELLATION_BY.SPECIALIST;
        task.cancellation_reason = cancelTaskDto.cancel_reason;
        task.cancellation_proof = JSON.stringify(fileResponse);
        await task.save();

        const notification_route_employer = {
          type: TASK_STATUS.CANCELLATION_REQUEST_BY_SPECIALIST,
          user_type: NOTIFICATION_USER.EMPLOYER,
          id: task.id,
        };

        const notification_route_specialist = {
          type: TASK_STATUS.CANCELLATION_REQUEST_BY_SPECIALIST,
          user_type: NOTIFICATION_USER.SPECIALIST,
          id: task.id,
        };

        const notificationText = await this.i18n.translate(
          'notification.task_cancellation_request_specialist',
          {
            lang: LANGUAGE.EN,
            args: { task_title: task.title, user_name: userData.full_name },
          },
        );
        const notificationText_DA = await this.i18n.translate(
          'notification.task_cancellation_request_specialist',
          {
            lang: LANGUAGE.DE,
            args: { task_title: task.title, user_name: userData.full_name },
          },
        );
        const notification = new NotificationsEntity();
        notification.recipient_id = task.employer_id;
        notification.routes = JSON.stringify(notification_route_employer);
        notification.read_flag = NOTIFICATION_STATUS.UNREAD;
        notification.notification_text = notificationText;
        notification.notification_text_da = notificationText_DA;
        await notification.save();

        const activeTaskCancellation = await this.i18n.translate(
          'notification.task_cancellation_request_details_specialist',
          {
            lang: LANGUAGE.EN,
            args: { task_title: task.title },
          },
        );
        const activeTaskCancellation_DA = await this.i18n.translate(
          'notification.task_cancellation_request_details_specialist',
          {
            lang: LANGUAGE.DE,
            args: { task_title: task.title },
          },
        );
        const notificationSpecialist = new NotificationsEntity();
        notificationSpecialist.recipient_id = task.specialist_id;
        notificationSpecialist.routes = JSON.stringify(
          notification_route_specialist,
        );
        notificationSpecialist.read_flag = NOTIFICATION_STATUS.UNREAD;
        notificationSpecialist.notification_text = activeTaskCancellation;
        notificationSpecialist.notification_text_da = activeTaskCancellation_DA;
        await notificationSpecialist.save();

        const sqlQuery = `
        SELECT email, u.id as user_id
          FROM
              users u
          LEFT JOIN
              tasks t ON u.id = t.employer_id OR u.id = t.specialist_id
          WHERE t.id =${task.id} AND t.deleted_at IS NULL AND u.deleted_at IS NULL`;

        const entityManager = getManager();
        const usersData = await entityManager.query(sqlQuery);
        const emailAddressData = values(usersData);

        for (let i = 0; i < emailAddressData.length; i++) {
          await this.mailerService
            .sendMail({
              to: emailAddressData[i].email,
              from: process.env.SENDGRID_USER_EMAIL,
              subject: await this.i18n.translate(
                'email_subject.task_cancellation_request_created_specialist',
              ),
              template: EMAIL_TEMPLATE.task_cancel_request,
              context: {
                web_url: MARKETPLACE_WEB,
                image_domain: EMAIL_IMAGE_DOMAIN,
                image_path: EMAIL_IMAGE_PATH.images,
                task_id: task.id,
                task_title: task.title,
                cancelled_by: userData.full_name,
              },
            })
            .catch((err) => {
              console.log('Specialist Task Cancellation Mailer Error', err);
            });
        }

        return ResponseMap(
          {
            task: task,
            user_type: cancelTaskDto.user_type,
            task_action: CUSTOM_RESPONSE_STATUS.CANCELLATION,
          },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param AcceptRejectTaskCancellationDto Task_id, Cancellation Decision, User Type
   * @description Generic Accept-Reject Cancel Task request for employer and provider
   * @Created May 13, 2021
   * @Updated May 19, 2021
   **/
  async cancelTaskAcceptReject(
    user: UserEntity,
    cancelTaskDto: AcceptRejectTaskCancellationDto,
    media: Express.Multer.File[],
  ): GlobalResponseType {
    try {
      for (const data of media) {
        const file_type = data.mimetype.split('/');
        if (
          file_type[0] === FILE_TYPE.image &&
          +data.size > FILE_SIZE.task_image
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_image',
            )}`,
          );
        } else if (
          file_type[0] === FILE_TYPE.video &&
          +data.size > FILE_SIZE.task_video
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_video',
            )}`,
          );
        }
      }

      let task: TasksEntity = null;

      const userData = await this.usersService.findUserById(user.id);
      if (cancelTaskDto.user_type === USER_TYPE.EMPLOYER) {
        task = await this.TaskRepository.findOne({
          where: {
            id: cancelTaskDto.task_id,
            employer_id: user.id,
            task_status: TASK_STATUS.CANCELLATION_REQUEST_BY_SPECIALIST,
            deleted_at: IsNull(),
          },
        });
      } else {
        task = await this.TaskRepository.findOne({
          where: {
            id: cancelTaskDto.task_id,
            specialist_id: user.id,
            task_status: TASK_STATUS.CANCELLATION_REQUEST_BY_EMPLOYER,
            deleted_at: IsNull(),
          },
        });
      }

      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_cancel_task'),
        );
      }
      const task_title = task.title;
      const sqlQuery = `
    SELECT email, u.id as user_id
      FROM
          users u
      LEFT JOIN
          tasks t ON u.id = t.employer_id OR u.id = t.specialist_id
      WHERE t.id =${task.id} AND t.deleted_at IS NULL AND u.deleted_at IS NULL`;
      const entityManager = getManager();
      const usersData = await entityManager.query(sqlQuery);
      const emailAddressData = values(usersData);

      const taskBidDetails = await this.TaskBidsRepository.findOne({
        where: {
          task_id: task.id,
          specialist_id: task.specialist_id,
          bid_status: BID_STATUS.ACTIVE,
          deleted_at: IsNull(),
        },
      });

      const fileResponse: Array<FileNameDto> = [];

      if (cancelTaskDto.user_type === USER_TYPE.EMPLOYER) {
        //It will accept / reject request of a specialist task cancellation
        if (cancelTaskDto.task_action === ACCEPT_REJECT.ACCEPT) {
          const taskCancellation = new TaskCancellationHistoryEntity();
          taskCancellation.task_id = task.id;
          taskCancellation.cancelled_by = task.cancelled_by;
          taskCancellation.cancelled_by_type = task.cancelled_by_type;
          taskCancellation.cancellation_reason = task.cancellation_reason;
          taskCancellation.cancellation_proof = task.cancellation_proof;
          await taskCancellation.save();
          const specialist_id = task.specialist_id;

          task.task_status = TASK_STATUS.OPEN;
          task.specialist_id = null;
          task.cancelled_by = null;
          task.cancelled_by_type = null;
          task.cancellation_reason = null;
          task.cancellation_proof = null;
          await task.save();

          const notification_route_employer = {
            type: TASK_STATUS.CANCELLED,
            user_type: NOTIFICATION_USER.EMPLOYER,
            id: task.id,
          };

          const notification_route_specialist = {
            type: TASK_STATUS.CANCELLED,
            user_type: NOTIFICATION_USER.SPECIALIST,
            id: task.id,
          };

          const notificationText = await this.i18n.translate(
            'notification.task_cancellation_request_accepted_specialist',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationText_DA = await this.i18n.translate(
            'notification.task_cancellation_request_accepted_specialist',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notification = new NotificationsEntity();
          notification.recipient_id = specialist_id;
          notification.routes = JSON.stringify(notification_route_specialist);
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();

          const notificationEmployerText = await this.i18n.translate(
            'notification.task_open_for_bidding',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationEmployerText_DA = await this.i18n.translate(
            'notification.task_open_for_bidding',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationEmployer = new NotificationsEntity();
          notificationEmployer.recipient_id = task.employer_id;
          notificationEmployer.routes = JSON.stringify(
            notification_route_employer,
          );
          notificationEmployer.read_flag = NOTIFICATION_STATUS.UNREAD;
          notificationEmployer.notification_text = notificationEmployerText;
          notificationEmployer.notification_text_da = notificationEmployerText_DA;
          await notificationEmployer.save();

          // Specialist Bid status -> Closed
          await this.TaskBidsRepository.update(
            {
              task_id: taskCancellation.task_id,
              specialist_id: taskCancellation.cancelled_by,
              bid_status: BID_STATUS.ACTIVE,
              deleted_at: IsNull(),
            },
            {
              bid_status: BID_STATUS.CLOSED,
            },
          );

          const newOutstandingData = new OutstandingTransactionsEntity();
          newOutstandingData.user_id = task.employer_id;
          newOutstandingData.task_id = task.id;
          const taskID = `${task.id}`.padStart(3, '0');
          newOutstandingData.payment_id = `CP${taskID}${random3Digit()}`;
          newOutstandingData.description = `Task ID:${task.id}, cancellation request approved by employer`;
          newOutstandingData.amount = taskBidDetails.bid_amount;
          newOutstandingData.status = TRANSACTION_STATUS.SUCCESS;
          newOutstandingData.type = TRANSACTION_TYPE.CANCELLED_TASK_PAYMENT;
          newOutstandingData.payment_type = PAYMENT_TYPE.CREDIT;
          await newOutstandingData.save();

          const employerData = await this.UsersRepository.findOne({
            where: { id: task.employer_id, deleted_at: IsNull() },
          });
          employerData.total_outstanding =
            +employerData.total_outstanding + newOutstandingData.amount;
          await employerData.save();

          for (let i = 0; i < emailAddressData.length; i++) {
            await this.mailerService
              .sendMail({
                to: emailAddressData[i].email,
                from: process.env.SENDGRID_USER_EMAIL,
                subject: await this.i18n.translate(
                  'email_subject.task_cancellation_approved',
                ),
                template:
                  +emailAddressData[i].user_id === +user.id
                    ? EMAIL_TEMPLATE.task_open_again // Employer
                    : EMAIL_TEMPLATE.task_cancel_approved, // Specialist
                context: {
                  web_url: MARKETPLACE_WEB,
                  image_domain: EMAIL_IMAGE_DOMAIN,
                  image_path: EMAIL_IMAGE_PATH.images,
                  cancelled_by: userData.full_name,
                  task_title: task_title,
                  task_id: task.id,
                },
              })
              .catch((err) => {
                console.log(
                  'Employer Task Cancellation Approved Mailer Error',
                  err,
                );
              });
          }
          return ResponseMap(
            {
              task: task,
              request_action: CUSTOM_RESPONSE_STATUS.ACCEPTED,
              request_action_from: USER_TYPE.EMPLOYER,
            },
            await this.i18n.translate('success.success'),
          );
        } else {
          task.task_status = TASK_STATUS.REPORTED;
          await task.save();

          if (media.length === 0) {
            throw new BadRequestException(
              await this.i18n.translate('validation_task.no_disagree_proof'),
            );
          }

          for (let i = 0; i < media.length; i++) {
            const newName = editFileName(media[i]);
            const media_path = fileUpload(
              newName,
              media[i],
              FILE_PATH.cancel_task_disagreed,
            );
            const file_type = media[i].mimetype.split('/');
            const fileNameObj: FileNameDto = {
              filename: media_path,
              mimetype: file_type[0],
            };
            fileResponse.push(fileNameObj);
          }

          const taskDisagreeHistory = new TaskDisgreementHistoryEntity();
          taskDisagreeHistory.task_id = task.id;
          taskDisagreeHistory.disagree_by = task.employer_id;
          taskDisagreeHistory.disgree_by_type =
            TASK_CANCELLATION_DISGREE_BY.EMPLOYER;
          taskDisagreeHistory.disgree_reason = cancelTaskDto.disagree_reason;
          taskDisagreeHistory.disagree_proofs = JSON.stringify(fileResponse);
          await taskDisagreeHistory.save();

          const notification_route_employer = {
            type: TASK_STATUS.REPORTED,
            user_type: NOTIFICATION_USER.EMPLOYER,
            id: task.id,
          };

          const notification_route_specialist = {
            type: TASK_STATUS.REPORTED,
            user_type: NOTIFICATION_USER.SPECIALIST,
            id: task.id,
          };

          const notificationText = await this.i18n.translate(
            'notification.task_cancellation_request_rejected_specialist',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationText_DA = await this.i18n.translate(
            'notification.task_cancellation_request_rejected_specialist',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notification = new NotificationsEntity();
          notification.recipient_id = task.specialist_id;
          notification.routes = JSON.stringify(notification_route_specialist);
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();

          const notificationEmployerText = await this.i18n.translate(
            'notification.task_reported',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title },
            },
          );
          const notificationEmployerText_DA = await this.i18n.translate(
            'notification.task_reported',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title },
            },
          );
          const notificationEmployer = new NotificationsEntity();
          notificationEmployer.recipient_id = task.employer_id;
          notificationEmployer.routes = JSON.stringify(
            notification_route_employer,
          );
          notificationEmployer.read_flag = NOTIFICATION_STATUS.UNREAD;
          notificationEmployer.notification_text = notificationEmployerText;
          notificationEmployer.notification_text_da = notificationEmployerText_DA;
          await notificationEmployer.save();

          for (let i = 0; i < emailAddressData.length; i++) {
            await this.mailerService
              .sendMail({
                to: emailAddressData[i].email,
                from: process.env.SENDGRID_USER_EMAIL,
                subject: await this.i18n.translate(
                  'email_subject.task_cancellation_rejected',
                ),
                template: EMAIL_TEMPLATE.task_cancel_rejected,
                context: {
                  web_url: MARKETPLACE_WEB,
                  image_domain: EMAIL_IMAGE_DOMAIN,
                  image_path: EMAIL_IMAGE_PATH.images,
                  task_title: task_title,
                  rejected_by:
                    emailAddressData[i].email === userData.email
                      ? TASK_NOTIFICATION.you
                      : userData.full_name,
                  task_id: task.id,
                },
              })
              .catch((err) => {
                console.log(
                  'Employer Task Cancellation Rejection Mailer Error',
                  err,
                );
              });
          }
          const reportTask = new ReportedTasksEntity();
          reportTask.task_id = task.id;
          reportTask.reported_by = REPORTED_BY.SPECIALIST;
          reportTask.status = REPORTED_TASK_STATUS.OPEN;
          reportTask.report_reason =
            REPORT_TASK_REASON.task_cancellation_rejected +
            `\n ${task.cancellation_reason}`;
          reportTask.proofs = task.cancellation_proof;
          await reportTask.save();
          return ResponseMap(
            {
              reportTask: reportTask,
              request_action: CUSTOM_RESPONSE_STATUS.REJECTED,
              action: CUSTOM_RESPONSE_STATUS.REPORTED,
              request_action_from: USER_TYPE.EMPLOYER,
            },
            await this.i18n.translate('success.success'),
          );
        }
      } else {
        // Specialist Accept-Reject
        if (cancelTaskDto.task_action === ACCEPT_REJECT.ACCEPT) {
          task.task_status = TASK_STATUS.CANCELLED;
          await task.save();

          const notification_route_employer = {
            type: TASK_STATUS.CANCELLED,
            user_type: NOTIFICATION_USER.EMPLOYER,
            id: task.id,
          };

          const notificationText = await this.i18n.translate(
            'notification.task_cancellation_request_approved_employer',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationText_DA = await this.i18n.translate(
            'notification.task_cancellation_request_approved_employer',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notification = new NotificationsEntity();
          notification.recipient_id = task.employer_id;
          notification.routes = JSON.stringify(notification_route_employer);
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();

          const newOutstandingData = new OutstandingTransactionsEntity();
          newOutstandingData.user_id = task.employer_id;
          newOutstandingData.task_id = task.id;
          const taskID = `${task.id}`.padStart(3, '0');
          newOutstandingData.payment_id = `CP${taskID}${random3Digit()}`;
          newOutstandingData.description = `Task ID:${task.id}, cancellation request approved by specialist: ${user.id}`;
          newOutstandingData.amount = taskBidDetails.bid_amount;
          newOutstandingData.status = TRANSACTION_STATUS.SUCCESS;
          newOutstandingData.type = TRANSACTION_TYPE.CANCELLED_TASK_PAYMENT;
          newOutstandingData.payment_type = PAYMENT_TYPE.CREDIT;
          await newOutstandingData.save();

          const employerData = await this.UsersRepository.findOne({
            where: { id: task.employer_id, deleted_at: IsNull() },
          });
          employerData.total_outstanding =
            +employerData.total_outstanding + newOutstandingData.amount;
          await employerData.save();

          for (let i = 0; i < emailAddressData.length; i++) {
            await this.mailerService
              .sendMail({
                to: emailAddressData[i].email,
                from: process.env.SENDGRID_USER_EMAIL,
                subject: await this.i18n.translate(
                  'email_subject.task_cancellation_approved',
                ),
                template:
                  +emailAddressData[i].user_id === +user.id
                    ? EMAIL_TEMPLATE.task_cancelled // Specialist
                    : EMAIL_TEMPLATE.task_cancel_approved, // Employer
                context: {
                  web_url: MARKETPLACE_WEB,
                  image_domain: EMAIL_IMAGE_DOMAIN,
                  image_path: EMAIL_IMAGE_PATH.images,
                  task_message: '',
                  cancelled_by: userData.full_name,
                  task_title: task.title,
                  task_id: task.id,
                },
              })
              .catch((err) => {
                console.log(
                  'Specialist Task Cancellation Approved Mailer Error',
                  err,
                );
              });
            await this.TaskBidsRepository.update(
              {
                task_id: task.id,
                specialist_id: user.id,
                bid_status: BID_STATUS.ACTIVE,
              },
              { bid_status: BID_STATUS.CLOSED },
            );
            // #TODO Refund to employer -> Init Refund/Transfer Process
            return ResponseMap(
              {
                task: task,
                request_action: CUSTOM_RESPONSE_STATUS.ACCEPTED,
                request_actione_from: USER_TYPE.SPECIALIST,
              },
              await this.i18n.translate('success.success'),
            );
          }

          return ResponseMap(
            {
              task: task,
              request_action: CUSTOM_RESPONSE_STATUS.ACCEPTED,
              request_action_from: USER_TYPE.SPECIALIST,
            },
            await this.i18n.translate('success.success'),
          );
        } else {
          task.task_status = TASK_STATUS.REPORTED;
          await task.save();

          if (media.length === 0) {
            throw new BadRequestException(
              await this.i18n.translate('validation_task.no_disagree_proof'),
            );
          }

          for (let i = 0; i < media.length; i++) {
            const newName = editFileName(media[i]);
            const media_path = fileUpload(
              newName,
              media[i],
              FILE_PATH.cancel_task_disagreed,
            );
            const file_type = media[i].mimetype.split('/');
            const fileNameObj: FileNameDto = {
              filename: media_path,
              mimetype: file_type[0],
            };
            fileResponse.push(fileNameObj);
          }

          const taskDisagreeHistory = new TaskDisgreementHistoryEntity();
          taskDisagreeHistory.task_id = task.id;
          taskDisagreeHistory.disagree_by = task.specialist_id;
          taskDisagreeHistory.disgree_by_type =
            TASK_CANCELLATION_DISGREE_BY.SPECIALIST;
          taskDisagreeHistory.disgree_reason = cancelTaskDto.disagree_reason;
          taskDisagreeHistory.disagree_proofs = JSON.stringify(fileResponse);
          await taskDisagreeHistory.save();

          const notification_route_employer = {
            type: TASK_STATUS.REPORTED,
            user_type: NOTIFICATION_USER.EMPLOYER,
            id: task.id,
          };

          const notification_route_specialist = {
            type: TASK_STATUS.REPORTED,
            user_type: NOTIFICATION_USER.SPECIALIST,
            id: task.id,
          };

          const notificationText = await this.i18n.translate(
            'notification.task_cancellation_request_rejected_employer',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationText_DA = await this.i18n.translate(
            'notification.task_cancellation_request_rejected_employer',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notification = new NotificationsEntity();
          notification.recipient_id = task.employer_id;
          notification.routes = JSON.stringify(notification_route_employer);
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();

          const notificationSpecialistText = await this.i18n.translate(
            'notification.task_reported',
            {
              lang: LANGUAGE.EN,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationSpecialistText_DA = await this.i18n.translate(
            'notification.task_reported',
            {
              lang: LANGUAGE.DE,
              args: { task_title: task.title, user_name: userData.full_name },
            },
          );
          const notificationSpecialist = new NotificationsEntity();
          notificationSpecialist.recipient_id = task.specialist_id;
          notificationSpecialist.routes = JSON.stringify(
            notification_route_specialist,
          );
          notificationSpecialist.read_flag = NOTIFICATION_STATUS.UNREAD;
          notificationSpecialist.notification_text = notificationSpecialistText;
          notificationSpecialist.notification_text_da = notificationSpecialistText_DA;
          await notificationSpecialist.save();

          for (let i = 0; i < emailAddressData.length; i++) {
            await this.mailerService
              .sendMail({
                to: emailAddressData[i].email,
                from: process.env.SENDGRID_USER_EMAIL,
                subject: await this.i18n.translate(
                  'email_subject.task_cancellation_rejected',
                ),
                template: EMAIL_TEMPLATE.task_cancel_rejected,
                context: {
                  web_url: MARKETPLACE_WEB,
                  image_domain: EMAIL_IMAGE_DOMAIN,
                  image_path: EMAIL_IMAGE_PATH.images,
                  task_id: task.id,
                },
              })
              .catch((err) => {
                console.log(
                  'Employer Task Cancellation Rejection Mailer Error',
                  err,
                );
              });
          }
          const reportTask = new ReportedTasksEntity();
          reportTask.task_id = task.id;
          reportTask.reported_by = REPORTED_BY.EMPLOYER;
          reportTask.status = REPORTED_TASK_STATUS.OPEN;
          reportTask.report_reason =
            REPORT_TASK_REASON.task_cancellation_rejected +
            `\n ${task.cancellation_reason}`;
          reportTask.proofs = task.cancellation_proof;
          await reportTask.save();
          await this.TaskBidsRepository.update(
            {
              task_id: task.id,
              specialist_id: user.id,
              bid_status: BID_STATUS.ACTIVE,
            },
            { bid_status: BID_STATUS.CLOSED },
          );
          return ResponseMap(
            {
              reportTask: reportTask,
              request_action: CUSTOM_RESPONSE_STATUS.REJECTED,
              action: CUSTOM_RESPONSE_STATUS.REPORTED,
              request_actione_from: USER_TYPE.SPECIALIST,
            },
            await this.i18n.translate('success.success'),
          );
        }
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param CompleteTaskDto Task Completion Proofs, Task_id
   * @description Specialist complete an active task
   * @Created May 19, 2021
   * @Updated May 21, 2021
   **/
  async completeTask(
    user: UserEntity,
    completeTaskDto: CompleteTaskDto,
    media: Express.Multer.File[],
  ): GlobalResponseType {
    try {
      for (const data of media) {
        const file_type = data.mimetype.split('/');
        if (
          file_type[0] === FILE_TYPE.image &&
          +data.size > FILE_SIZE.task_image
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_image',
            )}`,
          );
        } else if (
          file_type[0] === FILE_TYPE.video &&
          +data.size > FILE_SIZE.task_video
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_video',
            )}`,
          );
        }
      }

      const userData = await this.usersService.findUserById(user.id);
      const adminData = await this.UsersRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      const fileResponse: Array<FileNameDto> = [];
      const task = await this.TaskRepository.findOne({
        where: {
          id: completeTaskDto.task_id,
          specialist_id: user.id,
          task_status: TASK_STATUS.ACTIVE,
          deleted_at: IsNull(),
        },
      });
      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_task.no_active_task_to_complete',
          ),
        );
      }

      for (let i = 0; i < media.length; i++) {
        const newName = editFileName(media[i]);
        const media_path = fileUpload(
          newName,
          media[i],
          FILE_PATH.complete_task,
        );
        const file_type = media[i].mimetype.split('/');
        const fileNameObj: FileNameDto = {
          filename: media_path,
          mimetype: file_type[0],
        };
        fileResponse.push(fileNameObj);
      }

      task.task_status = TASK_STATUS.COMPLETED;
      task.completion_proof = JSON.stringify(fileResponse);
      task.completed_at = new Date();
      await task.save();

      const taskBidDetails = await this.TaskBidsRepository.findOne({
        where: {
          task_id: task.id,
          specialist_id: user.id,
          bid_status: BID_STATUS.ACTIVE,
          deleted_at: IsNull(),
        },
      });

      const notification_route_employer = {
        type: TASK_STATUS.COMPLETED,
        user_type: NOTIFICATION_USER.EMPLOYER,
        id: task.id,
      };

      const notification_route_specialist = {
        type: TASK_STATUS.COMPLETED,
        user_type: NOTIFICATION_USER.SPECIALIST,
        id: task.id,
      };

      const notification_route_admin = {
        type: TASK_STATUS.COMPLETED,
        user_type: NOTIFICATION_USER.ADMIN,
        id: task.id,
      };

      const notificationText = await this.i18n.translate(
        'notification.task_completed_by_specialist',
        {
          lang: LANGUAGE.EN,
          args: { user_name: userData.full_name, task_title: task.title },
        },
      );
      const notificationText_DA = await this.i18n.translate(
        'notification.task_completed_by_specialist',
        {
          lang: LANGUAGE.DE,
          args: { user_name: userData.full_name, task_title: task.title },
        },
      );
      const notification = new NotificationsEntity();
      notification.recipient_id = task.employer_id;
      notification.routes = JSON.stringify(notification_route_employer);
      notification.read_flag = NOTIFICATION_STATUS.UNREAD;
      notification.notification_text = notificationText;
      notification.notification_text_da = notificationText_DA;
      await notification.save();

      const notificationSpecialistText = await this.i18n.translate(
        'notification.task_payment_transfer_specialist',
        {
          lang: LANGUAGE.EN,
          args: { task_title: task.title },
        },
      );
      const notificationSpecialistText_DA = await this.i18n.translate(
        'notification.task_payment_transfer_specialist',
        {
          lang: LANGUAGE.DE,
          args: { task_title: task.title },
        },
      );
      const notificationSpecialist = new NotificationsEntity();
      notificationSpecialist.recipient_id = task.specialist_id;
      notificationSpecialist.routes = JSON.stringify(
        notification_route_specialist,
      );
      notificationSpecialist.read_flag = NOTIFICATION_STATUS.UNREAD;
      notificationSpecialist.notification_text = notificationSpecialistText;
      notificationSpecialist.notification_text_da = notificationSpecialistText_DA;
      await notificationSpecialist.save();

      const amountToPay = cutMarketplacePercentage(taskBidDetails.bid_amount);
      const newOutstandingData = new OutstandingTransactionsEntity();
      newOutstandingData.user_id = user.id;
      newOutstandingData.task_id = task.id;
      const taskID = `${task.id}`.padStart(3, '0');
      newOutstandingData.payment_id = `CP${taskID}${random3Digit()}`;
      newOutstandingData.description = `Payment of Task: ${task.title} as it is marked as  completed `;
      newOutstandingData.amount = amountToPay;
      newOutstandingData.type = TRANSACTION_TYPE.TASK_COMPLETION_PAYMENT;
      newOutstandingData.payment_type = PAYMENT_TYPE.CREDIT;
      newOutstandingData.status = TRANSACTION_STATUS.SUCCESS;
      await newOutstandingData.save();

      userData.total_outstanding = +userData.total_outstanding + amountToPay;
      await userData.save();
      await this.mailerService
        .sendMail({
          to: userData.email,
          from: process.env.SENDGRID_USER_EMAIL,
          subject: await this.i18n.translate(
            'email_subject.task_marked_completed',
          ),
          template: EMAIL_TEMPLATE.task_completed,
          context: {
            web_url: MARKETPLACE_WEB,
            image_domain: EMAIL_IMAGE_DOMAIN,
            image_path: EMAIL_IMAGE_PATH.images,
            task_title: task.title,
            task_id: task.id,
          },
        })
        .catch((err) => {
          console.log('Open Task Completed mail error', err);
        });

      const adminNotification = new NotificationsEntity();
      adminNotification.recipient_id = adminData.id;
      adminNotification.routes = JSON.stringify(notification_route_admin);
      adminNotification.read_flag = NOTIFICATION_STATUS.UNREAD;
      adminNotification.notification_text = notificationText;
      adminNotification.notification_text_da = notificationText_DA;
      await adminNotification.save();

      return ResponseMap(
        {
          task: task,
          task_action: CUSTOM_RESPONSE_STATUS.COMPLETED,
        },
        await this.i18n.translate('success.success'),
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param ReportTaskDto Task Report Proofs,Reason, Task_id
   * @description Employer or Specialist report a completed task within 48 Hours of completion
   * @Created May 19, 2021
   * @Updated Jan 28, 2022
   **/
  async reportTask(
    user: UserEntity,
    reportTaskDto: ReportTaskDto,
    media: Express.Multer.File[],
  ): GlobalResponseType {
    try {
      for (const data of media) {
        const file_type = data.mimetype.split('/');
        if (
          file_type[0] === FILE_TYPE.image &&
          +data.size > FILE_SIZE.task_image
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_image',
            )}`,
          );
        } else if (
          file_type[0] === FILE_TYPE.video &&
          +data.size > FILE_SIZE.task_video
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_video',
            )}`,
          );
        }
      }

      const adminData = await this.UsersRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });
      const task_status: Array<number> = [
        TASK_STATUS.COMPLETED,
        TASK_STATUS.CANCELLED,
        TASK_STATUS.REPORTED,
      ];
      const fileResponse: Array<FileNameDto> = [];
      let task: TasksEntity = null;
      let userData: UserEntity = null;
      let emailSubject: string = null;
      let reportedBy: number = null;

      if (reportTaskDto.user_type === USER_TYPE.EMPLOYER) {
        task = await this.TaskRepository.findOne({
          where: {
            id: reportTaskDto.task_id,
            employer_id: user.id,
            task_status: In(task_status),
            deleted_at: IsNull(),
          },
        });
        reportedBy = REPORTED_BY.EMPLOYER;
      } else {
        task = await this.TaskRepository.findOne({
          where: {
            id: reportTaskDto.task_id,
            specialist_id: user.id,
            task_status: In(task_status),
            deleted_at: IsNull(),
          },
        });
        reportedBy = REPORTED_BY.SPECIALIST;
      }
      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_task.no_complete_cancelled_task_to_report',
          ),
        );
      }
      if (reportTaskDto.user_type === USER_TYPE.EMPLOYER) {
        userData = await this.usersService.findUserById(task.employer_id);
        emailSubject = await this.i18n.translate(
          'email_subject.task_reported_by_employer',
        );
      } else {
        userData = await this.usersService.findUserById(task.specialist_id);
        emailSubject = await this.i18n.translate(
          'email_subject.task_reported_by_specialist',
        );
      }

      for (let i = 0; i < media.length; i++) {
        const newName = editFileName(media[i]);
        const media_path = fileUpload(newName, media[i], FILE_PATH.report_task);
        const file_type = media[i].mimetype.split('/');
        const fileNameObj: FileNameDto = {
          filename: media_path,
          mimetype: file_type[0],
        };
        fileResponse.push(fileNameObj);
      }

      const taskCompletionTime = task.completed_at;
      const completeTaskTime = moment(taskCompletionTime);
      const currentTime = moment(new Date());
      const minutes_diff = currentTime.diff(completeTaskTime, 'minutes');
      if (minutes_diff >= 0 && minutes_diff <= 48 * 60) {
        task.task_status = TASK_STATUS.REPORTED;
      } else if (taskCompletionTime) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_task.can_no_report_task_48_hours',
          ),
        );
      }
      task.task_status = TASK_STATUS.REPORTED;
      await task.save();
      const existingReport = await this.ReportedTasksRepository.findOne({
        where: {
          task_id: task.id,
          reported_by: reportedBy,
          deleted_at: IsNull(),
        },
      });
      if (existingReport) {
        const proofsFiles = JSON.parse(existingReport.proofs);

        fileRemovalFromSystem(proofsFiles, FILE_PATH.report_task);

        existingReport.proofs = JSON.stringify(fileResponse);
        existingReport.report_reason = reportTaskDto.report_reason;
        await existingReport.save();
        return ResponseMap({
          reportTask: existingReport,
          report_action: CUSTOM_RESPONSE_STATUS.UPDATE,
          task_action: CUSTOM_RESPONSE_STATUS.REPORTED,
        });
      } else {
        const reportTask = new ReportedTasksEntity();
        reportTask.task_id = task.id;
        reportTask.reported_by = reportedBy;
        reportTask.proofs = JSON.stringify(fileResponse);
        reportTask.report_reason = reportTaskDto.report_reason;
        reportTask.status = REPORTED_TASK_STATUS.OPEN;
        await reportTask.save();

        const notification_route = {
          type: TASK_STATUS.REPORTED,
          user_type:
            reportTaskDto.user_type === USER_TYPE.EMPLOYER
              ? NOTIFICATION_USER.EMPLOYER
              : NOTIFICATION_USER.SPECIALIST,
          id: task.id,
        };

        const notification_route_admin = {
          type: TASK_STATUS.REPORTED,
          user_type: NOTIFICATION_USER.ADMIN,
          id: task.id,
        };

        const reportedByEmployer = await this.i18n.translate(
          'notification.task_reported_by_employer',
          {
            lang: LANGUAGE.EN,
            args: { user_name: userData.full_name, task_title: task.title },
          },
        );
        const reportedByEmployer_DA = await this.i18n.translate(
          'notification.task_reported_by_employer',
          {
            lang: LANGUAGE.DE,
            args: { user_name: userData.full_name, task_title: task.title },
          },
        );
        const reportedBySpecialist = await this.i18n.translate(
          'notification.task_reported_by_specialist',
          {
            lang: LANGUAGE.EN,
            args: { user_name: userData.full_name, task_title: task.title },
          },
        );
        const reportedBySpecialist_DA = await this.i18n.translate(
          'notification.task_reported_by_specialist',
          {
            lang: LANGUAGE.DE,
            args: { user_name: userData.full_name, task_title: task.title },
          },
        );

        const recipient_id =
          reportTaskDto.user_type === USER_TYPE.EMPLOYER
            ? task.specialist_id
            : task.employer_id;
        const notificationText =
          reportTaskDto.user_type === USER_TYPE.EMPLOYER
            ? reportedByEmployer
            : reportedBySpecialist;
        const notificationText_DA =
          reportTaskDto.user_type === USER_TYPE.EMPLOYER
            ? reportedByEmployer_DA
            : reportedBySpecialist_DA;

        const notification = new NotificationsEntity();
        notification.recipient_id = recipient_id;
        notification.routes = JSON.stringify(notification_route);
        notification.read_flag = NOTIFICATION_STATUS.UNREAD;
        notification.notification_text = notificationText;
        notification.notification_text_da = notificationText_DA;
        await notification.save();

        const adminNotification = new NotificationsEntity();
        adminNotification.recipient_id = adminData.id;
        adminNotification.routes = JSON.stringify(notification_route_admin);
        adminNotification.read_flag = NOTIFICATION_STATUS.UNREAD;
        adminNotification.notification_text = notificationText;
        adminNotification.notification_text_da = notificationText_DA;
        await adminNotification.save();

        await this.mailerService
          .sendMail({
            to: userData.email,
            from: process.env.SENDGRID_USER_EMAIL,
            cc: adminData.email,
            subject: emailSubject,
            template: EMAIL_TEMPLATE.task_reported,
            context: {
              web_url: MARKETPLACE_WEB,
              image_domain: EMAIL_IMAGE_DOMAIN,
              image_path: EMAIL_IMAGE_PATH.images,
              reported_by: userData.full_name,
              task_title: task.title,
              task_id: task.id,
            },
          })
          .catch((err) => {
            console.log('Report Task Mailer Error', err);
          });

        return ResponseMap(
          {
            reported_task: reportTask,
            report_action: CUSTOM_RESPONSE_STATUS.CREATE,
            task_action: CUSTOM_RESPONSE_STATUS.REPORTED,
          },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param InviteTaskDto Task_id (Array, size max: 3), Specialist Id, Visibility
   * @description  Employer can invite upto 3 tasks to one specialist
   * @Created May 19, 2021
   * @Updated May 19, 2021
   **/
  async inviteTask(
    user: UserEntity,
    inviteTaskDto: InviteTaskDto,
  ): GlobalResponseType {
    try {
      const specialistData = await this.usersService.findUserById(
        inviteTaskDto.specialist_id,
      );
      const userData = await this.usersService.findUserById(user.id);

      if (!specialistData) {
        throw new BadRequestException(
          await this.i18n.translate('validation.no_specialist_found'),
        );
      }

      for (let i = 0; i < inviteTaskDto.task_id.length; i++) {
        const task = await this.TaskRepository.findOne({
          where: {
            id: inviteTaskDto.task_id[i],
            employer_id: user.id,
            task_status: TASK_STATUS.OPEN,
            deleted_at: IsNull(),
          },
        });
        if (task) {
          const objData = {
            specialist_id: inviteTaskDto.specialist_id,
          };
          const invitedUser: Array<any> = task.invited_users
            ? JSON.parse(task.invited_users)
            : [];
          const alreadyInvited = find(invitedUser, (data) => {
            return data.specialist_id === inviteTaskDto.specialist_id
              ? true
              : false;
          });
          if (
            alreadyInvited &&
            task.visibility !== inviteTaskDto.visible_to_others
          ) {
            task.visibility = inviteTaskDto.visible_to_others;
            await task.save();
          }
          if (!alreadyInvited) {
            task.invited_users = JSON.stringify(concat(invitedUser, objData));
            task.visibility = inviteTaskDto.visible_to_others;
            await task.save();

            const notification_route = {
              type: TASK_STATUS.OPEN,
              user_type: NOTIFICATION_USER.SPECIALIST,
              id: task.id,
            };

            const notificationText = await this.i18n.translate(
              'notification.task_suggested_by_employer',
              {
                lang: LANGUAGE.EN,
                args: { user_name: userData.full_name, task_title: task.title },
              },
            );
            const notificationText_DA = await this.i18n.translate(
              'notification.task_suggested_by_employer',
              {
                lang: LANGUAGE.DE,
                args: { user_name: userData.full_name, task_title: task.title },
              },
            );
            const notification = new NotificationsEntity();
            notification.recipient_id = inviteTaskDto.specialist_id;
            notification.routes = JSON.stringify(notification_route);
            notification.read_flag = NOTIFICATION_STATUS.UNREAD;
            notification.notification_text = notificationText;
            notification.notification_text_da = notificationText_DA;
            await notification.save();

            await this.mailerService
              .sendMail({
                to: specialistData.email,
                from: process.env.SENDGRID_USER_EMAIL,
                subject: await this.i18n.translate('email_subject.task_invite'),
                template: EMAIL_TEMPLATE.task_invite,
                context: {
                  web_url: MARKETPLACE_WEB,
                  image_domain: EMAIL_IMAGE_DOMAIN,
                  image_path: EMAIL_IMAGE_PATH.images,
                  task_title: task.title,
                  employer_name: userData.full_name,
                },
              })
              .catch((err) => {
                console.log('Invite Task Mailer Error', err);
              });
          }
        } else {
          throw new BadRequestException(
            `${await this.i18n.translate('validation_task.no_task')} for ${
              inviteTaskDto.task_id[i]
            }`,
          );
        }
      }

      return ResponseMap(
        {
          invited_specialist: inviteTaskDto.specialist_id,
          task_id: inviteTaskDto.task_id,
        },
        await this.i18n.translate('success.task_invited_success'),
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param RateReviewTaskDto Task_id, Rating, Review, User Type
   * @description  Employer can review specialist after task is cancelled or completed
   * @Created May 13, 2021
   * @Updated May 19, 2021
   **/
  async rateReviewTask(
    user: UserEntity,
    rateReviewTaskDto: RateReviewTaskDto,
  ): GlobalResponseType {
    try {
      let task: TasksEntity = null;
      const userData = await this.usersService.findUserById(user.id);
      if (rateReviewTaskDto.user_type === USER_TYPE.EMPLOYER) {
        task = await this.TaskRepository.findOne({
          where: {
            id: rateReviewTaskDto.task_id,
            employer_id: user.id,
            task_status: In([TASK_STATUS.COMPLETED, TASK_STATUS.CANCELLED]),
            deleted_at: IsNull(),
          },
        });
      } else {
        task = await this.TaskRepository.findOne({
          where: {
            id: rateReviewTaskDto.task_id,
            specialist_id: user.id,
            task_status: In([TASK_STATUS.COMPLETED, TASK_STATUS.CANCELLED]),
            deleted_at: IsNull(),
          },
        });
      }
      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_task.no_completed_cancelled_task_for_review',
          ),
        );
      }
      const taskRatingReview = await this.TaskReviewsRepository.findOne({
        where: {
          task_id: rateReviewTaskDto.task_id,
          reviewer_id: user.id,
          reviewed_by:
            rateReviewTaskDto.user_type === USER_TYPE.EMPLOYER ? 0 : 1,
          deleted_at: IsNull(),
        },
      });
      if (taskRatingReview) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.task_is_already_reviewed'),
        );
      } else {
        const ratingReview = new TaskReviewsEntity();
        ratingReview.task_id = rateReviewTaskDto.task_id;
        ratingReview.reviewer_id = user.id;
        ratingReview.reviewed_by =
          rateReviewTaskDto.user_type === USER_TYPE.EMPLOYER ? 0 : 1;
        ratingReview.rating = rateReviewTaskDto.task_rating;
        ratingReview.review = rateReviewTaskDto.task_review;
        await ratingReview.save();

        const rateByEmployer = await this.i18n.translate(
          'notification.task_rated_by_employer',
          {
            lang: LANGUAGE.EN,
            args: { task_title: task.title },
          },
        );
        const rateByEmployer_DA = await this.i18n.translate(
          'notification.task_rated_by_employer',
          {
            lang: LANGUAGE.DE,
            args: { task_title: task.title },
          },
        );
        const rateBySpecialist = await this.i18n.translate(
          'notification.task_rated_by_specialist',
          {
            lang: LANGUAGE.EN,
            args: { task_title: task.title },
          },
        );
        const rateBySpecialist_DA = await this.i18n.translate(
          'notification.task_rated_by_specialist',
          {
            lang: LANGUAGE.DE,
            args: { task_title: task.title },
          },
        );
        const recipient_id =
          rateReviewTaskDto.user_type === USER_TYPE.EMPLOYER
            ? task.specialist_id
            : task.employer_id;

        const notificationText =
          rateReviewTaskDto.user_type === USER_TYPE.EMPLOYER
            ? rateByEmployer
            : rateBySpecialist;
        const notificationText_DA =
          rateReviewTaskDto.user_type === USER_TYPE.EMPLOYER
            ? rateByEmployer_DA
            : rateBySpecialist_DA;
        if (recipient_id) {
          const notification_route = {
            type: TASK_STATUS.COMPLETED,
            user_type:
              rateReviewTaskDto.user_type === USER_TYPE.EMPLOYER
                ? NOTIFICATION_USER.SPECIALIST
                : NOTIFICATION_USER.EMPLOYER,
            id: task.id,
          };

          const notification = new NotificationsEntity();
          notification.recipient_id = recipient_id;
          notification.routes = JSON.stringify(notification_route);
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();
        }

        return ResponseMap(
          {
            ratingReview: ratingReview,
          },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param MyTaskDto Task_id, User Type
   * @description  Generic Single Task Details for Employer and Specialist
   * @Created May 12, 2021
   * @Updated May 12, 2021
   **/
  async getTaskDetails(
    user: UserEntity,
    myTaskParams: MyTaskDto,
  ): GlobalResponseType {
    try {
      let task: TasksEntity = null;
      let bid = null;
      let specialistDetails: UserEntity = null;
      let employerDetails: UserEntity = null;
      let media = null;
      if (myTaskParams.user_type === USER_TYPE.EMPLOYER) {
        task = await this.TaskRepository.findOne({
          where: {
            id: +myTaskParams.task_id,
            employer_id: user.id,
            deleted_at: IsNull(),
          },
        });
        if (!task) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_task'),
          );
        }
        bid = await this.TaskBidsRepository.findAndCount({
          where: {
            task_id: +myTaskParams.task_id,
            deleted_at: IsNull(),
          },
        });
        media = await this.TaskMediaRepository.find({
          where: {
            task_id: +myTaskParams.task_id,
            deleted_at: IsNull(),
          },
        });
        const valueAllBids = values(bid[0]);
        const bidDetails = filter(valueAllBids, {
          bid_status: BID_STATUS.ACTIVE,
        });

        if (bidDetails.length > 0) {
          specialistDetails = await this.usersService.findUserById(
            bidDetails[0].specialist_id,
          );
        }
        const total_bid = bid ? bid[1] : 0;
        const bid_amount = bidDetails.length ? bidDetails[0].bid_amount : 0;
        let room_id = null;
        if (task.specialist_id) {
          const sqlQuery = `
          SELECT DISTINCT (cr.id) as room_id, COUNT(cr.id) as room_count from chat_rooms cr
          INNER JOIN room_participants rp on cr.id = rp.room_id
          WHERE cr.task_id =${task.id} AND rp.user_id IN (${task.employer_id},${task.specialist_id})
          GROUP BY (cr.id)
          HAVING COUNT(cr.id) >=2`;
          const entityManager = getManager();
          const resultResponse = await entityManager.query(sqlQuery);
          const resultValues = values(resultResponse);
          const room_value = uniqBy(resultValues, 'room_id')[0];
          room_id = room_value ? room_value.room_id : null;
        }

        const start_time = task.start_date_time
          ? moment(task.start_date_time).hour()
          : 0;
        const end_time = task.end_date_time
          ? moment(task.end_date_time).hour()
          : 0;
        const start_date = task.start_date_time
          ? moment(task.start_date_time)
              .subtract(start_time, 'h')
              .format('YYYY-MM-DD')
          : null;
        const end_date = task.end_date_time
          ? moment(task.end_date_time)
              .subtract(end_time, 'h')
              .format('YYYY-MM-DD')
          : null;

        let resolvedTask = false;
        if (task.task_status === TASK_STATUS.REPORTED) {
          const resolvedTaskDetails = await this.ReportedTasksRepository.findOne(
            {
              where: {
                task_id: task.id,
                status: REPORTED_TASK_STATUS.RESOLVED,
                deleted_at: IsNull(),
              },
            },
          );
          resolvedTask = resolvedTaskDetails ? true : false;
        }

        const employerReview = { rating: 0, review: '' };
        if (
          task.task_status === TASK_STATUS.COMPLETED ||
          TASK_STATUS.CANCELLED
        ) {
          const review = await this.TaskReviewsRepository.findOne({
            where: {
              task_id: task.id,
              reviewer_id: user.id,
              reviewed_by: USER_TYPE_NUMBER.EMPLOYER,
            },
          });

          if (review) {
            employerReview.rating = review.rating;
            employerReview.review = review.review;
          }
        }

        return ResponseMap(
          {
            task: assign(task, { start_date, start_time, end_date, end_time }),
            taskMedia: media,
            totalBid: total_bid,
            activeBidAmount: +bid_amount,
            specialistDetails: specialistDetails ? specialistDetails : {},
            resolvedTask: resolvedTask,
            room_id: room_id,
            employerReview,
          },
          await this.i18n.translate('success.success'),
        );
      } else if (myTaskParams.user_type === USER_TYPE.SPECIALIST) {
        task = await this.TaskRepository.findOne({
          where: {
            id: +myTaskParams.task_id,
            deleted_at: IsNull(),
          },
        });
        if (!task) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_task'),
          );
        }
        // If task !open && !specialist is loggedIn user -> Error
        if (
          task.task_status !== TASK_STATUS.OPEN &&
          task.specialist_id !== user.id
        ) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_open_task'),
          );
        } else if (task.specialist_id === user.id) {
          bid = await this.TaskBidsRepository.findOne({
            where: {
              task_id: +myTaskParams.task_id,
              specialist_id: user.id,
              deleted_at: IsNull(),
            },
          });
        }

        const sqlQuery = `
        SELECT DISTINCT (cr.id) as room_id, COUNT(cr.id) as room_count from chat_rooms cr
        INNER JOIN room_participants rp on cr.id = rp.room_id
        WHERE cr.task_id =${task.id} AND rp.user_id IN (${task.employer_id},${task.specialist_id})
        GROUP BY (cr.id)
        HAVING COUNT(cr.id) >=2`;
        const entityManager = getManager();
        const resultResponse = await entityManager.query(sqlQuery);
        const resultValues = values(resultResponse);
        const room_value = uniqBy(resultValues, 'room_id')[0];

        const bidData = await this.TaskBidsRepository.findOne({
          where: {
            task_id: task.id,
            specialist_id: user.id,
            deleted_at: IsNull(),
          },
        });

        media = await this.TaskMediaRepository.find({
          where: {
            task_id: +myTaskParams.task_id,
            deleted_at: IsNull(),
          },
        });

        employerDetails = await this.usersService.findUserById(
          task.employer_id,
        );
        let resolvedTask = false;
        if (task.task_status === TASK_STATUS.REPORTED) {
          const resolvedTaskDetails = await this.ReportedTasksRepository.findOne(
            {
              where: {
                task_id: task.id,
                status: REPORTED_TASK_STATUS.RESOLVED,
                deleted_at: IsNull(),
              },
            },
          );
          resolvedTask = resolvedTaskDetails ? true : false;
        }

        const specialistReview = { rating: 0, review: '' };
        if (
          task.task_status === TASK_STATUS.COMPLETED ||
          TASK_STATUS.CANCELLED
        ) {
          const review = await this.TaskReviewsRepository.findOne({
            where: {
              task_id: task.id,
              reviewer_id: user.id,
              reviewed_by: USER_TYPE_NUMBER.SPECIALIST,
            },
          });

          if (review) {
            specialistReview.rating = review.rating;
            specialistReview.review = review.review;
          }
        }

        return ResponseMap(
          {
            task: task,
            taskMedia: media,
            openTaskBid: bidData ? bidData : null,
            placed_bid: bid ? bid : [],
            employerDetails: employerDetails,
            resolvedTask: resolvedTask,
            room_id: room_value ? room_value.room_id : null,
            specialistReview,
          },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Bhargav Sakaria
   * @param task_id
   * @description Generic Single Task Details for Guest user
   * @Created June 01, 2021
   * @Updated June 01, 2021
   **/
  async guestGetTaskDetails(task_id: string): GlobalResponseType {
    try {
      let task: TasksEntity = null;
      let bid = null;
      let specialistDetails: UserEntity = null;
      let employerDetails: UserEntity = null;
      let media = null;

      task = await this.TaskRepository.findOne(+task_id);
      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_task'),
        );
      }

      bid = await this.TaskBidsRepository.findAndCount({
        where: {
          task_id: +task_id,
        },
      });
      media = await this.TaskMediaRepository.find({
        where: {
          task_id: +task_id,
        },
      });

      const valueAllBids = values(bid[0]);
      const bidDetails = filter(valueAllBids, {
        bid_status: BID_STATUS.ACTIVE,
      });

      if (bidDetails.length > 0) {
        specialistDetails = await this.usersService.findUserById(
          bidDetails[0].specialist_id,
        );
      }
      const total_bid = bid ? bid[1] : 0;
      const bid_amount = bidDetails.length ? bidDetails[0].bid_amount : 0;

      const start_time = task.start_date_time
        ? moment(task.start_date_time).hour()
        : 0;
      const end_time = task.end_date_time
        ? moment(task.end_date_time).hour()
        : 0;
      const start_date = task.start_date_time
        ? moment(task.start_date_time)
            .subtract(start_time, 'h')
            .format('YYYY-MM-DD')
        : null;
      const end_date = task.end_date_time
        ? moment(task.end_date_time)
            .subtract(end_time, 'h')
            .format('YYYY-MM-DD')
        : null;

      let resolvedTask = false;
      if (task.task_status === TASK_STATUS.REPORTED) {
        const resolvedTaskDetails = await this.ReportedTasksRepository.findOne({
          where: {
            task_id: task.id,
            status: REPORTED_TASK_STATUS.RESOLVED,
            deleted_at: IsNull(),
          },
        });
        resolvedTask = resolvedTaskDetails ? true : false;
      }

      employerDetails = await this.usersService.findUserById(task.employer_id);

      return ResponseMap(
        {
          task: assign(task, { start_date, start_time, end_date, end_time }),
          taskMedia: media,
          totalBid: total_bid,
          activeBidAmount: +bid_amount,
          employerDetails: employerDetails,
          specialistDetails: specialistDetails ? specialistDetails : {},
          resolvedTask: resolvedTask,
        },
        await this.i18n.translate('success.success'),
      );
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param FindTaskDto Conditions according to task filtration
   * @description  Find Open Tasks for specialist
   * @Created May 13, 2021
   * @Updated May 19, 2021
   **/
  async findTasks(
    user: UserEntity,
    findTaskDto: FindTaskDto,
  ): GlobalResponseType {
    try {
      const take = findTaskDto.limit;
      const page = findTaskDto.page;
      const skip = (page - 1) * take;
      let conditions = '';
      let havingConditions = '';
      let urgentConditions = '';
      let userJoin = '';

      const adminData = await this.UsersRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      const userData = await this.UsersRepository.findOne({
        where: { id: user.id, deleted_at: IsNull() },
      });

      if (findTaskDto.radius && (!userData.latitude || !userData.longitude)) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_task.no_user_location_available',
          ),
        );
      }

      if (
        findTaskDto.task_for_business === 1 &&
        findTaskDto.task_for_freelance === 1
      ) {
        conditions = conditions + ' AND t.specialist_preference = 2';
      } else {
        if (findTaskDto.task_for_business === 1) {
          conditions =
            conditions +
            ' AND (t.specialist_preference = 0 OR t.specialist_preference = 2) ';
        }
        if (findTaskDto.task_for_freelance === 1) {
          conditions =
            conditions +
            ' AND (t.specialist_preference = 1 OR t.specialist_preference = 2)';
        }
      }
      if (findTaskDto.remote_work === 1) {
        conditions =
          conditions + ` AND t.remote_job = ${findTaskDto.remote_work}`;
      }
      if (findTaskDto.category) {
        const category = await this.CategoryRepository.findOne({
          where: {
            id: findTaskDto.category,
            inserted_by: adminData.id,
            deleted_at: IsNull(),
          },
        });
        if (!category) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_category_found'),
          );
        }

        conditions =
          conditions + ` AND t.category_id = ${findTaskDto.category}`;
      }
      if (findTaskDto.sub_category && findTaskDto.sub_category > 0) {
        const subCategory = await this.CategoryRepository.findOne({
          where: {
            id: findTaskDto.sub_category,
            inserted_by: adminData.id,
            parent_id: findTaskDto.category,
            deleted_at: IsNull(),
          },
        });
        if (!subCategory) {
          throw new BadRequestException(
            `${findTaskDto.sub_category}: ${await this.i18n.translate(
              'validation_task.no_sub_category_found',
            )}`,
          );
        }
        conditions =
          conditions + ` AND t.sub_category_id = (${findTaskDto.sub_category})`;
      }
      if (findTaskDto.budget_object) {
        const totalBudgetData = findTaskDto.budget_object.length;
        let budgetCondition = '';
        for (let i = 0; i < totalBudgetData; i++) {
          const budgetData = findTaskDto.budget_object[i];
          budgetCondition.length > 0
            ? (budgetCondition = budgetCondition + ' OR')
            : (budgetCondition = budgetCondition + '');
          budgetCondition =
            budgetCondition +
            ` (t.estimated_budget BETWEEN ${budgetData.start_value} AND ${
              budgetData.end_value === -1
                ? '(SELECT  MAX(t.estimated_budget))'
                : budgetData.end_value
            })`;
        }

        conditions = conditions + ` AND (${budgetCondition})`;
      }
      if (findTaskDto.nemid_authorization === 1) {
        conditions =
          conditions +
          ` AND t.nemid_authorized = ${findTaskDto.nemid_authorization}`;
      }
      if (findTaskDto.zip_code) {
        conditions = conditions + ` AND t.zipcode = ${findTaskDto.zip_code}`;
      }
      if (findTaskDto.title_search) {
        userJoin = ' LEFT JOIN users u on t.employer_id = u.id ';
        conditions =
          conditions +
          ` AND(t.title LIKE '%${findTaskDto.title_search}%' OR u.full_name LIKE '%${findTaskDto.title_search}%') `;
      }
      if (findTaskDto.task_with_no_bid === 1 && findTaskDto.placed_bids === 1) {
        havingConditions = ` HAVING (bid_count <= 1 AND (tb.specialist_id = ${user.id} OR tb.specialist_id IS NULL))`;
      } else {
        if (findTaskDto.task_with_no_bid === 1) {
          havingConditions = ` HAVING bid_count = 0`;
        }
        if (findTaskDto.placed_bids === 1) {
          havingConditions = ` HAVING (bid_count > 0 AND (tb.specialist_id = ${user.id} ))`;
        }
      }

      if (findTaskDto.task_urgent === 1) {
        urgentConditions = ` AND ((DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) IS NULL AND ((DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) <=2)) AND(DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) >=0)
        OR (((DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) <=2 AND (DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) >=0) )AND(DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) IS NULL))`;
      }

      const orderByCondition = 'task_id ASC';

      let sqlTaskQuery = `SELECT DISTINCT (t.id) as task_id, t.title as task_title, count(tb.id) as bid_count,
      DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) as start_diff, (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) as end_diff `;

      if (userData.latitude && userData.longitude && findTaskDto.radius) {
        sqlTaskQuery += ` , ( 6371 * acos( cos( radians(t.latitude) ) * cos( radians( ${findTaskDto.latitude} ) )
        * cos( radians(t.longitude) - radians( ${userData.longitude} )) + sin( radians(t.latitude) ) * sin(radians(${findTaskDto.latitude})) ) ) AS distance `;
      }
      sqlTaskQuery += `FROM tasks t LEFT JOIN task_bids tb on t.id = tb.task_id
      ${userJoin}
      WHERE tb.deleted_at IS NULL AND t.deleted_at IS NULL AND t.task_status =${TASK_STATUS.OPEN} ${conditions} AND t.employer_id != ${user.id} ${urgentConditions}
      AND ((t.visibility = 1) OR (t.visibility =0 AND JSON_CONTAINS(t.invited_users,'{"specialist_id":${user.id}}')) )
      GROUP BY (t.id), t.title, tb.specialist_id `;

      if (userData.latitude && userData.longitude && findTaskDto.radius) {
        sqlTaskQuery += `HAVING distance <= ${findTaskDto.radius} ORDER BY distance`;
      }
      sqlTaskQuery += `${havingConditions} LIMIT ${skip},${take}`;

      let totalSqlData = `SELECT DISTINCT (t.id) as task_id, t.title as task_title, count(tb.id) as bid_count,
      DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) as start_diff, (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) as end_diff `;

      if (userData.latitude && userData.longitude && findTaskDto.radius) {
        totalSqlData += `, ( 6371 * acos( cos( radians(t.latitude) ) * cos( radians( ${userData.latitude} ) )
        * cos( radians(t.longitude) - radians( ${userData.longitude} )) + sin( radians(t.latitude) ) * sin(radians(${userData.latitude})) ) ) AS distance `;
      }
      totalSqlData += `FROM tasks t LEFT JOIN task_bids tb on t.id = tb.task_id
      ${userJoin}
      WHERE tb.deleted_at IS NULL AND t.deleted_at IS NULL AND t.task_status =${TASK_STATUS.OPEN} ${conditions} AND t.employer_id != ${user.id} ${urgentConditions}
      AND ((t.visibility = 1) OR (t.visibility =0 AND JSON_CONTAINS(t.invited_users,'{"specialist_id":${user.id}}')) )
      GROUP BY (t.id), t.title, tb.specialist_id `;

      if (userData.latitude && userData.longitude && findTaskDto.radius) {
        totalSqlData += `HAVING distance <= ${findTaskDto.radius} ORDER BY distance`;
      }
      totalSqlData += `${havingConditions}`;

      const entityManager = getManager();
      const allTasks = await entityManager.query(sqlTaskQuery);
      const allTasksLength = await entityManager.query(totalSqlData);

      const taskIds = map(values(allTasks), 'task_id');
      const totalData = map(values(allTasksLength), 'task_id').length;
      if (taskIds.length > 0) {
        const sqlQuery = `
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM tasks t1 LEFT JOIN task_media t2 ON (t1.id = t2.task_id AND t2.deleted_at IS NULL)
                LEFT JOIN task_bids t3 ON t1.id = t3.task_id
            LEFT JOIN users u on u.id = t1.employer_id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE  t1.deleted_at IS NULL AND t1.id IN (${toString(taskIds)})
            GROUP BY u.id, u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time , t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            UNION ALL
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM task_media t2 LEFT JOIN tasks t1 ON t2.task_id = t1.id
                LEFT JOIN task_bids t3 ON t2.task_id = t3.task_id
            LEFT JOIN users u on u.id = t1.employer_id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE t1.id IS NULL AND t2.deleted_at IS NULL
            GROUP BY u.id,u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            UNION ALL
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM task_bids t3 LEFT JOIN tasks t1 ON t1.id = t3.task_id
                LEFT JOIN task_media t2 ON t2.task_id = t3.task_id
            LEFT JOIN users u on t1.employer_id = u.id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE t1.id IS NULL AND t2.task_id IS NULL AND t2.deleted_at IS NULL
            GROUP BY u.id, u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            ORDER BY ${orderByCondition}, media_type ASC`;

        const resultResponse = await entityManager.query(sqlQuery);
        const resultValues = values(resultResponse);
        const total_unique_tasks = orderBy(
          uniqBy(resultValues, 'task_id'),
          ['task_id', 'media_type'],
          ['asc', 'asc'],
        );
        for (let i = 0; i < total_unique_tasks.length; i++) {
          let date: Date = null;
          if (
            total_unique_tasks[i].task_type === 0 ||
            total_unique_tasks[i].task_type === 2
          ) {
            date = total_unique_tasks[i].start_date_time;
          } else {
            date = total_unique_tasks[i].end_date_time;
          }
          if (findTaskDto.task_with_no_bid === 1) {
            remove(total_unique_tasks, (data) => {
              return +data.total_bid > 0;
            });
          }
          let parsedInvitedUsers = [];
          if (total_unique_tasks[i].invited_users) {
            parsedInvitedUsers = JSON.parse(
              total_unique_tasks[i].invited_users,
            );
          }
          const isUserInvited = find(parsedInvitedUsers, (data) => {
            return data.specialist_id === user.id;
          });
          total_unique_tasks[i].invited = isUserInvited ? true : false;
          total_unique_tasks[i].total_bid = +total_unique_tasks[i].total_bid;
          const moment_date = moment(new Date(date));
          const moment_current_date = moment(new Date());
          const hours_diff = moment_date.diff(moment_current_date, 'hours');
          total_unique_tasks[i].urgency =
            hours_diff > 0 && hours_diff <= 48 ? true : false;

          const placedBid = await this.TaskBidsRepository.findOne({
            where: {
              task_id: +total_unique_tasks[i].task_id,
              specialist_id: user.id,
              deleted_at: IsNull(),
            },
          });
          total_unique_tasks[i].placed_bid = placedBid ? true : false;
        }

        return ResponseMap(
          { tasks: total_unique_tasks, totalData: totalData },
          await this.i18n.translate('success.success'),
        );
      } else {
        return ResponseMap(
          { tasks: [] },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Bhargav Sakaria
   * @param FindTaskDto
   * @description Find all tasks as a Guest user (NO AUTHENTICATION NEEDED!)
   * @Created Feb 08, 2022
   */
  async guestFindTasks(findTaskDto: GuestFindTaskDto): GlobalResponseType {
    try {
      const take = findTaskDto.limit;
      const page = findTaskDto.page;
      const skip = (page - 1) * take;
      let conditions = '';
      let havingConditions = '';
      let urgentConditions = '';
      let userJoin = '';

      const adminData = await this.UsersRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      if (
        findTaskDto.task_for_business === 1 &&
        findTaskDto.task_for_freelance === 1
      ) {
        conditions = conditions + ' AND t.specialist_preference = 2';
      } else {
        if (findTaskDto.task_for_business === 1) {
          conditions =
            conditions +
            ' AND (t.specialist_preference = 0 OR t.specialist_preference = 2) ';
        }
        if (findTaskDto.task_for_freelance === 1) {
          conditions =
            conditions +
            ' AND (t.specialist_preference = 1 OR t.specialist_preference = 2)';
        }
      }

      if (findTaskDto.remote_work === 1) {
        conditions =
          conditions + ` AND t.remote_job = ${findTaskDto.remote_work}`;
      }

      if (findTaskDto.category) {
        const category = await this.CategoryRepository.findOne({
          where: {
            id: findTaskDto.category,
            inserted_by: adminData.id,
            deleted_at: IsNull(),
          },
        });
        if (!category) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_category_found'),
          );
        }

        conditions =
          conditions + ` AND t.category_id = ${findTaskDto.category}`;
      }

      if (findTaskDto.sub_category && findTaskDto.sub_category > 0) {
        const subCategory = await this.CategoryRepository.findOne({
          where: {
            id: findTaskDto.sub_category,
            inserted_by: adminData.id,
            parent_id: findTaskDto.category,
            deleted_at: IsNull(),
          },
        });
        if (!subCategory) {
          throw new BadRequestException(
            `${findTaskDto.sub_category}: ${await this.i18n.translate(
              'validation_task.no_sub_category_found',
            )}`,
          );
        }
        conditions =
          conditions + ` AND t.sub_category_id = (${findTaskDto.sub_category})`;
      }

      if (findTaskDto.budget_object) {
        const totalBudgetData = findTaskDto.budget_object.length;
        let budgetCondition = '';
        for (let i = 0; i < totalBudgetData; i++) {
          const budgetData = findTaskDto.budget_object[i];
          budgetCondition.length > 0
            ? (budgetCondition = budgetCondition + ' OR')
            : (budgetCondition = budgetCondition + '');
          budgetCondition =
            budgetCondition +
            ` (t.estimated_budget BETWEEN ${budgetData.start_value} AND ${
              budgetData.end_value === -1
                ? '(SELECT  MAX(t.estimated_budget))'
                : budgetData.end_value
            })`;
        }

        conditions = conditions + ` AND (${budgetCondition})`;
      }

      if (findTaskDto.nemid_authorization === 1) {
        conditions =
          conditions +
          ` AND t.nemid_authorized = ${findTaskDto.nemid_authorization}`;
      }

      if (findTaskDto.zip_code) {
        conditions = conditions + ` AND t.zipcode = ${findTaskDto.zip_code}`;
      }

      if (findTaskDto.title_search) {
        userJoin = ' LEFT JOIN users u on t.employer_id = u.id ';
        conditions =
          conditions +
          ` AND(t.title LIKE '%${findTaskDto.title_search}%' OR u.full_name LIKE '%${findTaskDto.title_search}%') `;
      }

      // condition: find tasks with less than or equal to 1 bids
      if (findTaskDto.task_with_no_bid === 1) {
        havingConditions = ` HAVING bid_count = 0`;
      }

      if (findTaskDto.task_urgent === 1) {
        urgentConditions = ` AND ((DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) IS NULL AND ((DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) <=2)) AND(DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) >=0)
        OR (((DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) <=2 AND (DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) >=0) )AND(DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) IS NULL))`;
      }

      const orderByCondition = 'task_id ASC';

      let sqlTaskQuery = `SELECT DISTINCT (t.id) as task_id, t.title as task_title, count(tb.id) as bid_count,
      DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) as start_diff, (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) as end_diff `;

      sqlTaskQuery += `FROM tasks t LEFT JOIN task_bids tb on t.id = tb.task_id
      ${userJoin}
      WHERE tb.deleted_at IS NULL AND t.deleted_at IS NULL AND t.task_status =${TASK_STATUS.OPEN} ${conditions} ${urgentConditions}
      AND ((t.visibility = 1) OR (t.visibility = 0 ) )
      GROUP BY (t.id), t.title, tb.specialist_id `;

      sqlTaskQuery += `${havingConditions} LIMIT ${skip},${take}`;

      //

      let totalSqlData = `SELECT DISTINCT (t.id) as task_id, t.title as task_title, count(tb.id) as bid_count,
      DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) as start_diff, (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) as end_diff `;

      totalSqlData += `FROM tasks t LEFT JOIN task_bids tb on t.id = tb.task_id
      ${userJoin}
      WHERE tb.deleted_at IS NULL AND t.deleted_at IS NULL AND t.task_status =${TASK_STATUS.OPEN} ${conditions} ${urgentConditions}
      AND ((t.visibility = 1) OR (t.visibility = 0) )
      GROUP BY (t.id), t.title, tb.specialist_id `;

      totalSqlData += `${havingConditions}`;

      const entityManager = getManager();
      const allTasks = await entityManager.query(sqlTaskQuery);
      const allTasksLength = await entityManager.query(totalSqlData);

      const taskIds = map(values(allTasks), 'task_id');
      const totalData = map(values(allTasksLength), 'task_id').length;

      if (taskIds.length > 0) {
        const sqlQuery = `
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM tasks t1 LEFT JOIN task_media t2 ON (t1.id = t2.task_id AND t2.deleted_at IS NULL)
                LEFT JOIN task_bids t3 ON t1.id = t3.task_id
            LEFT JOIN users u on u.id = t1.employer_id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE  t1.deleted_at IS NULL AND t1.id IN (${toString(taskIds)})
            GROUP BY u.id, u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time , t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            UNION ALL
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM task_media t2 LEFT JOIN tasks t1 ON t2.task_id = t1.id
                LEFT JOIN task_bids t3 ON t2.task_id = t3.task_id
            LEFT JOIN users u on u.id = t1.employer_id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE t1.id IS NULL AND t2.deleted_at IS NULL
            GROUP BY u.id,u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            UNION ALL
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM task_bids t3 LEFT JOIN tasks t1 ON t1.id = t3.task_id
                LEFT JOIN task_media t2 ON t2.task_id = t3.task_id
            LEFT JOIN users u on t1.employer_id = u.id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE t1.id IS NULL AND t2.task_id IS NULL AND t2.deleted_at IS NULL
            GROUP BY u.id, u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            ORDER BY ${orderByCondition}, media_type ASC`;

        const resultResponse = await entityManager.query(sqlQuery);
        const resultValues = values(resultResponse);
        const total_unique_tasks = orderBy(
          uniqBy(resultValues, 'task_id'),
          ['task_id', 'media_type'],
          ['asc', 'asc'],
        );

        for (let i = 0; i < total_unique_tasks.length; i++) {
          let date: Date = null;
          if (
            total_unique_tasks[i].task_type === 0 ||
            total_unique_tasks[i].task_type === 2
          ) {
            date = total_unique_tasks[i].start_date_time;
          } else {
            date = total_unique_tasks[i].end_date_time;
          }
          if (findTaskDto.task_with_no_bid === 1) {
            remove(total_unique_tasks, (data) => {
              return +data.total_bid > 0;
            });
          }
          let parsedInvitedUsers = [];
          if (total_unique_tasks[i].invited_users) {
            parsedInvitedUsers = JSON.parse(
              total_unique_tasks[i].invited_users,
            );
          }
          total_unique_tasks[i].total_bid = +total_unique_tasks[i].total_bid;
          const moment_date = moment(new Date(date));
          const moment_current_date = moment(new Date());
          const hours_diff = moment_date.diff(moment_current_date, 'hours');
          total_unique_tasks[i].urgency =
            hours_diff > 0 && hours_diff <= 48 ? true : false;
        }

        return ResponseMap(
          { tasks: total_unique_tasks, totalData: totalData },
          await this.i18n.translate('success.success'),
        );
      } else {
        return ResponseMap(
          { tasks: [] },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Author: Abhee Hudani
   * Description: Find invited tasks for specialist
   * Created At: Jun 25, 2021
   * Update At: Jun 25, 2021
   **/
  async invitedTasks(user: UserEntity): GlobalResponseType {
    try {
      const orderByCondition = 'task_id ASC';

      const sqlTaskQuery = `SELECT DISTINCT (t.id) as task_id, t.title as task_title FROM tasks t 
      WHERE t.deleted_at IS NULL AND t.task_status =${TASK_STATUS.OPEN} AND t.employer_id != ${user.id}
      AND JSON_CONTAINS(t.invited_users,'{"specialist_id":${user.id}}') 
      GROUP BY (t.id), t.title  `;

      const entityManager = getManager();
      const allTasks = await entityManager.query(sqlTaskQuery);

      const taskIds = map(values(allTasks), 'task_id');
      const totalData = taskIds.length;
      if (taskIds.length > 0) {
        const sqlQuery = `
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM tasks t1 LEFT JOIN task_media t2 ON (t1.id = t2.task_id AND t2.deleted_at IS NULL)
                LEFT JOIN task_bids t3 ON t1.id = t3.task_id
            LEFT JOIN users u on u.id = t1.employer_id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE  t1.deleted_at IS NULL AND t1.id IN (${toString(taskIds)})
            GROUP BY u.id, u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time , t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            UNION ALL
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM task_media t2 LEFT JOIN tasks t1 ON t2.task_id = t1.id
                LEFT JOIN task_bids t3 ON t2.task_id = t3.task_id
            LEFT JOIN users u on u.id = t1.employer_id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE t1.id IS NULL AND t2.deleted_at IS NULL
            GROUP BY u.id,u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            UNION ALL
            SELECT t1.id as task_id, t1.visibility, t1.title as task_title, u.id as user_employer_id, u.full_name as employer_name, t1.invited_users,  count(t3.id) as total_bid, t1.category_id, t1.sub_category_id, t1.zipcode,t1.estimated_budget ,t1.task_status, t1.date_and_time as task_type, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t2.media, t2.media_type, rt.status as reported_status
            FROM task_bids t3 LEFT JOIN tasks t1 ON t1.id = t3.task_id
                LEFT JOIN task_media t2 ON t2.task_id = t3.task_id
            LEFT JOIN users u on t1.employer_id = u.id
            LEFT JOIN reported_tasks rt on t1.id = rt.task_id
            WHERE t1.id IS NULL AND t2.task_id IS NULL AND t2.deleted_at IS NULL
            GROUP BY u.id, u.full_name, t1.invited_users, t1.id, t1.title, t1.category_id, t1.sub_category_id, t1.zipcode, t1.estimated_budget, t1.task_status, t1.date_and_time, t1.start_date_time, t1.end_date_time, t1.specialist_preference, t1.remote_job, t1.nemid_authorized, t1.specialist_id, t2.media, t2.media_type, rt.status
            ORDER BY ${orderByCondition}, media_type ASC`;

        const resultResponse = await entityManager.query(sqlQuery);
        const resultValues = values(resultResponse);
        const total_unique_tasks = orderBy(
          uniqBy(resultValues, 'task_id'),
          ['task_id', 'media_type'],
          ['asc', 'asc'],
        );
        for (let i = 0; i < total_unique_tasks.length; i++) {
          let date: Date = null;
          if (
            total_unique_tasks[i].task_type === 0 ||
            total_unique_tasks[i].task_type === 2
          ) {
            date = total_unique_tasks[i].start_date_time;
          } else {
            date = total_unique_tasks[i].end_date_time;
          }

          let parsedInvitedUsers = [];
          if (total_unique_tasks[i].invited_users) {
            parsedInvitedUsers = JSON.parse(
              total_unique_tasks[i].invited_users,
            );
          }
          const isUserInvited = find(parsedInvitedUsers, (data) => {
            return data.specialist_id === user.id;
          });
          total_unique_tasks[i].invited = isUserInvited ? true : false;
          total_unique_tasks[i].total_bid = +total_unique_tasks[i].total_bid;
          const moment_date = moment(new Date(date));
          const moment_current_date = moment(new Date());
          const hours_diff = moment_date.diff(moment_current_date, 'hours');
          total_unique_tasks[i].urgency =
            hours_diff > 0 && hours_diff <= 48 ? true : false;
        }

        return ResponseMap(
          { tasks: total_unique_tasks, totalData: totalData },
          await this.i18n.translate('success.success'),
        );
      } else {
        return ResponseMap(
          { tasks: [] },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /**
   * @author Abhee Hudani
   * @param AcceptRejectBidDto Task_id, Bid_id, Decision: Accept-Reject
   * @description  Accept a bid of specialist for employer
   * @Created May 11, 2021
   * @Updated May 19, 2021
   **/
  async employerBidAcceptReject(
    user: UserEntity,
    acceptRejectBidDto: AcceptRejectBidDto,
  ): GlobalResponseType {
    try {
      const task = await this.TaskRepository.findOne({
        where: {
          id: acceptRejectBidDto.task_id,
          employer_id: user.id,
          task_status: TASK_STATUS.OPEN,
          deleted_at: IsNull(),
        },
      });
      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_task.no_open_task_to_accept_reject',
          ),
        );
      }

      const userData = await this.usersService.findUserById(user.id);
      if (acceptRejectBidDto.bid_action === ACCEPT_REJECT.ACCEPT) {
        const bid = await this.TaskBidsRepository.findOne({
          id: acceptRejectBidDto.bid_id,
          task_id: task.id,
          bid_status: BID_STATUS.OPEN,
          deleted_at: IsNull(),
        });
        if (!bid) {
          throw new BadRequestException(
            await this.i18n.translate('validation_bid.no_open_bid_to_accept'),
          );
        }

        const userOutStandingAmount = +userData.total_outstanding;
        const originalAmountToPay = bid.bid_amount;
        let amountToPay = bid.bid_amount;
        let userPay0 = false;

        if (originalAmountToPay > userOutStandingAmount) {
          amountToPay = originalAmountToPay - userOutStandingAmount;
        } else {
          userPay0 = true;
          amountToPay = bid.bid_amount;
        }

        const charge_details = `${TASK_NOTIFICATION.the_task}: ${task.title} ${TASK_NOTIFICATION.payment_for_bid_id}: ${bid.id}`;
        const details = acceptRejectBidDto.charge_details
          ? acceptRejectBidDto.charge_details
          : charge_details;

        let chargeObj = {};
        let originalAmountChargeObj = {};

        let customerData = null;
        if (acceptRejectBidDto.from_default_card) {
          if (userData && !userData.stripe_customer_id) {
            throw new BadGatewayException(
              await this.i18n.translate('validation_stripe.no_stripe_id_found'),
            );
          }
          const customer = await Stripe.customers.retrieve(
            userData.stripe_customer_id,
          );

          customerData = customer;
          if (!customerData.default_source) {
            throw new BadGatewayException(
              await this.i18n.translate(
                'validation_stripe.no_default_card_found',
              ),
            );
          }
          originalAmountChargeObj = {
            amount: bid.bid_amount * 100,
            currency: STRIPE_CURRENCY.DKK,
            receipt_email: userData.email,
            description: details,
            customer: userData.stripe_customer_id,
            card: customerData.default_source,
          };
          chargeObj = {
            amount: amountToPay * 100,
            currency: STRIPE_CURRENCY.DKK,
            receipt_email: userData.email,
            description: details,
            customer: userData.stripe_customer_id,
            card: customerData.default_source,
          };
        } else if (
          !acceptRejectBidDto.from_default_card &&
          acceptRejectBidDto.from_saved_card
        ) {
          if (userData && !userData.stripe_customer_id) {
            throw new BadGatewayException(
              await this.i18n.translate('validation_stripe.no_stripe_id_found'),
            );
          }
          originalAmountChargeObj = {
            amount: bid.bid_amount * 100,
            currency: STRIPE_CURRENCY.DKK,
            receipt_email: userData.email,
            description: details,
            customer: userData.stripe_customer_id,
            card: acceptRejectBidDto.source_id,
          };
          chargeObj = {
            amount: amountToPay * 100,
            currency: STRIPE_CURRENCY.DKK,
            receipt_email: userData.email,
            description: details,
            customer: userData.stripe_customer_id,
            card: acceptRejectBidDto.source_id,
          };
        } else if (
          !acceptRejectBidDto.from_default_card &&
          !acceptRejectBidDto.from_saved_card
        ) {
          originalAmountChargeObj = {
            amount: bid.bid_amount * 100,
            currency: STRIPE_CURRENCY.DKK,
            receipt_email: userData.email,
            description: details,
            source: acceptRejectBidDto.source_id,
          };
          chargeObj = {
            amount: amountToPay * 100,
            currency: STRIPE_CURRENCY.DKK,
            receipt_email: userData.email,
            description: details,
            source: acceptRejectBidDto.source_id,
          };
        }
        try {
          const transactionHistory = new TransactionsEntity();
          let charge = null;

          // Marketplace Admin Data
          const adminData = await this.UsersRepository.findOne({
            where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
          });

          if (userPay0) {
            userData.total_outstanding =
              userOutStandingAmount - originalAmountToPay;
            await userData.save();

            transactionHistory.task_id = task.id;
            transactionHistory.sender = task.employer_id;
            transactionHistory.recipient = adminData.id;
            transactionHistory.transaction_id =
              VALIDATION_PAYMENT_MSG.payment_from_outstanding;
            transactionHistory.amount = amountToPay;
            transactionHistory.status = CHARGE_STATUS.succeeded;
            transactionHistory.type = TRANSACTION_TYPE.TASK_PAYMENT;
            transactionHistory.balance_transaction_id =
              VALIDATION_PAYMENT_MSG.payment_from_outstanding;
            transactionHistory.description = details;
            await transactionHistory.save();

            // Save History
            const newOutstandingData = new OutstandingTransactionsEntity();
            newOutstandingData.user_id = user.id;
            newOutstandingData.task_id = task.id;
            const taskID = `${task.id}`.padStart(3, '0');
            newOutstandingData.payment_id = `TP${taskID}${random3Digit()}`;
            newOutstandingData.description = transactionHistory.description;
            newOutstandingData.amount = transactionHistory.amount;
            newOutstandingData.status = transactionHistory.status;
            newOutstandingData.type = TRANSACTION_TYPE.TASK_PAYMENT;
            newOutstandingData.payment_type = PAYMENT_TYPE.NEUTRAL;
            await newOutstandingData.save();
          } else {
            if (amountToPay >= STRIPE_MINIMUM_CHARGE.AMOUNT) {
              charge = await Stripe.charges.create(chargeObj);
            } else {
              // Original Bid amount transaction
              charge = await Stripe.charges.create(originalAmountChargeObj);
            }

            transactionHistory.task_id = task.id;
            transactionHistory.sender = task.employer_id;
            transactionHistory.recipient = adminData.id;
            transactionHistory.transaction_id = charge.id;
            transactionHistory.amount = charge.amount;
            transactionHistory.status = CHARGE_STATUS[`${charge.status}`];
            transactionHistory.type = TRANSACTION_TYPE.TASK_PAYMENT;
            transactionHistory.balance_transaction_id = charge.balance_transaction
              ? charge.balance_transaction.toString()
              : null;
            transactionHistory.receipt_number = charge.receipt_number;
            transactionHistory.receipt_url = charge.receipt_url;
            transactionHistory.description = details;
            await transactionHistory.save();

            const newOutstandingData = new OutstandingTransactionsEntity();
            newOutstandingData.user_id = user.id;
            newOutstandingData.task_id = task.id;
            const taskID = `${task.id}`.padStart(3, '0');
            newOutstandingData.payment_id = `TP${taskID}${random3Digit()}`;
            newOutstandingData.description = transactionHistory.description;
            newOutstandingData.amount = charge.amount / 100;
            newOutstandingData.transaction_id =
              transactionHistory.transaction_id;
            newOutstandingData.status = transactionHistory.status;
            newOutstandingData.balance_transaction_id =
              transactionHistory.balance_transaction_id;
            newOutstandingData.receipt_number =
              transactionHistory.receipt_number;
            newOutstandingData.receipt_url = transactionHistory.receipt_url;
            newOutstandingData.type = TRANSACTION_TYPE.TASK_PAYMENT;
            newOutstandingData.payment_type = PAYMENT_TYPE.NEUTRAL;
            await newOutstandingData.save();

            if (
              originalAmountToPay > userOutStandingAmount &&
              userOutStandingAmount > 0
            ) {
              if (transactionHistory.status === CHARGE_STATUS.succeeded) {
                userData.total_outstanding = 0;
                await userData.save();
              }

              const newOutstandingData = new OutstandingTransactionsEntity();
              newOutstandingData.user_id = user.id;
              newOutstandingData.task_id = task.id;
              const taskID = `${task.id}`.padStart(3, '0');
              newOutstandingData.payment_id = `TP${taskID}${random3Digit()}`;
              newOutstandingData.description = `${TASK_NOTIFICATION.the_task}: ${task.title} ${VALIDATION_PAYMENT_MSG.payment_from_outstanding}`;
              newOutstandingData.amount = userOutStandingAmount;
              newOutstandingData.status = transactionHistory.status;
              newOutstandingData.type = TRANSACTION_TYPE.TASK_PAYMENT;
              newOutstandingData.payment_type = PAYMENT_TYPE.NEUTRAL;
              await newOutstandingData.save();
            }
          }

          if (
            transactionHistory.status === CHARGE_STATUS.succeeded ||
            userPay0
          ) {
            await this.TaskRepository.update(
              {
                id: task.id,
                employer_id: task.employer_id,
                deleted_at: IsNull(),
              },
              {
                task_status: TASK_STATUS.ACTIVE,
                specialist_id: bid.specialist_id,
              },
            );
            await this.TaskBidsRepository.update(
              {
                bid_status: BID_STATUS.OPEN,
                task_id: task.id,
                id: acceptRejectBidDto.bid_id,
              },
              { bid_status: BID_STATUS.ACTIVE },
            );
            // #TODO Send Mail Saying SUCCESS -> Employer for payment ?

            const specialistData = await this.usersService.findUserById(
              bid.specialist_id,
            );

            const notification_route_employer = {
              type: TASK_STATUS.ACTIVE,
              user_type: NOTIFICATION_USER.EMPLOYER,
              id: task.id,
            };

            const notification_route_specialist = {
              type: TASK_STATUS.ACTIVE,
              user_type: NOTIFICATION_USER.SPECIALIST,
              id: task.id,
            };

            const notificationEmployerText = await this.i18n.translate(
              'notification.task_payment_success',
              {
                lang: LANGUAGE.EN,
                args: { task_title: task.title },
              },
            );
            const notificationEmployerText_DA = await this.i18n.translate(
              'notification.task_payment_success',
              {
                lang: LANGUAGE.DE,
                args: { task_title: task.title },
              },
            );
            const notificationEmployer = new NotificationsEntity();
            notificationEmployer.recipient_id = userData.id;
            notificationEmployer.routes = JSON.stringify(
              notification_route_employer,
            );
            notificationEmployer.read_flag = NOTIFICATION_STATUS.UNREAD;
            notificationEmployer.notification_text = notificationEmployerText;
            notificationEmployer.notification_text_da = notificationEmployerText_DA;
            await notificationEmployer.save();

            const notificationText = await this.i18n.translate(
              'notification.task_bid_accepted_by_employer',
              {
                lang: LANGUAGE.EN,
                args: { user_name: userData.full_name, task_title: task.title },
              },
            );
            const notificationText_DA = await this.i18n.translate(
              'notification.task_bid_accepted_by_employer',
              {
                lang: LANGUAGE.DE,
                args: { user_name: userData.full_name, task_title: task.title },
              },
            );
            const notification = new NotificationsEntity();
            notification.recipient_id = bid.specialist_id;
            notification.routes = JSON.stringify(notification_route_specialist);
            notification.read_flag = NOTIFICATION_STATUS.UNREAD;
            notification.notification_text = notificationText;
            notification.notification_text_da = notificationText_DA;
            await notification.save();

            await this.mailerService
              .sendMail({
                to: specialistData.email,
                from: process.env.SENDGRID_USER_EMAIL,
                subject: await this.i18n.translate(
                  'email_subject.task_bid_accepted',
                ),
                template: EMAIL_TEMPLATE.task_bid_accepted,
                context: {
                  web_url: MARKETPLACE_WEB,
                  image_domain: EMAIL_IMAGE_DOMAIN,
                  image_path: EMAIL_IMAGE_PATH.images,
                  task_title: task.title,
                  task_id: task.id,
                },
              })
              .catch((err) => {
                console.log('Task Bid Accepted Mailer Error', err);
              });

            await this.TaskBidsRepository.update(
              { bid_status: BID_STATUS.OPEN, task_id: task.id },
              { bid_status: BID_STATUS.CLOSED },
            );
            const bidCondition: Array<number> = [
              BID_STATUS.OPEN,
              BID_STATUS.CLOSED,
              BID_STATUS.REJECTED,
            ];

            const sqlQuery = `
            SELECT email, users.id as user_id
            FROM
                users
            LEFT OUTER JOIN
                task_bids tb ON users.id = tb.specialist_id
            WHERE task_id =${task.id} AND tb.bid_status IN (${toString(
              bidCondition,
            )}) AND tb.deleted_at IS NULL AND users.deleted_at IS NULL`;
            const entityManager = getManager();
            const resultResponse = await entityManager.query(sqlQuery);
            const allEmails = values(resultResponse);
            for (let i = 0; i < allEmails.length; i++) {
              const notification_route_specialist = {
                type: TASK_STATUS.ACTIVE,
                user_type: NOTIFICATION_USER.SPECIALIST,
                id: task.id,
              };
              const notificationText = await this.i18n.translate(
                'notification.task_rewarded_to_other_specialist',
                {
                  lang: LANGUAGE.EN,
                  args: {
                    user_name: userData.full_name,
                    task_title: task.title,
                  },
                },
              );
              const notificationText_DA = await this.i18n.translate(
                'notification.task_rewarded_to_other_specialist',
                {
                  lang: LANGUAGE.DE,
                  args: {
                    user_name: userData.full_name,
                    task_title: task.title,
                  },
                },
              );
              const notification = new NotificationsEntity();
              notification.recipient_id = allEmails[i].user_id;
              notification.routes = JSON.stringify(
                notification_route_specialist,
              );
              notification.read_flag = NOTIFICATION_STATUS.UNREAD;
              notification.notification_text = notificationText;
              notification.notification_text_da = notificationText_DA;
              await notification.save();

              await this.mailerService
                .sendMail({
                  to: allEmails[i].email,
                  from: process.env.SENDGRID_USER_EMAIL,
                  subject: await this.i18n.translate(
                    'email_subject.task_bid_other_accepted',
                  ),
                  template: EMAIL_TEMPLATE.task_bid_other_accepted,
                  context: {
                    web_url: MARKETPLACE_WEB,
                    image_domain: EMAIL_IMAGE_DOMAIN,
                    image_path: EMAIL_IMAGE_PATH.images,
                    task_title: task.title,
                  },
                })
                .catch((err) => {
                  console.log('Task Bid Mailer Error', err);
                });
            }

            return ResponseMap(
              { bid: bid, bid_status: ACCEPT_REJECT.ACCEPT },
              await this.i18n.translate(
                'success.payment_success_assigned_specialist',
              ),
              true,
            );
          } else {
            return ResponseMap({
              payment: transactionHistory.status,
              task_id: task.id,
              bid_id: bid.id,
            });
          }
        } catch (err) {
          throw new HttpException(
            err,
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      } else {
        // Send Mail to others whose req is not accepted except Rejected
        const bid = await this.TaskBidsRepository.findOne({
          id: acceptRejectBidDto.bid_id,
          task_id: task.id,
          bid_status: BID_STATUS.OPEN,
          deleted_at: IsNull(),
        });
        if (!bid) {
          throw new BadRequestException(
            await this.i18n.translate('validation_bid.no_open_bid_to_reject'),
          );
        }
        bid.bid_status = BID_STATUS.REJECTED;
        await bid.save();

        return ResponseMap(
          { bid: bid, bid_status: ACCEPT_REJECT.REJECT },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param GetTaskBidDto Task_id
   * @description  Get All Bids Details for given task id for employer and admin
   * @Created May 11, 2021
   * @Updated Jun 2, 2021
   **/
  async employerBidsList(
    user: UserEntity,
    getTaskBidDto: GetTaskBidDto,
  ): GlobalResponseType {
    try {
      const take = getTaskBidDto.limit;
      const page = getTaskBidDto.page;
      const skip = (page - 1) * take;
      let task: TasksEntity = null;

      if (user.user_role === USER_ROLE.USER) {
        task = await this.TaskRepository.findOne({
          where: {
            id: getTaskBidDto.task_id,
            employer_id: user.id,
            deleted_at: IsNull(),
          },
        });
      } else if (user.user_role === USER_ROLE.ADMIN) {
        task = await this.TaskRepository.findOne({
          where: {
            id: getTaskBidDto.task_id,
            deleted_at: IsNull(),
          },
        });
      }
      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_task'),
        );
      }
      const all_bids = [];
      let active_bid = {};
      const allBids = await this.TaskBidsRepository.find({
        where: {
          task_id: task.id,
          deleted_at: IsNull(),
        },
        take: take,
        skip: skip,
      });
      const taskCondition = [TASK_STATUS.CANCELLED, TASK_STATUS.COMPLETED];
      for (let i = 0; i < allBids.length; i++) {
        const sqlQuery = `
        SELECT u.id as user_id, t.task_status, u.full_name, u.profile_photo, t.deleted_at as task_deleted_at, tr.deleted_at as tr_deleted_at ,tr.reviewed_by, tr.rating, tr.reviewer_id FROM users u
        LEFT JOIN tasks t ON u.id = t.specialist_id
        LEFT JOIN task_reviews tr ON t.id = tr.task_id
        WHERE u.id =${allBids[i].specialist_id} AND u.deleted_at IS NULL`;

        const entityManager = getManager();
        const resultResponse = await entityManager.query(sqlQuery);
        const allRatings = values(resultResponse);

        remove(allRatings, (data) => {
          return (
            +data.reviewed_by === 1 ||
            data.task_deleted_at !== null ||
            data.tr_deleted_at !== null ||
            !includes(taskCondition, +data.task_status)
          );
        });
        const total_rating = [];
        filter(allRatings, function ratingFilter(data) {
          return data.rating ? total_rating.push(data.rating) : true;
        });

        let room_id = null;
        if (resultResponse[0].user_id) {
          const sqlQuery = `
          SELECT DISTINCT (cr.id) as room_id, COUNT(cr.id) as room_count from chat_rooms cr
          INNER JOIN room_participants rp on cr.id = rp.room_id
          WHERE cr.task_id =${task.id} AND rp.user_id IN (${task.employer_id},${resultResponse[0].user_id}) AND rp.deleted_at IS NULL AND cr.deleted_at IS NULL
          GROUP BY (cr.id)
          HAVING COUNT(cr.id) >=2`;
          const entityManager = getManager();
          const resultRoomResponse = await entityManager.query(sqlQuery);
          const roomValues = values(resultRoomResponse);
          const room_value = uniqBy(roomValues, 'room_id')[0];
          room_id = room_value ? room_value.room_id : null;
        }

        if (allBids[i].bid_status === BID_STATUS.ACTIVE) {
          active_bid = {
            bid_id: allBids[i].id,
            user_id: resultResponse[0].user_id,
            user_photo: resultResponse[0].profile_photo,
            user_name: resultResponse[0].full_name,
            bid: +allBids[i].bid_amount,
            bid_message: allBids[i].bid_message,
            bid_status: allBids[i].bid_status,
            average_rating: mean(total_rating)
              ? +mean(total_rating).toFixed(2)
              : 0,
            total_rating: total_rating[0] === null ? 0 : total_rating.length,
            room_id: room_id,
          };
        }
        const data = {
          bid_id: allBids[i].id,
          user_id: resultResponse[0].user_id,
          user_photo: resultResponse[0].profile_photo,
          user_name: resultResponse[0].full_name,
          bid: +allBids[i].bid_amount,
          bid_message: allBids[i].bid_message,
          active: allBids[i].bid_status === BID_STATUS.ACTIVE ? true : false,
          bid_status: allBids[i].bid_status,
          average_rating: mean(total_rating)
            ? +mean(total_rating).toFixed(2)
            : 0,
          total_rating: total_rating[0] === null ? 0 : total_rating.length,
          room_id: room_id,
        };
        all_bids.push(data);
      }
      return ResponseMap(
        {
          task: task,
          allBids: all_bids,
          activeBid: active_bid,
          totalData: allBids.length,
        },
        await this.i18n.translate('success.success'),
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param CheckoutTaskDto Task_id & Bid_id
   * @description  Checkout Screen details
   * @Created Jun 25, 2021
   * @Updated Jun 25, 2021
   **/
  async checkoutDetails(
    user: UserEntity,
    CheckoutTaskDto: CheckoutTaskDto,
  ): GlobalResponseType {
    try {
      const amountData = await this.getTaskCheckoutDetails(
        CheckoutTaskDto.task_id,
        CheckoutTaskDto.bid_id,
        user.id,
      );
      return ResponseMap(
        {
          amountData: amountData.amountDetails,
          taskData: amountData.taskDetails,
          specialistData: amountData.specialistDetails,
          bidData: amountData.bidDetails,
        },
        await this.i18n.translate('success.success'),
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Calculate total amount to be paid by user
  async getTaskCheckoutDetails(
    task_id: number,
    bid_id: number,
    user_id: number,
  ) {
    const userData = await this.UsersRepository.findOne({
      where: { id: user_id, deleted_at: IsNull() },
    });

    const task = await this.TaskRepository.findOne({
      where: {
        id: task_id,
        task_status: TASK_STATUS.OPEN,
        deleted_at: IsNull(),
      },
    });
    if (!task) {
      throw new BadRequestException(
        await this.i18n.translate('validation_task.no_task'),
      );
    }

    const bidDetails = await this.TaskBidsRepository.findOne({
      where: {
        id: bid_id,
        task_id: task_id,
        bid_status: BID_STATUS.OPEN,
        deleted_at: IsNull(),
      },
    });
    if (!bidDetails) {
      throw new BadRequestException(
        await this.i18n.translate('validation_bid.bid_no_longer_open'),
      );
    }

    const specialistDetails = await this.UsersRepository.findOne({
      where: { id: bidDetails.specialist_id, deleted_at: IsNull() },
    });

    const outstandingAmount = +userData.total_outstanding;
    const originalAmountToPay = bidDetails.bid_amount;
    let newAmountToPay = originalAmountToPay;

    if (bidDetails.bid_amount > outstandingAmount) {
      newAmountToPay = bidDetails.bid_amount - outstandingAmount;
    } else {
      newAmountToPay = 0;
    }

    return {
      amountDetails: {
        outstandingAmount: outstandingAmount,
        originalAmount: originalAmountToPay,
        amountToPay: newAmountToPay.toFixed(2),
      },
      taskDetails: task,
      bidDetails: bidDetails,
      specialistDetails: specialistDetails,
    };
  }

  /**
   * @author Abhee Hudani
   * @param createTaskBidsDTO Task_id, Bid_amount , Bid_message, Bid_id
   * @description Create or Update bid for existing Task for specialist
   * @Created May 11, 2021
   * @Updated Feb 22, 2021
   **/
  async createUpdateTaskBid(
    user: UserEntity,
    createTaskBidsDTO: TaskBidsDTO,
  ): GlobalResponseType {
    try {
      const task = await this.TaskRepository.findOne({
        where: {
          id: createTaskBidsDTO.task_id,
          task_status: TASK_STATUS.OPEN,
          deleted_at: IsNull(),
        },
      });
      const userData = await this.usersService.findUserById(user.id);
      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_task.no_open_task_to_create_update_bid',
          ),
        );
      }
      if (task.employer_id === user.id) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_bid_on_own_task'),
        );
      }

      // Removed NemID check when user bids for a task and the user is not Nemid verified!!!
      /* if (task.nemid_authorized === 1 && userData.nemid_verified !== 1) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_task.task_nem_id_required_no_bid',
          ),
        );
      } */

      // Removed only Business and only Freelancer allowed conditions - Anyone can bid
      /* if (
        userData.work_as === UserWorkAs.BUSINESS &&
        task.specialist_preference === 1
      ) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.task_requires_freelancer'),
        );
      }

      if (
        userData.work_as === UserWorkAs.FREELANCE &&
        task.specialist_preference === 0
      ) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.task_requires_business'),
        );
      } */

      const cancellationHistory = await this.TaskCancellationHistoryRepository.findOne(
        {
          where: {
            task_id: task.id,
            cancelled_by: user.id,
            cancelled_by_type: TASK_CANCELLATION_BY.SPECIALIST,
            deleted_at: IsNull(),
          },
        },
      );
      if (task.cancelled_by === user.id || cancellationHistory) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_bid.bid_no_longer_created_cancelled',
          ),
        );
      }
      const existingTaskBid = await this.TaskBidsRepository.findOne({
        where: {
          task_id: task.id,
          specialist_id: user.id,
          deleted_at: IsNull(),
        },
      });

      if (existingTaskBid && existingTaskBid.bid_status === BID_STATUS.OPEN) {
        existingTaskBid.bid_amount = createTaskBidsDTO.bid_amount;
        existingTaskBid.bid_message = createTaskBidsDTO.bid_message;
        await existingTaskBid.save();

        const notification_route_employer = {
          type: TASK_STATUS.OPEN,
          user_type: NOTIFICATION_USER.EMPLOYER,
          id: task.id,
        };

        const notificationText = await this.i18n.translate(
          'notification.task_bid_updated_specialist',
          {
            lang: LANGUAGE.EN,
            args: {
              user_name: userData.full_name,
              bid_amount: existingTaskBid.bid_amount,
              task_title: task.title,
            },
          },
        );
        const notificationText_DA = await this.i18n.translate(
          'notification.task_bid_updated_specialist',
          {
            lang: LANGUAGE.DE,
            args: {
              user_name: userData.full_name,
              bid_amount: existingTaskBid.bid_amount,
              task_title: task.title,
            },
          },
        );
        const notification = new NotificationsEntity();
        notification.recipient_id = task.employer_id;
        notification.routes = JSON.stringify(notification_route_employer);
        notification.read_flag = NOTIFICATION_STATUS.UNREAD;
        notification.notification_text = notificationText;
        notification.notification_text_da = notificationText_DA;
        await notification.save();

        return ResponseMap(
          { bid: existingTaskBid, bid_action: CUSTOM_RESPONSE_STATUS.UPDATE },
          await this.i18n.translate('success.success'),
        );
      } else if (
        !existingTaskBid ||
        existingTaskBid.bid_status === BID_STATUS.CLOSED
      ) {
        const taskBid = new TaskBidsEntity();
        taskBid.task_id = createTaskBidsDTO.task_id;
        taskBid.specialist_id = user.id;
        taskBid.bid_amount = createTaskBidsDTO.bid_amount;
        taskBid.bid_message = createTaskBidsDTO.bid_message;
        taskBid.bid_status = BID_STATUS.OPEN;
        await taskBid.save();

        const notification_route_employer = {
          type: TASK_STATUS.OPEN,
          user_type: NOTIFICATION_USER.EMPLOYER,
          id: task.id,
        };

        const notificationText = await this.i18n.translate(
          'notification.task_bid_placed_specialist',
          {
            lang: LANGUAGE.EN,

            args: {
              user_name: userData.full_name,
              bid_amount: taskBid.bid_amount,
              task_title: task.title,
            },
          },
        );
        const notificationText_DA = await this.i18n.translate(
          'notification.task_bid_placed_specialist',
          {
            lang: LANGUAGE.DE,

            args: {
              user_name: userData.full_name,
              bid_amount: taskBid.bid_amount,
              task_title: task.title,
            },
          },
        );
        const notification = new NotificationsEntity();
        notification.recipient_id = task.employer_id;
        notification.routes = JSON.stringify(notification_route_employer);
        notification.read_flag = NOTIFICATION_STATUS.UNREAD;
        notification.notification_text = notificationText;
        notification.notification_text_da = notificationText_DA;
        await notification.save();

        const employerData = await this.usersService.findUserById(
          task.employer_id,
        );
        const taskCreateDate = moment(task.created_at);
        const currentDate = moment();
        const durationDiff = moment
          .duration(currentDate.diff(taskCreateDate))
          .asMinutes();

        if (durationDiff <= 60) {
          await this.mailerService
            .sendMail({
              to: employerData.email,
              from: process.env.SENDGRID_USER_EMAIL,
              subject: await this.i18n.translate(
                'email_subject.task_bid_placed',
              ),
              template: EMAIL_TEMPLATE.task_bid_placed,
              context: {
                web_url: MARKETPLACE_WEB,
                image_domain: EMAIL_IMAGE_DOMAIN,
                image_path: EMAIL_IMAGE_PATH.images,
                task_title: task.title,
                specialist_name: user.full_name,
              },
            })
            .catch((err) => {
              console.log('Task Bid Placed Mailer Error', err);
            });
        }

        return ResponseMap(
          { bid: taskBid, bid_action: CUSTOM_RESPONSE_STATUS.CREATE },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Abhee Hudani
   * @param viewReportedTaskDto Task_id, User_type
   * @description View Reported Task Details by user
   * @Created May 11, 2021
   * @Updated May 19, 2021
   **/
  async viewReportedTask(
    user: UserEntity,
    viewReportedTaskDto: ViewReportedTaskDto,
  ): GlobalResponseType {
    try {
      let task: TasksEntity = null;
      if (viewReportedTaskDto.user_type === USER_TYPE.EMPLOYER) {
        task = await this.TaskRepository.findOne({
          where: {
            id: viewReportedTaskDto.task_id,
            employer_id: user.id,
            deleted_at: IsNull(),
          },
        });
        if (!task) {
          throw new BadRequestException(
            await this.i18n.translate(
              'validation_task.no_open_active_task_to_cancel',
            ),
          );
        }
        const reportedTask = await this.ReportedTasksRepository.findOne({
          where: {
            task_id: task.id,
            reported_by: REPORTED_BY.EMPLOYER,
            deleted_at: IsNull(),
          },
        });
        if (!reportedTask) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_reported_task'),
          );
        }
        const reportedTaskDetails = {
          task_id: reportedTask.task_id,
          status: reportedTask.status,
          report_reason: reportedTask.report_reason,
          proofs: JSON.parse(reportedTask.proofs),
        };
        return ResponseMap(
          { task: reportedTaskDetails },
          await this.i18n.translate('success.success'),
        );
      } else {
        task = await this.TaskRepository.findOne({
          where: {
            id: viewReportedTaskDto.task_id,
            specialist_id: user.id,
            deleted_at: IsNull(),
          },
        });
        if (!task) {
          throw new BadRequestException(
            await this.i18n.translate(
              'validation_task.no_open_active_task_to_cancel',
            ),
          );
        }
        const reportedTask = await this.ReportedTasksRepository.findOne({
          where: {
            task_id: task.id,
            reported_by: REPORTED_BY.SPECIALIST,
            deleted_at: IsNull(),
          },
        });
        if (!reportedTask) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_reported_task'),
          );
        }
        const reportedTaskDetails = {
          task_id: reportedTask.task_id,
          status: reportedTask.status,
          report_reason: reportedTask.report_reason,
          proofs: JSON.parse(reportedTask.proofs),
        };
        return ResponseMap(
          { task: reportedTaskDetails },
          await this.i18n.translate('success.success'),
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
