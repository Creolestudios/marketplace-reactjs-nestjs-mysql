import {
  Controller,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Body,
  UploadedFiles,
  Put,
  Get,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { MyAccountDto } from 'src/dto/admin.dto';
import { UserEntity } from 'src/entities/user.entity';
import { SentryInterceptor } from 'src/interceptors/sentry.interceptor';
import { FILE_SIZE } from 'src/utils/constant';
import { profileUploadFileFilter } from 'src/utils/file-uploading.utils';
import { GlobalResponseType } from 'src/utils/types';
import { JwtAdminAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
@UseInterceptors(SentryInterceptor)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * @author Vaibhavi Rathod
   * @description Description: Get Admin my account Details
   * @Created June 04, 2021
   * @Updated June 04, 2021
   **/
  @Get('my-account')
  @UseGuards(JwtAdminAuthGuard)
  async myAccountDetails(@User() admin: UserEntity) {
    return await this.adminService.myAccountDetails(admin);
  }
  /**
   * Author: Vaibhavi Rathod
   * Description: Update Admin my account Details
   * Created At: June 04, 2021
   * Update At: June 07, 2021
   **/
  @Put('my-account')
  @UseGuards(JwtAdminAuthGuard)
  @UseInterceptors(
    FilesInterceptor('profile_image', FILE_SIZE.total_profile_media, {
      fileFilter: profileUploadFileFilter,
    }),
  )
  async updateMyAccount(
    @User() admin: UserEntity,
    @Body(ValidationPipe) myAccountDto: MyAccountDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): GlobalResponseType {
    return await this.adminService.updateMyAccount(admin, myAccountDto, files);
  }
}
