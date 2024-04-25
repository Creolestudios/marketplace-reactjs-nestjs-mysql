import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { I18nLang } from 'nestjs-i18n';
import {
  JwtCommonAuthGuard,
  JwtGuestAuthGuard,
  JwtSuspendAuthGuard,
} from '../auth/jwt-auth.guard';
import { SentryInterceptor } from 'src/interceptors/sentry.interceptor';
import {
  profileUploadFileFilter,
  // reportProfileFileFilter,
} from 'src/utils/file-uploading.utils';
import { User } from '../auth/user.decorator';
import { UsersService } from './users.service';
import { UserEntity } from 'src/entities/user.entity';
import {
  AddCardDto,
  CreateStripeConnectDto,
  DeleteCardDto,
  EditUseProfileDto,
  NotificationDto,
  MakeDefaultCardDto,
  PaymentHistoryDto,
  SpecialistListingDto,
  ReportProfileDto,
} from 'src/dto/user.dto';
import { FILE_SIZE } from 'src/utils/constant';
import { serviceDto } from 'src/dto/album.dto';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller('users')
@UseInterceptors(SentryInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  /**
   * Author: Abhee Hudani
   * Description: View User Profile
   * Created At: May 27, 2021
   * Update At: May 27, 2021
   **/
  @Get('profile/:user_id')
  @UseGuards(JwtCommonAuthGuard)
  async viewProfile(
    @Param('user_id') user_id: string,
    @User() user: UserEntity,
  ) {
    return this.usersService.viewProfile(user_id, user);
  }

  /**
   * Author: Bhargav Sakaria
   * Description: View User Profile as Guest
   * Created At: May 27, 2021
   * Update At: May 27, 2021
   **/
  @Get('guest/profile/:user_id')
  @UseGuards(JwtGuestAuthGuard)
  async guestViewUserProfile(
    @Param('user_id') user_id: string,
    @User() user: UserEntity,
  ) {
    return this.usersService.guestViewUserProfile(user_id);
  }

  /**
   * Author: Bhargav Sakaria
   * Description: Get user account status
   * Created At: Dec 01, 2021
   * Update At: Dec 01, 2021
   **/
  @Get('status/:user_id')
  async getStatus(@Param('user_id') user_id: string, @User() user: UserEntity) {
    return this.usersService.getStatus(user_id, user);
  }

  /**
   * Author: Abhee Hudani
   * Description: View User Profile
   * Created At: May 27, 2021
   * Update At: Feb 08, 2022
   **/
  @Post('specialists')
  @UseGuards(JwtSuspendAuthGuard)
  async specialistListing(
    @User() user: UserEntity,
    @Body(ValidationPipe) searchFilter: SpecialistListingDto,
  ) {
    return this.usersService.specialistListing(searchFilter, user);
  }

  /**
   * Author: Bhargav Sakaria
   * Description: View User Profile as Guest user (NO AUTHENTICATION NEEDED!)
   * Created At: Feb 08, 2021
   **/
  @UseGuards(JwtGuestAuthGuard)
  @Post('guest/specialists')
  async guestSpecialistListing(
    @Body(ValidationPipe) searchFilter: SpecialistListingDto,
  ) {
    return this.usersService.specialistListing(searchFilter);
  }

  /**
   * Author: Abhee Hudani
   * Description: Update User Profile Settings and create Stripe account
   * Created At: May 20, 2021
   * Update At: June 23, 2021
   **/
  @Patch('profile/settings')
  @UseGuards(JwtCommonAuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseInterceptors(
    FilesInterceptor('profile_media', FILE_SIZE.total_profile_media, {
      fileFilter: profileUploadFileFilter,
    }),
  )
  async userProfileUpdate(
    @User() user: UserEntity,
    @UploadedFiles() media: Express.Multer.File[],
    @Body() editUseProfileDto: EditUseProfileDto,
  ) {
    return await this.usersService.updateUserProfileSettings(
      user,
      editUseProfileDto,
      media,
    );
  }

  /**
   * Author: Abhee Hudani
   * Description: Get User Profile Stripe account link
   * Created At: Jul 23, 2021
   * Update At: Jul 23, 2021
   **/
  @Get('stripe/check/connect')
  @UseGuards(JwtCommonAuthGuard)
  async checkStripeConnectAccount(@User() user: UserEntity) {
    return await this.usersService.checkStripeConnectAccount(user);
  }

  /**
   * Author: Abhee Hudani
   * Description: Update User Profile Settings and create Stripe account
   * Created At: May 20, 2021
   * Update At: Jun 24, 2021
   **/
  @Post('stripe/create/connect')
  @UseGuards(JwtCommonAuthGuard)
  async createStripeConnect(
    @User() user: UserEntity,
    @Body(ValidationPipe) createStripeConnectDto: CreateStripeConnectDto,
  ) {
    return await this.usersService.createStripeConnectAccount(
      user,
      createStripeConnectDto,
    );
  }

  /**
   * Author: Abhee Hudani
   * Description: Remove stripe connected account
   * Created At: Jul 19, 2021
   * Update At: Jul 19, 2021
   **/
  @Delete('stripe/remove/connect')
  @UseGuards(JwtCommonAuthGuard)
  async removeStripeConnect(@User() user: UserEntity) {
    return await this.usersService.removeStripeConnectAccount(user);
  }

  // /**
  //  * Author: Abhee Hudani
  //  * Description: Re create stripe connect update link
  //  * Created At: May 20, 2021
  //  * Update At: May 26, 2021
  //  **/
  // @Patch('stripe/update/connect')
  // @UseGuards(JwtCommonAuthGuard)
  // async stripeConnectUpdateLink(@User() user: UserEntity) {
  //   return await this.usersService.stripeConnectUpdateLink(user);
  // }

  /**
   * Author: Abhee Hudani
   * Description: Re create stripe connect verification link
   * Created At: May 22, 2021
   * Update At: Jun 24, 2021
   **/
  @Get('stripe/refresh/connect-link')
  @UseGuards(JwtCommonAuthGuard)
  async stripeConnectVerificationLink(@User() user: UserEntity) {
    return await this.usersService.stripeConnectVerificationLink(user);
  }

  /**
   * Author: Abhee Hudani
   * Description: Add New Card to Stripe Account
   * Created At: May 22, 2021
   * Update At: May 26, 2021
   **/
  @Post('stripe/create/card')
  @UseGuards(JwtCommonAuthGuard)
  async createStripeCard(
    @User() user: UserEntity,
    @Body(ValidationPipe) addCardDto: AddCardDto,
  ) {
    return this.usersService.createStripeCard(user, addCardDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Make Default Card to Stripe Account
   * Created At: Jun 18, 2021
   * Update At: Jun 18, 2021
   **/
  @Post('stripe/default/card')
  @UseGuards(JwtCommonAuthGuard)
  async makeStripeCardDefault(
    @User() user: UserEntity,
    @Body(ValidationPipe) makeDefaultCardDto: MakeDefaultCardDto,
  ) {
    return this.usersService.makeStripeCardDefault(user, makeDefaultCardDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: View all Stripe account's added cards
   * Created At: May 22, 2021
   * Update At: May 22, 2021
   **/
  @Get('stripe/view/cards')
  @UseGuards(JwtCommonAuthGuard)
  async viewStripeCards(@User() user: UserEntity) {
    return await this.usersService.viewStripeCards(user);
  }

  /**
   * Author: Abhee Hudani
   * Description: Delete existing card from Stripe Account
   * Created At: May 22, 2021
   * Update At: May 22, 2021
   **/
  @Delete('stripe/remove/card')
  @UseGuards(JwtCommonAuthGuard)
  async deleteStripeCard(
    @User() user: UserEntity,
    @Body(ValidationPipe) deleteCardDto: DeleteCardDto,
  ) {
    return this.usersService.deleteStripeCard(user, deleteCardDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Payment History for user
   * Created At: May 26, 2021
   * Update At: May 27, 2021
   **/
  @Post('payment/history')
  @UseGuards(JwtSuspendAuthGuard)
  async paymentHistory(
    @User() user: UserEntity,
    @Body(ValidationPipe) paymentHistoryDto: PaymentHistoryDto,
  ) {
    return this.usersService.paymentHistory(user, paymentHistoryDto);
  }

  /**
   * Author: Abhee Hudani
   * Description: Transfer Outstanding payment
   * Created At: May 27, 2021
   * Update At: May 27, 2021
   **/
  @Post('stripe/transfer/payment')
  @UseGuards(JwtSuspendAuthGuard)
  async transferPayment(@User() user: UserEntity) {
    return this.usersService.transferPayment(user);
  }

  // /**
  //  * @author Abhee Hudani
  //  * @description Delete User's Stripe Account from Marketplace
  //  * @Created Jun 25, 2021
  //  * @Updated Jun 25, 2021
  //  **/
  // @Delete('/stripe/remove/user')
  // @UseGuards(JwtCommonAuthGuard)
  // async deleteStripeAccountUser(@User() user: UserEntity) {
  //   return await this.usersService.deleteStripeConnect(user);
  // }

  /**
   * Author: Abhee Hudani
   * Description: View all Global Categories and Sub Categories Information
   * Created At: May 28, 2021
   * Update At: May 28, 2021
   **/
  @Get('view/categories')
  @UseGuards(JwtCommonAuthGuard)
  async viewCategories(@User() user: UserEntity) {
    return this.usersService.viewCategories();
  }

  /**
   * Author: Bhargav Sakaria
   * Description: View all Global Categories and Sub Categories Information only for guest type user
   * Created At: March 3, 2022
   **/
  @Get('guest/view/categories')
  @UseGuards(JwtGuestAuthGuard)
  async viewCategoriesForGuest(@User() user: UserEntity) {
    return this.usersService.viewCategories();
  }

  /**
   * Author: Vaibhavi Rathod
   * @param addSubCategoryDto data to get services
   * Description: View all services from category_id and sub_category_id
   * Created At: June 08, 2021
   * Update At: June 08, 2021
   **/
  @Get('view/services')
  @UseGuards(JwtCommonAuthGuard)
  async viewServices(@User() user: UserEntity, @Body() serviceDto: serviceDto) {
    return this.usersService.viewServices(user, serviceDto);
  }

  /**
   * Author: Vaibhavi Rathod
   * Description: View all Categories, Sub Categories And Type of services Information of user
   * Created At: June 08, 2021
   * Update At: June 08, 2021
   **/
  @Get('view/type-of-services/:id')
  @UseGuards(JwtCommonAuthGuard)
  async viewTypeOfServices(@User() user: UserEntity, @Param('id') id: string) {
    return this.usersService.viewTypeOfServices(user, id);
  }

  /**
   * @author Abhee Hudani
   * @description Get all notifications
   * @Created May 29, 2021
   * @Updated Aug 17, 2021
   **/
  @Get('view/notifications')
  @UseGuards(JwtCommonAuthGuard)
  async viewNotifications(@User() user: UserEntity, @I18nLang() lang: string) {
    return this.usersService.viewNotifications(user, lang);
  }

  /**
   * @author Abhee Hudani
   * @description Get all notifications with Pagination
   * @Created Aug 17, 2021
   * @Updated Aug 17, 2021
   **/
  @Post('view/notifications')
  @UseGuards(JwtCommonAuthGuard)
  async viewNotificationsPagination(
    @User() user: UserEntity,
    @Body(ValidationPipe) paginationDto: PaginationDto,
    @I18nLang() lang: string,
  ) {
    return this.usersService.viewNotificationsPagination(
      user,
      lang,
      paginationDto,
    );
  }

  /**
   * @author Abhee Hudani
   * @description Update notification status to mark as read
   * @Created May 29, 2021
   * @Updated May 29, 2021
   **/
  @Patch('update/notification')
  @UseGuards(JwtCommonAuthGuard)
  async updateNotifications(
    @User() user: UserEntity,
    @Body(ValidationPipe) notificationDto: NotificationDto,
  ) {
    return this.usersService.updateNotificationStatus(user, notificationDto);
  }

  /**
   * @author Abhee Hudani
   * @description Report user profile that is disturbing or rule-breaking profile
   * @Created Jun 04, 2021
   * @Updated Jul 20, 2021
   **/
  @Post('report/profile')
  @UseGuards(JwtCommonAuthGuard)
  // @UsePipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     transformOptions: { enableImplicitConversion: true },
  //   }),
  // )
  // @UseInterceptors(
  //   FilesInterceptor('report_proof', FILE_SIZE.total_report_image, {
  //     fileFilter: reportProfileFileFilter,
  //   }),
  // )
  async reportProfile(
    @User() user: UserEntity,
    // @UploadedFiles() media: Express.Multer.File[],
    @Body() reportProfileDto: ReportProfileDto,
  ) {
    return this.usersService.reportProfile(user, reportProfileDto);
  }
}
