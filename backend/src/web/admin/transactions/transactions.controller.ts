import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { DisputePaymentDto, TransactionFilterDto } from 'src/dto/admin.dto';
import { UserEntity } from 'src/entities/user.entity';
import { SentryInterceptor } from 'src/interceptors/sentry.interceptor';
import { GlobalResponseType } from 'src/utils/types';
import { JwtAdminAuthGuard } from 'src/web/auth/jwt-auth.guard';
import { User } from 'src/web/auth/user.decorator';
import { TransactionsService } from './transactions.service';

@Controller('admin')
@UseInterceptors(SentryInterceptor)
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  /**
   * @author Abhee Hudani
   * @description List All transactions to filters
   * @params transactionFilterDto to list the transactions according to filter
   * @Created Jun 4, 2021
   * @Updated Jun 4, 2021
   **/
  @UseGuards(JwtAdminAuthGuard)
  @Post('/view/transactions')
  async transactionsList(
    @User() user: UserEntity,
    @Body(ValidationPipe) transactionFilterDto: TransactionFilterDto,
  ): GlobalResponseType {
    return await this.transactionService.transactionsList(
      user,
      transactionFilterDto,
    );
  }

  /**
   * @author Abhee Hudani
   * @description Dispute Payment
   * @params disputePaymentDto to get data of employer and specialist id
   * @Created Jun 2, 2021
   * @Updated Jun 2, 2021
   **/
  @UseGuards(JwtAdminAuthGuard)
  @Post('/transactions/dispute')
  async disputePayment(
    @User() user: UserEntity,
    @Body(ValidationPipe) disputePaymentDto: DisputePaymentDto,
  ): GlobalResponseType {
    return await this.transactionService.disputePayment(
      user,
      disputePaymentDto,
    );
  }
}
