import {
  Controller,
  UseInterceptors,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { SentryInterceptor } from 'src/interceptors/sentry.interceptor';
import { JwtAdminAuthGuard } from '../../auth/jwt-auth.guard';
import { UserEntity } from 'src/entities/user.entity';
import { GlobalResponseType } from 'src/utils/types';
import { User } from '../../auth/user.decorator';
import { TasksService } from './tasks.service';
import { TaskFilterDto, ViewProofsDto } from 'src/dto/admin.dto';

@Controller('admin')
@UseInterceptors(SentryInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * @author Abhee Hudani
   * @description List All task according to filters
   * @params taskFilterDto to list the task according to filter
   * @Created Jun 2, 2021
   * @Updated Jun 2, 2021
   **/
  @UseGuards(JwtAdminAuthGuard)
  @Post('/view/tasks')
  async tasksList(
    @User() user: UserEntity,
    @Body(ValidationPipe) taskFilterDto: TaskFilterDto,
  ): GlobalResponseType {
    return await this.tasksService.tasksList(user, taskFilterDto);
  }

  /**
   * @author Abhee Hudani
   * @description view Single Task Details
   * @params params to get task id
   * @Created Jun 2, 2021
   * @Updated Jun 2, 2021
   **/
  @UseGuards(JwtAdminAuthGuard)
  @Get('/view/task/:task_id')
  async viewTask(
    @User() user: UserEntity,
    @Param() task_id: string,
  ): GlobalResponseType {
    return await this.tasksService.viewTask(user, task_id);
  }

  /**
   * @author Abhee Hudani
   * @description view Proofs of reported Tasks
   * @Created Jun 2, 2021
   * @Updated Jun 2, 2021
   **/
  @UseGuards(JwtAdminAuthGuard)
  @Post('/view/task/proofs')
  async viewTaskProofs(
    @User() user: UserEntity,
    @Body(ValidationPipe) viewProofsDto: ViewProofsDto,
  ): GlobalResponseType {
    return await this.tasksService.viewProofs(user, viewProofsDto);
  }
}
