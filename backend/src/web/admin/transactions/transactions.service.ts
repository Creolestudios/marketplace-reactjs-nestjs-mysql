import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, IsNull, Repository } from 'typeorm';
import { toString, values } from 'lodash';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { UsersService } from '../../users/users.service';
import { DisputePaymentDto, TransactionFilterDto } from 'src/dto/admin.dto';
import {
  OutstandingTransactionsEntity,
  TransactionsEntity,
  UserEntity,
} from 'src/entities/user.entity';
import { ReportedTasksEntity, TasksEntity } from 'src/entities/task.entity';
import { ResponseMap } from 'src/utils/constant';
import { GlobalResponseType } from 'src/utils/types';
import {
  PAYMENT_TYPE,
  REPORTED_BY,
  REPORTED_TASK_STATUS,
  TASK_STATUS,
  TRANSACTION_ORDER_BY,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
  USER_ROLE,
} from 'src/utils/enums';
import { random3Digit } from 'src/utils/functions.utils';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(TransactionsEntity)
    private TransactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(TasksEntity)
    private TasksRepository: Repository<TasksEntity>,
    @InjectRepository(OutstandingTransactionsEntity)
    private OutstandingTransactionRepository: Repository<OutstandingTransactionsEntity>,
    @InjectRepository(ReportedTasksEntity)
    private ReportedTasksRepository: Repository<ReportedTasksEntity>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  /**
   * @author Abhee Hudani
   * @description List All transactions to filters
   * @params transactionFilterDto to list the transactions according to filter
   * @Created Jun 4, 2021
   * @Updated Jul 2, 2021
   **/
  async transactionsList(
    user: UserEntity,
    transactionFilterDto: TransactionFilterDto,
  ): GlobalResponseType {
    try {
      const take = transactionFilterDto.limit;
      const page = transactionFilterDto.page;
      const skip = (page - 1) * take;
      let condition = '';
      let order_by = '';

      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      if (transactionFilterDto.start_date && transactionFilterDto.end_date) {
        condition =
          condition +
          ` AND oth.created_at BETWEEN '${transactionFilterDto.start_date} 00:00:00' AND '${transactionFilterDto.end_date} 23:59:59' `;
      }
      if (
        transactionFilterDto.transaction_success === 1 &&
        transactionFilterDto.transaction_failure === 1
      ) {
        condition =
          condition +
          ` AND oth.status IN (${toString([
            TRANSACTION_STATUS.FAILURE,
            TRANSACTION_STATUS.SUCCESS,
          ])})`;
      } else {
        if (transactionFilterDto.transaction_success === 1) {
          condition =
            condition + ` AND oth.status = ${TRANSACTION_STATUS.SUCCESS}`;
        }
        if (transactionFilterDto.transaction_failure === 1) {
          condition =
            condition + ` AND oth.status = ${TRANSACTION_STATUS.FAILURE}`;
        }
      }

      if (
        transactionFilterDto.search &&
        transactionFilterDto.search.length > 0
      ) {
        condition =
          condition +
          ` AND u.full_name LIKE '%${transactionFilterDto.search}%'`;
      }

      if (transactionFilterDto.order_by) {
        switch (transactionFilterDto.order_by) {
          case TRANSACTION_ORDER_BY.transaction_id:
            order_by = ' ORDER BY oth.id';
            break;
          case TRANSACTION_ORDER_BY.task_id:
            order_by = ' ORDER BY oth.task_id';
            break;
          case TRANSACTION_ORDER_BY.sender:
            order_by = ' ORDER BY sender';
            break;
          case TRANSACTION_ORDER_BY.recipient:
            order_by = ' ORDER BY recipient';
            break;
          case TRANSACTION_ORDER_BY.amount:
            order_by = ' ORDER BY oth.amount';
            break;
          case TRANSACTION_ORDER_BY.date:
            order_by = ' ORDER BY oth.created_at';
            break;
          case TRANSACTION_ORDER_BY.outstanding_amount:
            order_by = ' ORDER BY outstanding_amount';
            break;
        }
      }

      const order_by_type =
        order_by.length > 0 ? transactionFilterDto.order_by_type : '';

      const sqlQuery = `
      SELECT DISTINCT(oth.id), oth.payment_id as transaction_id, oth.status as transaction_status,u.total_outstanding as outstanding_amount, oth.task_id, oth.user_id, IF(oth.type = ${TRANSACTION_TYPE.TASK_PAYMENT}, u.full_name,'${adminData.full_name}') as sender, IF(oth.type != ${TRANSACTION_TYPE.TASK_PAYMENT}, u.full_name, '${adminData.full_name}') as recipient, oth.description, oth.amount, oth.status, oth.type, oth.payment_type,
      oth.created_at FROM outstanding_transaction_history oth
      INNER JOIN users u on oth.user_id = u.id
      WHERE oth.deleted_at IS NULL ${condition}
      GROUP BY (oth.id), u.total_outstanding, oth.task_id, oth.user_id, IF(oth.type = 0,u.full_name,'${adminData.full_name}'), IF(oth.type != 0,'${adminData.full_name}', u.full_name), oth.description, oth.amount, oth.status, oth.type, oth.payment_type, oth.created_at
      ${order_by} ${order_by_type} LIMIT ${skip},${take}`;

      const sqlCountQuery = `
      SELECT DISTINCT(oth.id), oth.payment_id as transaction_id, oth.status as transaction_status,u.total_outstanding as outstanding_amount, oth.task_id, oth.user_id, IF(oth.type = ${TRANSACTION_TYPE.TASK_PAYMENT}, u.full_name,'${adminData.full_name}') as sender, IF(oth.type != ${TRANSACTION_TYPE.TASK_PAYMENT}, u.full_name, '${adminData.full_name}') as recipient, oth.description, oth.amount, oth.status, oth.type, oth.payment_type,
      oth.created_at FROM outstanding_transaction_history oth
      INNER JOIN users u on oth.user_id = u.id
      WHERE oth.deleted_at IS NULL ${condition}
      GROUP BY (oth.id), u.total_outstanding, oth.task_id, oth.user_id, IF(oth.type = 0,u.full_name,'${adminData.full_name}'), IF(oth.type != 0,'${adminData.full_name}', u.full_name), oth.description, oth.amount, oth.status, oth.type, oth.payment_type, oth.created_at
      ${order_by} ${order_by_type} `;

      const entityManager = getManager();
      const transactionsData = await entityManager.query(sqlQuery);
      const transactionsCountData = await entityManager.query(sqlCountQuery);
      const allTransactions = values(transactionsData);
      const totalTransactionsCount = values(transactionsCountData);

      const responseData = [];
      const taskIds = [];
      for (let i = 0; i < allTransactions.length; i++) {
        const outstanding_amount = +allTransactions[i].outstanding_amount;
        const obj = {
          id: allTransactions[i].transaction_id,
          task_id: +allTransactions[i].task_id,
          user_id: +allTransactions[i].user_id,
          sender: allTransactions[i].sender,
          recipient: allTransactions[i].recipient,
          status: +allTransactions[i].transaction_status,
          amount: +allTransactions[i].amount,
          date: allTransactions[i].created_at,
          outStandingBalance: taskIds.includes(+allTransactions[i].user_id)
            ? null
            : +outstanding_amount,
        };
        taskIds.push(+allTransactions[i].user_id);
        responseData.push(obj);
      }
      return ResponseMap(
        {
          transactionData: responseData,
          totalData: totalTransactionsCount.length,
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
   * @description Dispute Payment
   * @params disputePaymentDto to get data of employer and specialist id
   * @Created Jun 2, 2021
   * @Updated Jun 2, 2021
   **/
  async disputePayment(
    user: UserEntity,
    disputePaymentDto: DisputePaymentDto,
  ): GlobalResponseType {
    try {
      const taskDetails = await this.TasksRepository.findOne({
        where: { id: disputePaymentDto.task_id, deleted_at: IsNull() },
      });
      if (!taskDetails) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.no_task'),
        );
      }
      if (taskDetails.task_status !== TASK_STATUS.REPORTED) {
        throw new BadRequestException(
          await this.i18n.translate('validation_task.task_not_reported'),
        );
      }
      const employerData = await this.UserRepository.findOne({
        where: { id: taskDetails.employer_id, deleted_at: IsNull() },
      });

      const specialistData = await this.UserRepository.findOne({
        where: { id: taskDetails.specialist_id, deleted_at: IsNull() },
      });

      if (disputePaymentDto.refund_to_employer && !employerData) {
        throw new BadRequestException(
          `Employer: ${await this.i18n.translate(
            'validation.user_not_exists',
          )}`,
        );
      }

      if (disputePaymentDto.refund_to_specialist && !specialistData) {
        throw new BadRequestException(
          `Specialist: ${await this.i18n.translate(
            'validation.user_not_exists',
          )}`,
        );
      }

      if (disputePaymentDto.refund_to_employer) {
        const existingDispute = await this.OutstandingTransactionRepository.findOne(
          {
            where: {
              task_id: taskDetails.id,
              user_id: employerData.id,
              type: TRANSACTION_TYPE.REPORTED_TASK_PAYMENT,
              payment_type: PAYMENT_TYPE.CREDIT,
              status: TRANSACTION_STATUS.SUCCESS,
              deleted_at: IsNull(),
            },
          },
        );

        if (existingDispute) {
          throw new BadGatewayException(
            `Employer: ${await this.i18n.translate('dispute.dispute_exists')}`,
          );
        }

        const newDisputeEntry = new OutstandingTransactionsEntity();
        newDisputeEntry.user_id = employerData.id;
        newDisputeEntry.task_id = taskDetails.id;
        const taskID = `${taskDetails.id}`.padStart(3, '0');
        newDisputeEntry.payment_id = `DP${taskID}${random3Digit()}`;
        newDisputeEntry.description = disputePaymentDto.refund_message;
        newDisputeEntry.status = TRANSACTION_STATUS.SUCCESS;
        newDisputeEntry.amount = disputePaymentDto.refund_to_employer;
        newDisputeEntry.type = TRANSACTION_TYPE.REPORTED_TASK_PAYMENT;
        newDisputeEntry.payment_type = PAYMENT_TYPE.CREDIT;
        await newDisputeEntry.save();
        employerData.total_outstanding =
          employerData.total_outstanding + disputePaymentDto.refund_to_employer;
        await employerData.save();

        await this.ReportedTasksRepository.update(
          {
            reported_by: REPORTED_BY.EMPLOYER,
            task_id: taskDetails.id,
            deleted_at: IsNull(),
          },
          {
            status: REPORTED_TASK_STATUS.RESOLVED,
            payments: JSON.stringify({
              amount: disputePaymentDto.refund_to_employer,
              payment_type: PAYMENT_TYPE.CREDIT,
              payment_id: newDisputeEntry.payment_id,
            }),
          },
        );
      }

      if (disputePaymentDto.refund_to_specialist) {
        const existingDispute = await this.OutstandingTransactionRepository.findOne(
          {
            where: {
              task_id: taskDetails.id,
              user_id: specialistData.id,
              type: TRANSACTION_TYPE.REPORTED_TASK_PAYMENT,
              payment_type: PAYMENT_TYPE.DEBIT,
              status: TRANSACTION_STATUS.SUCCESS,
              deleted_at: IsNull(),
            },
          },
        );

        if (existingDispute) {
          throw new BadGatewayException(
            `Specialist: ${await this.i18n.translate(
              'dispute.dispute_exists',
            )}`,
          );
        }

        const newDisputeEntry = new OutstandingTransactionsEntity();
        newDisputeEntry.user_id = specialistData.id;
        newDisputeEntry.task_id = taskDetails.id;
        const taskID = `${taskDetails.id}`.padStart(3, '0');
        newDisputeEntry.payment_id = `DP${taskID}${random3Digit()}`;
        newDisputeEntry.description = disputePaymentDto.refund_message;
        newDisputeEntry.status = TRANSACTION_STATUS.SUCCESS;
        newDisputeEntry.amount = disputePaymentDto.refund_to_specialist;
        newDisputeEntry.type = TRANSACTION_TYPE.REPORTED_TASK_PAYMENT;
        newDisputeEntry.payment_type = PAYMENT_TYPE.DEBIT;
        await newDisputeEntry.save();
        specialistData.total_outstanding =
          specialistData.total_outstanding -
          disputePaymentDto.refund_to_specialist;
        await specialistData.save();

        await this.ReportedTasksRepository.update(
          {
            reported_by: REPORTED_BY.SPECIALIST,
            task_id: taskDetails.id,
            deleted_at: IsNull(),
          },
          {
            status: REPORTED_TASK_STATUS.RESOLVED,
            payments: JSON.stringify({
              amount: disputePaymentDto.refund_to_specialist,
              payment_type: PAYMENT_TYPE.DEBIT,
              payment_id: newDisputeEntry.payment_id,
            }),
          },
        );
      }

      return ResponseMap(
        {
          result: disputePaymentDto,
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
