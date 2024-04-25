import {
  Controller,
  Post,
  Body,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
  Get,
  Param,
  UsePipes,
  BadGatewayException,
  Patch,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { SentryInterceptor } from 'src/interceptors/sentry.interceptor';
import { taskUploadFileFilter } from 'src/utils/file-uploading.utils';
import {
  JwtCommonAuthGuard,
  JwtGuestAuthGuard,
  JwtSuspendAuthGuard,
} from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { TasksService } from './tasks.service';
import {
  AcceptRejectBidDto,
  TaskBidsDTO,
  NewTaskDto,
  GetTaskBidDto,
  MyTaskDto,
  MyTaskFilterDto,
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
import { GlobalResponseType } from 'src/utils/types';
import { FILE_SIZE } from 'src/utils/constant';

@Controller('tasks')
@UseInterceptors(SentryInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Author: Abhee Hudani
   * Description: Create or Update an open task, Re-post an archived Task
   * Created At: May 6, 2021
   * Update At: June 23, 2021
   **/
  @Post('create-update-repost')
  @UseGuards(JwtCommonAuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseInterceptors(
    FilesInterceptor('task_media', FILE_SIZE.task_total_media, {
      fileFilter: taskUploadFileFilter,
    }),
  )
  async createUpdateTask(
    @Body() newTasksDto: NewTaskDto,
    @User()
    user: UserEntity,
    @UploadedFiles() files: Express.Multer.File[],
  ): GlobalResponseType {
    return this.tasksService.createUpdateReOpenTask(user, newTasksDto, files);
  }

  /**
   * Author: Abhee Hudani
   * Description: Cancel an open,active task for employer and an active task for specialist
   * Created At: May 12, 2021
   * Update At: May 21, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('cancel')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseInterceptors(
    FilesInterceptor('cancel_task_media', FILE_SIZE.task_total_media, {
      fileFilter: taskUploadFileFilter,
    }),
  )
  async cancelTask(
    @User() user: UserEntity,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() cancelTaskDto: CancelTaskDto,
  ): GlobalResponseType {
    return await this.tasksService.cancelTaskRequest(
      user,
      cancelTaskDto,
      files,
    );
  }

  /**
   * Author: Abhee Hudani
   * Description: Share contact details with specialist
   * Created At: Aug 13,2021
   * Update At: Aug 13,2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Patch('share-contact-details')
  async shareContactDetails(
    @User() user: UserEntity,
    @Body(ValidationPipe) shareContactDetailsDto: ShareContactDetailsDto,
  ): GlobalResponseType {
    return await this.tasksService.shareContactDetails(
      user,
      shareContactDetailsDto,
    );
  }

  /**
   * Author: Vaibhavi Rathod
   * Description: Listing of My Task depending on user Type: Employer and Specialist
   * Created At: May 09, 2021
   * Update At: Jun 04, 2021
   **/
  @UseGuards(JwtSuspendAuthGuard)
  @Post('my-tasks')
  async myTaskList(
    @User() user: UserEntity,
    @Body(ValidationPipe) myTaskFilterDto: MyTaskFilterDto,
  ): GlobalResponseType {
    return await this.tasksService.myTaskList(user, myTaskFilterDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Get single task details for employer and specialist
   * Created At: May 12, 2021
   * Update At: May 12, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Get('my-tasks/:user_type/:task_id')
  async getTaskDetails(
    @User() user: UserEntity,
    @Param() params: MyTaskDto,
  ): GlobalResponseType {
    return await this.tasksService.getTaskDetails(user, params);
  }

  /**
   * Author: Bhargav Sakaria
   * Description: Get single task details for guest user
   * Created At: June 01, 2021
   * Update At: June 01, 2021
   **/
  @UseGuards(JwtGuestAuthGuard)
  @Get('guest/task-detail/:task_id')
  async guesstGetTaskDetails(
    @Param('task_id') task_id: string,
  ): GlobalResponseType {
    return await this.tasksService.guestGetTaskDetails(task_id);
  }

  /**
   * Author: Abhee Hudani
   * Description: Find tasks for specialist
   * Created At: May 13, 2021
   * Update At: Jun 04, 2021
   **/
  @UseGuards(JwtSuspendAuthGuard)
  @Post('find')
  async findTaskDetails(
    @User() user: UserEntity,
    @Body(ValidationPipe) findTaskDto: FindTaskDto,
  ): GlobalResponseType {
    return await this.tasksService.findTasks(user, findTaskDto);
  }

  /**
   * Author: Bhargav Sakaria
   * Description: Find all tasks as a Guest user (NO AUTHENTICATION NEEDED!)
   * Created At: Feb 08, 2021
   **/
  @UseGuards(JwtGuestAuthGuard)
  @Post('guest/find')
  async guestFindTaskDetails(
    @Body(ValidationPipe) findTaskDto: GuestFindTaskDto,
  ): GlobalResponseType {
    return await this.tasksService.guestFindTasks(findTaskDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Find invited tasks for specialist
   * Created At: Jun 25, 2021
   * Update At: Jun 25, 2021
   **/
  @UseGuards(JwtSuspendAuthGuard)
  @Get('invited')
  async invitedTaskDetails(@User() user: UserEntity): GlobalResponseType {
    return await this.tasksService.invitedTasks(user);
  }

  /**
   * Author: Abhee Hudani
   * Description: All bids for specific task for employer and admin
   * Created At: May 11, 2021
   * Update At: Jub 2, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('bid/details')
  async getEmployerBidDetails(
    @User() user: UserEntity,
    @Body(ValidationPipe) getTaskBidDto: GetTaskBidDto,
  ): GlobalResponseType {
    return await this.tasksService.employerBidsList(user, getTaskBidDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Checkout Screen details
   * Created At: Jun 30, 2021
   * Update At: Jun 30, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('checkout/details')
  async checkoutDetails(
    @User() user: UserEntity,
    @Body(ValidationPipe) checkoutTaskDto: CheckoutTaskDto,
  ): GlobalResponseType {
    return await this.tasksService.checkoutDetails(user, checkoutTaskDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Accept or Reject a bid for open request employer
   * Created At: Jun 29, 2021
   * Update At: Jun 29, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('bid/accept-reject')
  async employerBidAccept(
    @User() user: UserEntity,
    @Body(ValidationPipe) acceptRejectBidDto: AcceptRejectBidDto,
  ): GlobalResponseType {
    return await this.tasksService.employerBidAcceptReject(
      user,
      acceptRejectBidDto,
    );
  }

  /**
   * Author: Abhee Hudani
   * Description: Create a new bid for existing task for specialist
   * Created At: May 11, 2021
   * Update At: May 19, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('bid/create-update')
  async createTaskBid(
    @User() user: UserEntity,
    @Body(ValidationPipe) taskBidsDTO: TaskBidsDTO,
  ): GlobalResponseType {
    return await this.tasksService.createUpdateTaskBid(user, taskBidsDTO);
  }

  /**
   * Author: Abhee Hudani
   * Description: Accept or Reject Task Cancellation request for employer and specialist
   * Created At: May 13, 2021
   * Update At: May 18, 2022
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('cancellation/accept-reject')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseInterceptors(
    FilesInterceptor('disagree_media', FILE_SIZE.task_total_media, {
      fileFilter: taskUploadFileFilter,
    }),
  )
  async cancelTaskAcceptReject(
    @User() user: UserEntity,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() cancelTaskDto: AcceptRejectTaskCancellationDto,
  ): GlobalResponseType {
    return await this.tasksService.cancelTaskAcceptReject(
      user,
      cancelTaskDto,
      files,
    );
  }

  /**
   * Author: Abhee Hudani
   * Description: Rating Review for Completed/ Cancelled Task for employer
   * Created At: May 13, 2021
   * Update At: May 19, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('review')
  async rateReviewTask(
    @User() user: UserEntity,
    @Body(ValidationPipe) rateReviewTaskDto: RateReviewTaskDto,
  ): GlobalResponseType {
    return await this.tasksService.rateReviewTask(user, rateReviewTaskDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Invite a specialist for upto 3 tasks for employer
   * Created At: May 19, 2021
   * Update At: May 19, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('invite')
  async inviteTask(
    @User() user: UserEntity,
    @Body(ValidationPipe) inviteTaskDto: InviteTaskDto,
  ): GlobalResponseType {
    return await this.tasksService.inviteTask(user, inviteTaskDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Complete an active task for specialist
   * Created At: May 19, 2021
   * Update At: May 21, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('complete')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseInterceptors(
    FilesInterceptor('complete_task_media', FILE_SIZE.task_total_media, {
      fileFilter: taskUploadFileFilter,
    }),
  )
  @UseGuards(JwtCommonAuthGuard)
  async completeTask(
    @User() user: UserEntity,
    @UploadedFiles() media: Express.Multer.File[],
    @Body() completeTaskDto: CompleteTaskDto,
    @I18n() i18n: I18nContext,
  ): GlobalResponseType {
    if (media.length === 0) {
      throw new BadGatewayException(
        await i18n.translate('validation_task.no_proof_complete_task'),
      );
    }
    return await this.tasksService.completeTask(user, completeTaskDto, media);
  }

  /**
   * Author: Abhee Hudani
   * Description: Report a complete task within 48 hours of completion for specialist
   * Created At: May 19, 2021
   * Update At: May 21, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('report')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseInterceptors(
    FilesInterceptor('report_task_media', FILE_SIZE.task_total_media, {
      fileFilter: taskUploadFileFilter,
    }),
  )
  @UseGuards(JwtCommonAuthGuard)
  async reportTask(
    @User() user: UserEntity,
    @UploadedFiles() media: Express.Multer.File[],
    @Body() reportTaskDto: ReportTaskDto,
    @I18n() i18n: I18nContext,
  ): GlobalResponseType {
    if (media.length === 0) {
      throw new BadGatewayException(
        await i18n.translate('validation_task.no_proof_report_task'),
      );
    }
    return await this.tasksService.reportTask(user, reportTaskDto, media);
  }

  /**
   * Author: Abhee Hudani
   * Description: View Reported Task Details by user
   * Created At: Jul 19, 2021
   * Update At: Jul 19, 2021
   **/
  @UseGuards(JwtCommonAuthGuard)
  @Post('view/reported')
  async viewReportedTask(
    @User() user: UserEntity,
    @Body(ValidationPipe) viewReportedTaskDto: ViewReportedTaskDto,
  ): GlobalResponseType {
    return await this.tasksService.viewReportedTask(user, viewReportedTaskDto);
  }
}
