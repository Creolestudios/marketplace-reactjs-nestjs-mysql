import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { assign, find, toString } from 'lodash';
import { getManager, IsNull, Repository } from 'typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { TaskFilterDto, ViewProofsDto } from 'src/dto/admin.dto';
import {
  ReportedTasksEntity,
  TaskBidsEntity,
  TaskDisgreementHistoryEntity,
  TaskMediaEntity,
  TasksEntity,
} from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ResponseMap } from 'src/utils/constant';
import {
  BID_STATUS,
  REPORTED_BY,
  REPORTED_TASK_STATUS,
  TASKS_ORDER_BY,
  TASK_CANCELLATION_BY,
  TASK_CANCELLATION_DISGREE_BY,
  TASK_STATUS,
  USER_ROLE,
} from 'src/utils/enums';
import { GlobalResponseType } from 'src/utils/types';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(TasksEntity)
    private TasksRepository: Repository<TasksEntity>,
    @InjectRepository(TaskBidsEntity)
    private TaskBidsRepository: Repository<TaskBidsEntity>,
    @InjectRepository(TaskMediaEntity)
    private TaskMediaRepository: Repository<TaskMediaEntity>,
    @InjectRepository(ReportedTasksEntity)
    private ReportedTasksRepository: Repository<ReportedTasksEntity>,
    @InjectRepository(TaskDisgreementHistoryEntity)
    private TaskDisgreementHistoryEntity: Repository<TaskDisgreementHistoryEntity>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  /**
   * @author Abhee Hudani
   * @description List All task according to filters
   * @params taskFilterDto to list the task according to filter
   * @Created Jun 2, 2021
   * @Updated Jun 2, 2021
   **/
  async tasksList(
    user: UserEntity,
    taskFilterDto: TaskFilterDto,
  ): GlobalResponseType {
    try {
      const take = taskFilterDto.limit;
      const page = taskFilterDto.page;
      const skip = (page - 1) * take;
      const taskStatusCondition: Array<number> = [];
      let taskConditions = '';
      let userCondition = '';
      let havingConditions = '';
      let urgentConditions = '';
      let order_by = '';
      let userJoin = ' LEFT JOIN users u on t.employer_id = u.id';
      let categoryJoin = ' LEFT JOIN categories c on t.category_id = c.id';

      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      taskFilterDto.open_task === 1
        ? taskStatusCondition.push(TASK_STATUS.OPEN)
        : 0;
      taskFilterDto.active_task === 1
        ? taskStatusCondition.push(TASK_STATUS.ACTIVE)
        : 0;
      taskFilterDto.completed_task === 1
        ? taskStatusCondition.push(TASK_STATUS.COMPLETED)
        : 0;
      taskFilterDto.cancelled_task === 1
        ? taskStatusCondition.push(TASK_STATUS.CANCELLED)
        : 0;

      if (taskFilterDto.order_by) {
        switch (taskFilterDto.order_by) {
          case TASKS_ORDER_BY.task_id:
            order_by = ' ORDER BY t.id';
            break;
          case TASKS_ORDER_BY.category:
            categoryJoin = ' LEFT JOIN categories c on t.category_id = c.id';
            order_by = ' ORDER BY c.name';
            break;
          case TASKS_ORDER_BY.sub_category:
            categoryJoin =
              ' LEFT JOIN categories c on t.sub_category_id = c.id';
            order_by = ' ORDER BY c.name';
            break;
          case TASKS_ORDER_BY.task_title:
            order_by = ' ORDER BY t.title';
            break;
          case TASKS_ORDER_BY.employer:
            userJoin = ' LEFT JOIN users u on t.employer_id = u.id';
            order_by = ' ORDER BY u.full_name';
            break;
          case TASKS_ORDER_BY.specialist:
            userJoin = ' LEFT JOIN users u on t.specialist_id = u.id';
            order_by = ' ORDER BY u.full_name';
            break;
          case TASKS_ORDER_BY.status:
            order_by = ' ORDER BY t.task_status';
            break;
          case TASKS_ORDER_BY.reporter:
            userJoin =
              ' LEFT JOIN users u on( t.employer_id = u.id AND tr.reported_by = 0) OR (t.specialist_id = u.id AND tr.reported_by = 1)';
            order_by = ' ORDER BY u.full_name';
            break;
          case TASKS_ORDER_BY.accused:
            userJoin =
              ' LEFT JOIN users u on( t.employer_id = u.id AND tr.reported_by = 1) OR (t.specialist_id = u.id AND tr.reported_by = 0)';
            order_by = ' ORDER BY u.full_name';
            break;
          case TASKS_ORDER_BY.date:
            order_by = ' ORDER BY t.created_at';
            break;
        }
      }

      if (
        taskFilterDto.created_by_business === 1 &&
        taskFilterDto.created_by_freelancer === 1
      ) {
        userCondition = userCondition + ' AND u.work_as IN (1,2)';
      } else {
        if (taskFilterDto.created_by_business === 1) {
          userCondition = userCondition + ' AND u.work_as = 1';
        }
        if (taskFilterDto.created_by_freelancer === 1) {
          userCondition = userCondition + ' AND u.work_as = 0';
        }
      }

      

      if (taskFilterDto.budget_object) {
        const totalBudgetData = taskFilterDto.budget_object.length;
        let budgetCondition = '';
        for (let i = 0; i < totalBudgetData; i++) {
          const budgetData = taskFilterDto.budget_object[i];
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
        taskConditions = taskConditions + ` AND (${budgetCondition})`;
      }

      if (taskFilterDto.search && taskFilterDto.search.length > 0) {
        taskConditions =
          taskConditions + ` AND t.title LIKE '%${taskFilterDto.search}%'`;
      }
      if (taskFilterDto.task_without_bid === 1) {
        havingConditions = ` HAVING (bid_count = 0)`;
      }

      if (taskFilterDto.urgent_task === 1) {
        urgentConditions = ` AND ((DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) IS NULL AND ((DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) <=2)) AND(DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) >=0)
        OR (((DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) <=2 AND (DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) >=0) )AND(DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) IS NULL))`;
      }

      if (taskFilterDto.start_date && taskFilterDto.end_date) {
        taskConditions =
          taskConditions +
          ` AND t.created_at BETWEEN '${taskFilterDto.start_date}' AND '${taskFilterDto.end_date}' `;
      }
      let allTasks: any = [];
      let allTasksCount: any = [];
      const order_by_type =
        order_by.length > 0 ? taskFilterDto.order_by_type : '';

      if (taskFilterDto.reported_task === 1) {
        const sqlTaskQuery = `
        SELECT DISTINCT (t.id) as task_id, t.title as task_title, u.work_as, u.full_name, tr.status as task_report_status, tr.reported_by, tr.created_at as report_created_at, c.name as cat_name,
        DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) as start_diff,  (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) as end_diff, t.category_id, t.sub_category_id, t.employer_id, t.specialist_id, t.title, t.estimated_budget, t.task_status, t.created_at FROM tasks t
        LEFT JOIN reported_tasks tr ON t.id = tr.task_id
          ${userJoin}
          ${categoryJoin}
        WHERE tr.status = ${REPORTED_TASK_STATUS.OPEN} AND tr.deleted_at IS NULL AND t.deleted_at IS NULL AND t.task_status = ${TASK_STATUS.REPORTED} ${taskConditions} ${userCondition}
        ${urgentConditions} ${havingConditions} ${order_by} ${order_by_type} LIMIT ${skip},${take}`;

        const sqlTaskCountQuery = `
        SELECT DISTINCT (t.id) as task_id, t.title as task_title, u.work_as, u.full_name, tr.status as task_report_status, tr.reported_by, tr.created_at as report_created_at, c.name as cat_name,
        DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) as start_diff,  (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) as end_diff, t.category_id, t.sub_category_id, t.employer_id, t.specialist_id, t.title, t.estimated_budget, t.task_status, t.created_at FROM tasks t
        LEFT JOIN reported_tasks tr ON t.id = tr.task_id
          ${userJoin}
          ${categoryJoin}
        WHERE tr.status = ${REPORTED_TASK_STATUS.OPEN} AND tr.deleted_at IS NULL AND t.deleted_at IS NULL AND t.task_status = ${TASK_STATUS.REPORTED} ${taskConditions} ${userCondition}
        ${urgentConditions} ${havingConditions} ${order_by} ${order_by_type}`;

        const entityManager = getManager();
        allTasks = await entityManager.query(sqlTaskQuery);
        allTasksCount = await entityManager.query(sqlTaskCountQuery);
      } else {
        const taskStatusConditionClause =
          taskStatusCondition.length > 0
            ? `OR t.task_status IN (${toString(taskStatusCondition)})`
            : '';
        if (taskFilterDto.resolved_task === 1) {
          taskConditions =
            taskConditions +
            ` AND (tr.status = ${REPORTED_TASK_STATUS.RESOLVED} ${taskStatusConditionClause})`;
        } else if (taskStatusCondition.length > 0) {
          taskConditions =
            taskConditions +
            ` AND t.task_status IN (${toString(taskStatusCondition)})`;
        }

        const sqlTaskQuery = `
        SELECT DISTINCT (t.id) as task_id, t.title as task_title, count(tb.id) as bid_count, t.created_at as task_created_at, u.work_as, u.full_name, c.name as cat_name,
        DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) as start_diff,  (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) as end_diff, t.category_id, t.sub_category_id, t.employer_id, t.specialist_id, t.title, t.estimated_budget, t.task_status, tr.status as task_report_status, tr.reported_by, tr.created_at as report_created_at
        FROM tasks t
        LEFT JOIN reported_tasks tr ON t.id = tr.task_id
        LEFT JOIN task_bids tb on t.id = tb.task_id
        ${userJoin}
        ${categoryJoin}
        WHERE tr.deleted_at IS NULL AND tb.deleted_at IS NULL AND t.deleted_at IS NULL ${userCondition}
        ${taskConditions} ${urgentConditions}
        GROUP BY (t.id), tr.id, t.title, u.work_as, u.full_name, DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()), (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP()))
        ${havingConditions} ${order_by} ${order_by_type} LIMIT ${skip},${take}`;

        const sqlTaskCountQuery = `
        SELECT DISTINCT (t.id) as task_id, t.title as task_title, count(tb.id) as bid_count, t.created_at as task_created_at,  u.work_as, u.full_name, c.name as cat_name,
        DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()) as start_diff,  (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP())) as end_diff, t.category_id, t.sub_category_id, t.employer_id, t.specialist_id, t.title, t.estimated_budget, t.task_status, tr.status as task_report_status, tr.reported_by, tr.created_at as report_created_at
        FROM tasks t
        LEFT JOIN reported_tasks tr ON t.id = tr.task_id
        LEFT JOIN task_bids tb on t.id = tb.task_id
        ${userJoin}
        ${categoryJoin}
        WHERE tr.deleted_at IS NULL AND tb.deleted_at IS NULL AND t.deleted_at IS NULL ${userCondition}
        ${taskConditions} ${urgentConditions}
        GROUP BY (t.id), tr.id, t.title, u.work_as, u.full_name, DATEDIFF(t.start_date_time,CURRENT_TIMESTAMP()), (DATEDIFF( t.end_date_time,CURRENT_TIMESTAMP()))
        ${havingConditions} ${order_by} ${order_by_type}`;

        const entityManager = getManager();
        allTasks = await entityManager.query(sqlTaskQuery);
        allTasksCount = await entityManager.query(sqlTaskCountQuery);
      }

      const responseData = [];

      for (let i = 0; i < allTasks.length; i++) {
        
        let userData: UserEntity[];
        if (+allTasks[i].specialist_id) {
          userData = await this.UserRepository.find({
            where: [
              { id: +allTasks[i].employer_id },
              { id: +allTasks[i].specialist_id },
            ],
          });
        } else {
          userData = await this.UserRepository.find({
            where: [{ id: +allTasks[i].employer_id }],
          });
        }
        const specialist = find(userData, (data) => {
          return +data.id === +allTasks[i].specialist_id;
        });

        const employer = find(userData, (data) => {
          return +data.id === +allTasks[i].employer_id;
        });

        const specialistData = {
          user_id: specialist ? specialist.id : null,
          name: specialist ? specialist.full_name : null,
        };
        const employerData = {
          user_id: employer.id,
          name: employer.full_name,
        };

        const reporter_name =
          +allTasks[i].task_report_status !== null &&
          +allTasks[i].reported_by === 0
            ? employerData.name
            : specialistData.name;

        const accused_name =
          +allTasks[i].task_report_status !== null &&
          +allTasks[i].reported_by === 0
            ? specialistData.name
            : employerData.name;

        const taskData = {
          id: +allTasks[i].task_id,
          index: i,
          task_title: allTasks[i].title,
          task_budget: +allTasks[i].estimated_budget,
          task_status: +allTasks[i].task_status,
          reported_task_status:
            +allTasks[i].task_report_status !== null
              ? +allTasks[i].task_report_status
              : null,
          reported_task_reporter:
            +allTasks[i].task_status === TASK_STATUS.REPORTED
              ? reporter_name
              : null,
          reported_task_accused:
            +allTasks[i].task_status === TASK_STATUS.REPORTED
              ? accused_name
              : null,
          date: +allTasks[i].task_report_status
            ? allTasks[i].report_created_at
            : allTasks[i].task_created_at,
        };
        const obj = {
          task: taskData,
          specialist: specialistData,
          employer: employerData,
        };

        responseData.push(obj);
      }
      return ResponseMap(
        {
          data: responseData,
          totalData: allTasksCount.length,
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
   * @description view Single Task Details
   * @params params to get task id
   * @Created Jun 2, 2021
   * @Updated Jun 2, 2021
   **/
  async viewTask(user: UserEntity, params: any): GlobalResponseType {
    try {
      const task_id = params.task_id;
      const task = await this.TasksRepository.findOne({
        where: {
          id: +task_id,
          deleted_at: IsNull(),
        },
      });
      if (!task) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_task'),
        );
      }
      let reportedTaskDetails = null;
      if (task.task_status === TASK_STATUS.REPORTED) {
        reportedTaskDetails = await this.ReportedTasksRepository.find({
          where: { task_id: task.id, deleted_at: IsNull() },
        });
      }
      const bid = await this.TaskBidsRepository.find({
        where: {
          task_id: task.id,
          deleted_at: IsNull(),
        },
      });
      const media = await this.TaskMediaRepository.find({
        where: {
          task_id: task.id,
          deleted_at: IsNull(),
        },
      });

      const userData = await this.UserRepository.find({
        where: [{ id: task.employer_id }, { id: task.specialist_id }],
      });

      const specialist = find(userData, (data) => {
        return +data.id === +task.specialist_id;
      });

      const employer = find(userData, (data) => {
        return +data.id === +task.employer_id;
      });

      const activeBid = find(bid, (data) => {
        return (
          +data.bid_status === BID_STATUS.ACTIVE && data.deleted_at === null
        );
      });
      const specialistData = {
        user_id: specialist ? specialist.id : null,
        name: specialist ? specialist.full_name : null,
      };
      const employerData = {
        user_id: employer.id,
        name: employer.full_name,
      };

      if (task.start_date_time && task.end_date_time) {
        const start_date = new Date(task.start_date_time);
        const end_date = new Date(task.end_date_time);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = end_date.getTime() - start_date.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);
        assign(task, { duration: diffInDays });
      } else {
        assign(task, { duration: null });
      }

      return ResponseMap(
        {
          task: task,
          taskMedia: media,
          totalBids: bid.length,
          activeBid: activeBid
            ? +activeBid.bid_amount
            : await this.i18n.translate('error.no_bid_made'),
          employer: employerData,
          specialist: specialistData,
          reportedTaskDetails: reportedTaskDetails,
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
   * @description view Proofs of reported Tasks
   * @Created Jun 2, 2021
   * @Updated Jun 2, 2021
   **/
  async viewProofs(
    user: UserEntity,
    viewProofsDto: ViewProofsDto,
  ): GlobalResponseType {
    try {
      const reportedTask = await this.TasksRepository.findOne({
        where: {
          id: viewProofsDto.task_id,
        },
      });
      if (!reportedTask) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_task'),
        );
      }

      const reportedTaskDetails = await this.ReportedTasksRepository.find({
        where: { task_id: reportedTask.id, deleted_at: IsNull() },
      });

      const employerData = find(reportedTaskDetails, (data) => {
        return +data.reported_by === 0;
      });

      const specialistData = find(reportedTaskDetails, (data) => {
        return +data.reported_by === 1;
      });

      let employerProof = null;
      let specialistProof = null;

      if (TASK_CANCELLATION_BY.EMPLOYER === reportedTask.cancelled_by_type) {
        employerProof = {
          reason: employerData ? employerData.report_reason : null,
          media: employerData ? JSON.parse(employerData.proofs) : [],
        };

        const specialistDisagreement = await this.TaskDisgreementHistoryEntity.findOne(
          {
            where: {
              task_id: reportedTask.id,
              disagree_by: reportedTask.specialist_id,
              disgree_by_type: TASK_CANCELLATION_DISGREE_BY.SPECIALIST,
            },
          },
        );
        if (specialistDisagreement) {
          specialistProof = {
            reason: specialistDisagreement.disgree_reason,
            media: JSON.parse(specialistDisagreement.disagree_proofs),
          };
        }
      } else if (
        TASK_CANCELLATION_BY.SPECIALIST === reportedTask.cancelled_by_type
      ) {
        specialistProof = {
          reason: specialistData ? specialistData.report_reason : null,
          media: specialistData ? JSON.parse(specialistData.proofs) : [],
        };

        const employerDisagreement = await this.TaskDisgreementHistoryEntity.findOne(
          {
            where: {
              task_id: reportedTask.id,
              disagree_by: reportedTask.employer_id,
              disgree_by_type: TASK_CANCELLATION_DISGREE_BY.EMPLOYER,
            },
          },
        );
        if (employerDisagreement) {
          employerProof = {
            reason: employerDisagreement.disgree_reason,
            media: JSON.parse(employerDisagreement.disagree_proofs),
          };
        }
      }
      if (REPORTED_BY.EMPLOYER === employerData.reported_by) {
        employerProof = {
          reason: employerData ? employerData.report_reason : null,
          media: employerData ? JSON.parse(employerData.proofs) : [],
        };
      } else if (REPORTED_BY.SPECIALIST === specialistData.reported_by) {
        specialistProof = {
          reason: specialistData ? specialistData.report_reason : null,
          media: specialistData ? JSON.parse(specialistData.proofs) : [],
        };
      }

      return ResponseMap(
        {
          taskData: reportedTask,
          employerProof,
          specialistProof,
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
}
