import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, In, IsNull, Not, Repository } from 'typeorm';
import {
  assign,
  filter,
  includes,
  map,
  remove,
  sum,
  sumBy,
  toString,
  uniqBy,
  values,
} from 'lodash';
import * as moment from 'moment';
import { I18nRequestScopeService } from 'nestjs-i18n';
import Stripe from 'src/utils/stripe';
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
import { FileNameDto } from 'src/dto/file.dto';
import {
  UserCardsEntity,
  UserEntity,
  TransactionsEntity,
  UserCategoriesServicesEntity,
  UserReportProfileEntity,
  OutstandingTransactionsEntity,
} from 'src/entities/user.entity';
import {
  TaskBidsEntity,
  TaskReviewsEntity,
  TasksEntity,
} from 'src/entities/task.entity';
import { editFileName, fileUpload } from 'src/utils/file-uploading.utils';
import {
  CUSTOM_RESPONSE_STATUS,
  FILE_PATH,
  FILE_SIZE,
  FILE_TYPE,
  ResponseMap,
} from 'src/utils/constant';
import { STRIPE_NOTIFICATION } from 'src/utils/notification-constant';
import {
  NOTIFICATION_STATUS,
  PreferredWayOfContacting,
  STRIPE_ACCOUNT_BUSINESS_TYPE,
  STRIPE_ACCOUNT_TYPE,
  STRIPE_STANDARD_ACCOUNT_LINK,
  STRIPE_EXTERNAL_OBJECT,
  TASK_STATUS,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
  UserWorkAs,
  USER_ROLE,
  REPORT_PROFILE_STATUS,
  PAYMENT_TYPE,
  TRANSACTION_USER_ORDER_BY,
  ORDER_BY_TYPE,
  STRIPE_CURRENCY,
  STRIPE_COUNTRY,
  LANGUAGE,
} from 'src/utils/enums';
import {
  dateToUTC,
  profileDescriptionFilter,
  random3Digit,
} from 'src/utils/functions.utils';
import { GlobalResponseType } from 'src/utils/types';
import { ServicesEntity } from 'src/entities/service.entity';
import { serviceDto } from 'src/dto/album.dto';
import { PaginationDto } from 'src/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(UserCardsEntity)
    private UserCardsRepository: Repository<UserCardsEntity>,
    @InjectRepository(TasksEntity)
    private TaskRepository: Repository<TasksEntity>,
    @InjectRepository(TransactionsEntity)
    private TransactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(OutstandingTransactionsEntity)
    private OutstandingTransactionsRepository: Repository<OutstandingTransactionsEntity>,
    @InjectRepository(TaskBidsEntity)
    private TaskBidsRepository: Repository<TaskBidsEntity>,
    @InjectRepository(TaskReviewsEntity)
    private TaskReviewsRepository: Repository<TaskReviewsEntity>,
    @InjectRepository(UserCategoriesServicesEntity)
    private UserCategoriesServicesRepository: Repository<UserCategoriesServicesEntity>,
    @InjectRepository(ServicesEntity)
    private ServicesRepository: Repository<ServicesEntity>,
    @InjectRepository(UserReportProfileEntity)
    private ReportedUserRepository: Repository<UserReportProfileEntity>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    const userDetails = await this.UserRepository.findOne({
      where: {
        email,
        deleted_at: IsNull(),
      },
    });
    return userDetails;
  }

  async findUserById(user_id: number): Promise<UserEntity> {
    const userDetails = await this.UserRepository.findOne({
      where: {
        id: user_id,
        deleted_at: IsNull(),
      },
    });
    return userDetails;
  }

  /**
   * @author Abhee Hudani
   * @param EditUseProfileDto Email, Bio, ZipCode, Phone Number Object etc.
   * @description It will update user profile and will generate / update stripe customer ID, once every required details are filled
   * @Created May 20, 2021
   * @Updated June 23, 2021
   **/
  async updateUserProfileSettings(
    user: UserEntity,
    editUseProfileDto: EditUseProfileDto,
    media: Express.Multer.File[],
  ): GlobalResponseType {
    try {
      filter(media, async (data) => {
        const file_type = data.mimetype.split('/');
        if (
          file_type[0] === FILE_TYPE.image &&
          +data.size > FILE_SIZE.profile_image
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_image',
            )}`,
          );
        }
      });

      const checkBio = editUseProfileDto.bio
        ? profileDescriptionFilter(editUseProfileDto.bio)
        : true;
      if (!checkBio) {
        throw new BadGatewayException(
          await this.i18n.translate('validation.description_not_contain'),
        );
      }

      const userData = await this.findUserById(user.id);
      if (
        editUseProfileDto.preferred_way_of_contacting ===
          PreferredWayOfContacting.PHONE &&
        JSON.stringify(editUseProfileDto.phone_object).length === 0
      ) {
        throw new BadGatewayException(
          await this.i18n.translate('validation.phone_required_preferred_way'),
        );
      }
      const fileResponse: Array<FileNameDto> = [];
      if (
        media.length === 1 &&
        media[0].originalname !== userData.profile_photo
      ) {
        const newName = editFileName(media[0]);
        const media_path = fileUpload(
          newName,
          media[0],
          FILE_PATH.user_profile,
        );
        const file_type = media[0].mimetype.split('/');
        const fileNameObj: FileNameDto = {
          originalname: media[0].originalname,
          filename: media_path,
          mimetype: file_type[0],
          size: media[0].size,
        };
        fileResponse.push(fileNameObj);
      }
      const user_data: Partial<UserEntity> = {
        full_name: editUseProfileDto.full_name
          ? editUseProfileDto.full_name
          : userData.full_name,
        work_as: editUseProfileDto.work_as
          ? editUseProfileDto.work_as === 'null'
            ? null
            : UserWorkAs[`${editUseProfileDto.work_as}`]
          : userData.work_as,
        bio: editUseProfileDto.bio
          ? editUseProfileDto.bio === 'null'
            ? null
            : editUseProfileDto.bio
          : userData.bio,
        zipcode: editUseProfileDto.zipcode
          ? editUseProfileDto.zipcode === 'null'
            ? null
            : editUseProfileDto.zipcode
          : userData.zipcode,
        city: editUseProfileDto.city
          ? editUseProfileDto.city === 'null'
            ? null
            : editUseProfileDto.city
          : userData.city,
        address: editUseProfileDto.address
          ? editUseProfileDto.address === 'null'
            ? null
            : editUseProfileDto.address
          : userData.address,
        latitude: editUseProfileDto.latitude
          ? +editUseProfileDto.latitude
          : userData.latitude,
        longitude: editUseProfileDto.longitude
          ? +editUseProfileDto.longitude
          : userData.longitude,
        profile_photo: fileResponse[0]?.filename
          ? fileResponse[0].filename
          : userData.profile_photo,
        phone_numbers: JSON.stringify(editUseProfileDto.phone_object),
        preferred_way_of_contacting:
          editUseProfileDto.preferred_way_of_contacting,
        profile_completed: 1,
      };

      let stripeObj = {};

      if (!userData.stripe_customer_id) {
        const customerData = await Stripe.customers.create(
          {
            email: userData.email,
            name: editUseProfileDto.full_name,
            description: `User_id: ${userData.id}`,
            metadata: {
              user_id: userData.id,
            },
          },
          {
            stripeAccount: `${process.env.STRIPE_ACCOUNT_ID}`,
          },
        );
        stripeObj = {
          stripe_customer_id: customerData.id,
        };
      } else if (userData.full_name !== editUseProfileDto.full_name) {
        const customerData = await Stripe.customers.update(
          userData.stripe_customer_id,
          { name: editUseProfileDto.full_name },
        );
        stripeObj = {
          stripe_customer_id: customerData.id,
        };
      }

      assign(user_data, stripeObj);

      await this.UserRepository.update({ id: userData.id }, user_data);
      return ResponseMap(
        {
          profile_data: user_data,
          fileResponse: fileResponse,
        },
        await this.i18n.translate('success.profile_updated'),
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
   * @description  Get User Profile Stripe account link
   * @Created Jul 23, 2021
   * @Updated Jul 23, 2021
   **/
  async checkStripeConnectAccount(user: UserEntity): GlobalResponseType {
    try {
      const userData = await this.findUserById(user.id);
      let linkData = null;
      if (userData.stripe_account_id) {
        const AccountLink = await Stripe.accountLinks.create({
          account: userData.stripe_account_id,
          refresh_url: process.env.STRIPE_REFRESH_URL,
          return_url: process.env.STRIPE_RETURN_URL,
          type: STRIPE_STANDARD_ACCOUNT_LINK.onboarding,
        });

        const expires_at = moment.unix(AccountLink.expires_at).toDate();

        linkData = {
          link: AccountLink.url,
          expires_at: dateToUTC(expires_at),
        };
      }
      return ResponseMap(
        {
          account_created: userData.stripe_account_id ? true : false,
          stripe_account_id: userData.stripe_account_id,
          linkData: linkData,
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
   * @param CreateStripeConnectDto Stripe Required Data to create account
   * @description It will create standard stripe connect account for user
   * @Created May 24, 2021
   * @Updated Jun 24, 2021
   **/
  async createStripeConnectAccount(
    user: UserEntity,
    createStripeConnectDto: CreateStripeConnectDto,
  ): GlobalResponseType {
    try {
      const userData = await this.findUserById(user.id);
      if (userData.stripe_account_id) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_stripe.already_stripe_account_id_exists',
          ),
        );
      }
      const userDOB = moment(userData.birth_date);
      const account = await Stripe.accounts.create({
        country: STRIPE_COUNTRY.DK,
        type: STRIPE_ACCOUNT_TYPE.STANDARD,
        email: userData.email,
        business_type: STRIPE_ACCOUNT_BUSINESS_TYPE.INDIVIDUAL,
        // business_profile: {
        //   name: `${createStripeConnectDto.first_name} ${createStripeConnectDto.last_name}`,
        //   mcc: '7372',
        //   product_description: 'Marketplace User:' + userData.id,
        // },
        default_currency: STRIPE_CURRENCY.DKK,
        metadata: {
          user_id: userData.id,
          customer_id: userData.stripe_customer_id,
        },
        individual: {
          dob: {
            day: userDOB.get('day'),
            month: userDOB.get('month'),
            year: userDOB.get('year'),
          },
          phone: createStripeConnectDto.phone,
          // id_number: createStripeConnectDto.id_number,
          address: {
            line1: createStripeConnectDto.address_line_1,
            line2: createStripeConnectDto.address_line_2,
            postal_code: createStripeConnectDto.postal_code,
            city: createStripeConnectDto.city,
          },
          first_name: createStripeConnectDto.first_name,
          last_name: createStripeConnectDto.last_name,
          email: userData.email,
        },
        external_account: {
          object: STRIPE_EXTERNAL_OBJECT.bank,
          account_number: createStripeConnectDto.account_number,
          currency: STRIPE_CURRENCY.DKK,
          country: STRIPE_COUNTRY.DK,
        },
      });
      await this.UserRepository.update(
        { id: userData.id, deleted_at: IsNull() },
        { stripe_account_id: account.id },
      );
      try {
        const AccountLink = await Stripe.accountLinks.create({
          account: account.id,
          refresh_url: process.env.STRIPE_REFRESH_URL,
          return_url: process.env.STRIPE_RETURN_URL,
          type: STRIPE_STANDARD_ACCOUNT_LINK.onboarding,
        });

        const notificationText = await this.i18n.translate(
          'notification.user_stripe_connect_created',
          { lang: LANGUAGE.EN },
        );
        const notificationText_DA = await this.i18n.translate(
          'notification.user_stripe_connect_created',
          { lang: LANGUAGE.DE },
        );
        const notification = new NotificationsEntity();
        notification.recipient_id = userData.id;
        notification.read_flag = NOTIFICATION_STATUS.UNREAD;
        notification.notification_text = notificationText;
        notification.notification_text_da = notificationText_DA;
        await notification.save();

        const linkData = {
          link: AccountLink.url,
          expires_at: moment
            .unix(AccountLink.expires_at)
            .format('MM/DD/YY, h:mm:ss a'),
        };
        return ResponseMap(
          {
            account_creation: CUSTOM_RESPONSE_STATUS.CREATE,
            account_link: linkData,
          },
          await this.i18n.translate('success.success'),
        );
      } catch (error) {
        throw new HttpException(
          error,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
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
   * @param CreateStripeConnectDto Stripe Required Data to create account
   * @description It will remove stripe connected account
   * @Created Jul 19, 2021
   * @Updated Jul 19, 2021
   **/

  async removeStripeConnectAccount(user: UserEntity): GlobalResponseType {
    try {
      const userData = await this.UserRepository.findOne({
        where: { id: user.id, deleted_at: IsNull() },
      });

      if (!userData) {
        throw new BadGatewayException(
          await this.i18n.translate('validation.user_not_exists'),
        );
      }
      if (userData && !userData.stripe_account_id) {
        throw new BadGatewayException(
          await this.i18n.translate(
            'validation_stripe.no_stripe_account_found',
          ),
        );
      }

      const deletedAccount = await Stripe.accounts.del(
        userData.stripe_account_id,
      );

      if (deletedAccount.deleted === true) {
        await this.UserRepository.update(
          { id: userData.id, stripe_account_id: deletedAccount.id },
          { stripe_account_id: null },
        );
      }
      return ResponseMap(
        {
          user_id: userData.id,
          account: deletedAccount,
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
   * @param user user_id to get stripe connect account
   * @description It will recreate stripe connect account verification link for user
   * @Created May 26, 2021
   * @Updated May 26, 2021
   **/
  async stripeConnectVerificationLink(user: UserEntity): GlobalResponseType {
    try {
      const userData = await this.findUserById(user.id);
      if (!userData.stripe_account_id) {
        throw new BadRequestException(
          await this.i18n.translate(
            'validation_stripe.no_stripe_account_found',
          ),
        );
      }

      const AccountLink = await Stripe.accountLinks.create({
        account: userData.stripe_account_id,
        refresh_url: process.env.STRIPE_REFRESH_URL,
        return_url: process.env.STRIPE_RETURN_URL,
        type: STRIPE_STANDARD_ACCOUNT_LINK.onboarding,
      });

      const expires_at = moment.unix(AccountLink.expires_at).toDate();

      const linkData = {
        link: AccountLink.url,
        expires_at: dateToUTC(expires_at),
      };

      return ResponseMap(
        {
          account_link: linkData,
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

  // /**
  //  * @author Abhee Hudani
  //  * @param user user_id to get stripe connect account
  //  * @description It will recreate stripe connect account update link for user
  //  * @Created May 26, 2021
  //  * @Updated May 26, 2021
  //  **/
  // async stripeConnectUpdateLink(user: UserEntity): GlobalResponseType {
  //   try {
  //     const userData = await this.findUserById(user.id);
  //     if (!userData.stripe_account_id) {
  //       throw new BadRequestException(
  //         await this.i18n.translate('validation_stripe.no_stripe_account_found'),
  //       );
  //     }

  //     const AccountLink = await Stripe.accountLinks.create({
  //       account: userData.stripe_account_id,
  //       return_url: process.env.STRIPE_RETURN_URL,
  //       type: STRIPE_STANDARD_ACCOUNT_LINK.update,
  //     });

  //     return ResponseMap(
  //       {
  //         account_link: AccountLink,
  //       },
  //       await this.i18n.translate('success.success'),
  //     );
  //   } catch (err) {
  //     throw new HttpException(
  //       err,
  //       err.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  /**
   * @author Abhee Hudani
   * @param AddCardDto
   * @description It will add a new card to user's stripe account or it will just generate the card token for one time payment
   * @Created Jun 29, 2021
   * @Updated Jun 29, 2021
   **/
  async createStripeCard(
    user: UserEntity,
    addCardDto: AddCardDto,
  ): GlobalResponseType {
    try {
      const userData = await this.findUserById(user.id);

      const cardToken = await Stripe.tokens.create({
        card: {
          name: addCardDto.card_name,
          number: addCardDto.card_number,
          exp_month: addCardDto.card_exp_month.toString(),
          exp_year: addCardDto.card_exp_year.toString(),
          cvc: addCardDto.card_cvc.toString(),
        },
      });

      if (addCardDto.save_card) {
        if (userData && !userData.stripe_customer_id) {
          throw new BadGatewayException(
            await this.i18n.translate('validation_stripe.no_stripe_id_found'),
          );
        }
        const stripeCustomerId = userData.stripe_customer_id;
        const allUserCards = await Stripe.customers.listSources(
          stripeCustomerId,
          {
            object: 'card',
          },
        );
        let allCards: any = [];
        allCards = allUserCards.data;
        const allFingerPrints = map(allCards, (data) => {
          return data.fingerprint;
        });
        const existingCard = includes(
          allFingerPrints,
          cardToken.card.fingerprint,
        );

        if (existingCard) {
          throw new BadGatewayException(
            await this.i18n.translate('validation_stripe.card_already_added'),
          );
        }
        const card = await Stripe.customers.createSource(stripeCustomerId, {
          source: cardToken.id,
        });

        const userCard = new UserCardsEntity();
        userCard.card_id = card.id;
        userCard.employer_id = user.id;
        await userCard.save();
        return ResponseMap(
          {
            card_id: card.id,
            card_save: addCardDto.save_card,
            card_status: CUSTOM_RESPONSE_STATUS.CREATE,
          },
          await this.i18n.translate('success.new_card_added'),
        );
      }

      return ResponseMap(
        {
          card_id: cardToken.id,
          card_save: addCardDto.save_card,
          card_status: CUSTOM_RESPONSE_STATUS.CREATE,
        },
        await this.i18n.translate('success.new_card_added'),
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
   * @param MakeDefaultCardDto
   * @description It will make a card default to user's stripe account
   * @Created Jun 18, 2021
   * @Updated Jun 18, 2021
   **/
  async makeStripeCardDefault(
    user: UserEntity,
    makeDefaultCardDto: MakeDefaultCardDto,
  ): GlobalResponseType {
    try {
      const userData = await this.findUserById(user.id);
      if (userData && !userData.stripe_customer_id) {
        throw new BadGatewayException(
          await this.i18n.translate('validation_stripe.no_stripe_id_found'),
        );
      }

      const userCards = await this.UserCardsRepository.findOne({
        where: {
          employer_id: userData.id,
          card_id: makeDefaultCardDto.card_id,
          deleted_at: IsNull(),
        },
      });
      if (!userCards) {
        throw new BadRequestException(
          await this.i18n.translate('validation_stripe.no_card_found_default'),
        );
      }

      await Stripe.customers.update(userData.stripe_customer_id, {
        default_source: makeDefaultCardDto.card_id,
      });

      return ResponseMap(
        {
          default: true,
          card_status: CUSTOM_RESPONSE_STATUS.UPDATE,
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
   * @param user to get the user's id
   * @description View all cards of user's stripe account
   * @Created May 22, 2021
   * @Updated May 22, 2021
   **/
  async viewStripeCards(user: UserEntity): GlobalResponseType {
    try {
      const userData = await this.findUserById(user.id);
      if (userData && !userData.stripe_customer_id) {
        throw new BadGatewayException(
          await this.i18n.translate('validation_stripe.no_stripe_id_found'),
        );
      }

      const userCards = await this.UserCardsRepository.find({
        where: { employer_id: userData.id, deleted_at: IsNull() },
      });

      const stripeCustomer = await Stripe.customers.retrieve(
        userData.stripe_customer_id,
      );

      let customerData: any = null;
      customerData = stripeCustomer;
      const defaultSource = customerData.default_source;

      const cardDetails: any = [];

      for (let i = 0; i < userCards.length; i++) {
        try {
          const card = await Stripe.customers.retrieveSource(
            userData.stripe_customer_id,
            userCards[i].card_id,
          );
          let cardData: any = null;
          cardData = card;
          const stripeCardObj = {
            card_name: cardData.name ? cardData.name : '',
            card_id: userCards[i].card_id,
            card_exp_month: cardData.exp_month,
            card_exp_year: cardData.exp_year,
            card_last_4: cardData.last4,
            card_brand: cardData.brand,
            card_default: defaultSource === userCards[i].card_id ? true : false,
          };
          cardDetails.push(stripeCardObj);
        } catch (error) {
          throw new HttpException(
            error,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      return ResponseMap(
        {
          cardDetails: cardDetails,
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
   * @param DeleteCardDto Card_ID to be deleted
   * @description It will delete existing card from user's stripe account
   * @Created May 22, 2021
   * @Updated May 23, 2021
   **/
  async deleteStripeCard(
    user: UserEntity,
    deleteCardDto: DeleteCardDto,
  ): GlobalResponseType {
    try {
      const userData = await this.findUserById(user.id);
      if (userData && !userData.stripe_customer_id) {
        throw new BadGatewayException(
          await this.i18n.translate('validation_stripe.no_stripe_id_found'),
        );
      }

      const userCard = await this.UserCardsRepository.findOne({
        where: {
          employer_id: userData.id,
          card_id: deleteCardDto.card_id,
          deleted_at: IsNull(),
        },
      });

      if (!userCard) {
        throw new BadGatewayException(
          await this.i18n.translate('validation_stripe.no_card_found_deleted'),
        );
      }

      const deleteCard = await Stripe.customers.deleteSource(
        userData.stripe_customer_id,
        userCard.card_id,
      );
      const response: any = deleteCard;

      if (response.deleted) {
        await this.UserCardsRepository.update(
          { card_id: userCard.card_id, employer_id: user.id },
          { deleted_at: new Date() },
        );
      }
      return ResponseMap(
        {
          deleteCard: deleteCard,
        },
        await this.i18n.translate('success.card_removed'),
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
   * @param user to get the user's id
   * @description View all payment history of user's account
   * @Created May 26, 2021
   * @Updated May 27, 2021
   **/
  async paymentHistory(
    user: UserEntity,
    paymentHistoryDto: PaymentHistoryDto,
  ): GlobalResponseType {
    try {
      const take = paymentHistoryDto.limit;
      const page = paymentHistoryDto.page;
      const skip = (page - 1) * take;
      const userData = await this.findUserById(user.id);
      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });
      let can_receive_payout = {};
      let order_by = '';

      if (paymentHistoryDto.order_by) {
        switch (paymentHistoryDto.order_by) {
          case TRANSACTION_USER_ORDER_BY.date:
            order_by = ' ORDER BY oth.created_at';
            break;
          case TRANSACTION_USER_ORDER_BY.amount:
            order_by = ' ORDER BY oth.amount';
            break;
          case TRANSACTION_USER_ORDER_BY.transaction_id:
            order_by = ' ORDER BY transaction_id';
            break;
        }
      }

      const order_by_type =
        order_by.length > 0 ? paymentHistoryDto.order_by_type : '';

      const sqlQuery = `
      SELECT DISTINCT(oth.id), oth.payment_id as transaction_id, oth.user_id, oth.description, oth.amount, oth.status, oth.type, oth.payment_type, oth.created_at FROM outstanding_transaction_history oth
      WHERE (oth.user_id = ${user.id} ) AND oth.deleted_at IS NULL AND ( oth.transaction_id IS NULL OR oth.type = ${TRANSACTION_TYPE.TASK_PAYMENT}) AND (oth.created_at BETWEEN "${paymentHistoryDto.start_date} 00:00:00" AND "${paymentHistoryDto.end_date} 23:59:59") 
      GROUP BY (oth.id), oth.user_id, oth.description, oth.amount, oth.status, oth.created_at ${order_by} ${order_by_type} LIMIT ${skip},${take} `;

      const sqlCountQuery = `
      SELECT DISTINCT(oth.id), oth.payment_id as transaction_id, oth.user_id, oth.description, oth.amount, oth.status, oth.type, oth.payment_type, oth.created_at FROM outstanding_transaction_history oth
      WHERE (oth.user_id = ${user.id} ) AND oth.deleted_at IS NULL AND ( oth.transaction_id IS NULL OR oth.type = ${TRANSACTION_TYPE.TASK_PAYMENT}) AND (oth.created_at BETWEEN "${paymentHistoryDto.start_date} 00:00:00" AND "${paymentHistoryDto.end_date} 23:59:59") 
      GROUP BY (oth.id), oth.user_id, oth.description, oth.amount, oth.status, oth.created_at ${order_by} ${order_by_type} `;

      const transactionHistory = [];
      let totalEarning = 0;
      const entityManager = getManager();
      const resultResponse = await entityManager.query(sqlQuery);
      const resultResponseLength = await entityManager.query(sqlCountQuery);
      const resultValues = values(resultResponse);
      const totalData = values(resultResponseLength).length;
      for (let i = 0; i < resultValues.length; i++) {
        const historyObj = {
          transaction_id: resultValues[i].transaction_id,
          sender:
            +resultValues[i].payment_type === PAYMENT_TYPE.CREDIT
              ? false
              : true,
          recipient:
            +resultValues[i].payment_type === PAYMENT_TYPE.CREDIT
              ? true
              : false,
          full_name: adminData.full_name,
          details: resultValues[i].description,
          amount: +resultValues[i].amount,
          status: resultValues[i].status,
          date: resultValues[i].created_at,
        };
        if (
          +resultValues[i].payment_type === PAYMENT_TYPE.CREDIT &&
          +resultValues[i].type !== TRANSACTION_TYPE.CANCELLED_TASK_PAYMENT
        ) {
          totalEarning = totalEarning + historyObj.amount;
        }
        if (+resultValues[i].payment_type === PAYMENT_TYPE.DEBIT) {
          totalEarning = totalEarning - historyObj.amount;
        }
        transactionHistory.push(historyObj);
      }

      if (!userData.stripe_account_id) {
        can_receive_payout = {
          status: false,
          flag: 0,
          message: await this.i18n.translate(
            'validation_stripe.no_stripe_standard_account',
          ),
        };
      } else {
        const stripeAccount = await Stripe.accounts.retrieve(
          userData.stripe_account_id,
        );
        const details_submitted = stripeAccount.details_submitted;
        can_receive_payout = {
          status: details_submitted,
          flag: details_submitted ? 2 : 1,
          message: details_submitted
            ? await this.i18n.translate('validation_stripe.can_receive_payout')
            : await this.i18n.translate(
                'validation_stripe.stripe_account_details_missing',
              ),
        };
      }
      return ResponseMap(
        {
          outstanding_amount: +userData.total_outstanding,
          transaction_history: transactionHistory,
          can_receive_payout: can_receive_payout,
          total_earning: Math.round(totalEarning * 100) / 100,
          totalData: totalData,
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
   * @param user to get the user's id
   * @description Transfer Outstanding money to user's stripe account
   * @Created May 27, 2021
   * @Updated Jun 07, 2021
   **/
  // #TODO CHANGES
  async transferPayment(user: UserEntity): GlobalResponseType {
    try {
      const userData = await this.findUserById(user.id);
      if (!userData.stripe_account_id) {
        throw new BadGatewayException(
          await this.i18n.translate(
            'validation_stripe.no_stripe_account_found',
          ),
        );
      }
      let can_receive_payout = {};
      if (!userData.stripe_account_id) {
        can_receive_payout = {
          status: false,
          message: await this.i18n.translate(
            'validation_stripe.no_stripe_standard_account',
          ),
        };
      } else {
        const stripeAccount = await Stripe.accounts.retrieve(
          userData.stripe_account_id,
        );
        const details_submitted = stripeAccount.details_submitted;
        can_receive_payout = {
          status: details_submitted,
          message: details_submitted
            ? await this.i18n.translate('validation_stripe.can_receive_payout')
            : await this.i18n.translate(
                'validation_stripe.stripe_account_details_missing',
              ),
        };
      }

      const userTotalOutstanding = userData.total_outstanding;
      const allCreditTransactions = await this.OutstandingTransactionsRepository.find(
        {
          where: {
            user_id: userData.id,
            payment_type: PAYMENT_TYPE.CREDIT,
            status: TRANSACTION_STATUS.SUCCESS,
            deleted_at: IsNull(),
          },
        },
      );

      const allCreditedTaskIds = map(allCreditTransactions, 'task_id');
      const allPaidTransactions = await this.OutstandingTransactionsRepository.find(
        {
          where: {
            user_id: userData.id,
            task_id: In(allCreditedTaskIds),
            transaction_id: Not(IsNull()),
            payment_type: PAYMENT_TYPE.CREDIT,
            status: TRANSACTION_STATUS.SUCCESS,
            deleted_at: IsNull(),
          },
        },
      );
      const paidTransactionTasks = map(allPaidTransactions, 'task_id');
      const allUnPaidTasks = filter(allCreditTransactions, (data) => {
        if (!paidTransactionTasks.includes(data.task_id)) {
          // Transaction is pending
          return true;
        } else {
          return false;
        }
      });

      const allUnPaidTaskIds = map(allUnPaidTasks, 'task_id');
      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });
      const responseObj = [];

      if (userTotalOutstanding > 2.5) {
        const amountToPay = +(userTotalOutstanding * 100).toFixed(2);
        const stripeTransferCharge = await Stripe.transfers.create({
          amount: amountToPay,
          currency: STRIPE_CURRENCY.DKK,
          destination: userData.stripe_account_id,
          description: `Marketplace Payment of Tasks: ${allUnPaidTaskIds.toString()}`,
          metadata: {
            task_id: allUnPaidTaskIds.toString(),
            user_id: userData.id,
          },
        });

        const chargeStatus = stripeTransferCharge.id
          ? TRANSACTION_STATUS.SUCCESS
          : TRANSACTION_STATUS.FAILURE;
        const transferHistory = new TransactionsEntity();
        transferHistory.transaction_id = stripeTransferCharge.id;
        // # TODO FIX THIS TASK ID IN TABLE
        transferHistory.task_id = allUnPaidTaskIds[0];
        transferHistory.sender = adminData.id;
        transferHistory.transaction_id = stripeTransferCharge.id;
        transferHistory.balance_transaction_id = stripeTransferCharge.balance_transaction.toString();
        transferHistory.recipient = userData.id;
        transferHistory.amount = stripeTransferCharge.amount;
        transferHistory.status = chargeStatus;
        transferHistory.type = TRANSACTION_TYPE.TASK_PAYMENT;
        transferHistory.description = `Marketplace Payment of Tasks: ${allUnPaidTaskIds.toString()}.`;
        await transferHistory.save();

        if (transferHistory.status === TRANSACTION_STATUS.SUCCESS) {
          userData.total_outstanding =
            userData.total_outstanding - userTotalOutstanding;
          await userData.save();
        }

        const notificationText = await this.i18n.translate(
          'notification.admin_user_init_balance_transfer',
          {
            lang: LANGUAGE.EN,
            args: { user_name: userData.full_name },
          },
        );
        const notificationText_DA = await this.i18n.translate(
          'notification.admin_user_init_balance_transfer',
          {
            lang: LANGUAGE.DE,
            args: { user_name: userData.full_name },
          },
        );
        const adminNotification = new NotificationsEntity();
        adminNotification.recipient_id = adminData.id;
        adminNotification.read_flag = NOTIFICATION_STATUS.UNREAD;
        adminNotification.notification_text = notificationText;
        adminNotification.notification_text_da = notificationText_DA;
        await adminNotification.save();

        for (let i = 0; i < allUnPaidTasks.length; i++) {
          const unPaidTask = allUnPaidTasks[i];

          const amount = unPaidTask.amount;
          const notificationText = await this.i18n.translate(
            'notification.user_task_payment_id',
            {
              lang: LANGUAGE.EN,
              args: { amount: amount, task_id: unPaidTask.task_id },
            },
          );
          const notificationText_DA = await this.i18n.translate(
            'notification.user_task_payment_id',
            {
              lang: LANGUAGE.DE,
              args: { amount: amount, task_id: unPaidTask.task_id },
            },
          );
          const notification = new NotificationsEntity();
          notification.recipient_id = userData.id;
          notification.read_flag = NOTIFICATION_STATUS.UNREAD;
          notification.notification_text = notificationText;
          notification.notification_text_da = notificationText_DA;
          await notification.save();

          const newOutStandingHistory = new OutstandingTransactionsEntity();
          newOutStandingHistory.user_id = userData.id;
          newOutStandingHistory.task_id = unPaidTask.task_id;
          const taskID = `${unPaidTask.task_id}`.padStart(3, '0');
          newOutStandingHistory.payment_id = `OP${taskID}${random3Digit()}`;
          newOutStandingHistory.payment_type = PAYMENT_TYPE.CREDIT;
          newOutStandingHistory.transaction_id = stripeTransferCharge.id;
          newOutStandingHistory.balance_transaction_id = stripeTransferCharge.balance_transaction.toString();
          newOutStandingHistory.amount = amount;
          newOutStandingHistory.description = `${STRIPE_NOTIFICATION.marketplace_has_paid} ${amount} ${STRIPE_NOTIFICATION.for_task} ${unPaidTask.task_id}.`;
          newOutStandingHistory.status = chargeStatus;
          newOutStandingHistory.type = unPaidTask.type;
          await newOutStandingHistory.save();
          responseObj.push(newOutStandingHistory);
        }
      }

      return ResponseMap(
        {
          payment: responseObj,
          can_receive_payout: can_receive_payout,
        },
        await this.i18n.translate('success.money_transferrer_success'),
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
   * @description Delete User's Stripe Account from Marketplace
   * @Created Jun 24, 2021
   * @Updated Jun 24, 2021
   **/
  async deleteStripeConnect(user: UserEntity): GlobalResponseType {
    try {
      const userData = await this.UserRepository.findOne({
        where: { id: user.id, deleted_at: IsNull() },
      });

      if (!userData) {
        throw new BadGatewayException(
          await this.i18n.translate('validation.user_not_exists'),
        );
      }
      if (userData && !userData.stripe_account_id) {
        throw new BadGatewayException(
          await this.i18n.translate(
            'validation_stripe.no_stripe_account_found',
          ),
        );
      }

      const deletedAccount = await Stripe.accounts.del(
        userData.stripe_account_id,
      );

      if (deletedAccount.deleted === true) {
        await this.UserRepository.update(
          { id: userData.id, stripe_account_id: deletedAccount.id },
          { stripe_account_id: null },
        );
      }
      return ResponseMap(
        {
          user_id: userData.id,
          account: deletedAccount,
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
   * @param user_id to get the user's id
   * @description View User Profile
   * @Created May 27, 2021
   * @Updated May 27, 2021
   **/
  async viewProfile(user_id: string, user: UserEntity): GlobalResponseType {
    try {
      const userData = await this.findUserById(+user_id);
      if (!userData) {
        throw new BadRequestException(
          await this.i18n.translate('validation.invalid_user'),
        );
      }

      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      const profile = {
        user_id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        work_as: userData.work_as,
        zipcode:
          user.id === +user_id || user.id === adminData.id
            ? userData.zipcode
            : null,
        phone: JSON.parse(userData.phone_numbers),
        city: userData.city,
        last_seen: userData.last_seen,
        description: userData.bio,
        preferred_way_of_contacting: userData.preferred_way_of_contacting,
        profile_photo: userData.profile_photo,
        address: userData.address,
        latitude: userData.latitude,
        longitude: userData.longitude,
        authorized_by_nemid: userData.nemid_verified,
        status: userData.status,
      };
      const taskCondition = [TASK_STATUS.COMPLETED, TASK_STATUS.CANCELLED];
      const sqlQuery = `
      SELECT t.id as task_id, t.title as task_title, t.employer_id, t.specialist_id, tr.rating, tr.review ,tr.reviewed_by, u.full_name as reviewer_name, u.profile_photo as reviewer_photo from tasks t
      INNER JOIN task_reviews tr ON t.id = tr.task_id 
      AND (t.specialist_id = ${userData.id} OR t.employer_id = ${userData.id})
      LEFT JOIN users u ON tr.reviewer_id = u.id
      WHERE t.task_status IN (${toString(taskCondition)}) 
      AND tr.deleted_at IS NULL AND t.deleted_at IS NULL AND u.deleted_at IS NULL;`;

      const entityManager = getManager();
      const resultData = await entityManager.query(sqlQuery);
      const allData = values(resultData);
      const employerData = [];
      const specialistData = [];
      for (let i = 0; i < allData.length; i++) {
        if (
          +allData[i].specialist_id === userData.id &&
          +allData[i].reviewed_by === 0
        ) {
          specialistData.push(allData[i]);
        } else if (
          +allData[i].employer_id === userData.id &&
          +allData[i].reviewed_by === 1
        ) {
          employerData.push(allData[i]);
        }
      }

      const totalSpecialistTasks = specialistData.length;
      const totalEmployerTasks = employerData.length;

      const totalSpecialistRating =
        sumBy(specialistData, (data) => data.rating) / totalSpecialistTasks;
      const totalEmployerRating =
        sumBy(employerData, (data) => data.rating) / totalEmployerTasks;

      let outStandingData = null;
      let totalEarning = null;
      let room_id = null;
      let can_receive_payout = {};

      if (userData.id === user.id || user.id === adminData.id) {
        outStandingData = +userData.total_outstanding;

        const paymentData = await this.OutstandingTransactionsRepository.find({
          where: {
            user_id: userData.id,
            payment_type: PAYMENT_TYPE.CREDIT,
            status: TRANSACTION_STATUS.SUCCESS,
            type: Not(TRANSACTION_TYPE.CANCELLED_TASK_PAYMENT),
            deleted_at: IsNull(),
          },
        });
        totalEarning = +sum(map(paymentData, 'amount'));

        if (!userData.stripe_account_id) {
          can_receive_payout = {
            status: false,
            message: await this.i18n.translate(
              'validation_stripe.no_stripe_standard_account',
            ),
          };
        } else {
          const stripeAccount = await Stripe.accounts.retrieve(
            userData.stripe_account_id,
          );
          const details_submitted = stripeAccount.details_submitted;
          can_receive_payout = {
            status: details_submitted,
            message: details_submitted
              ? await this.i18n.translate(
                  'validation_stripe.can_receive_payout',
                )
              : await this.i18n.translate(
                  'validation_stripe.stripe_account_details_missing',
                ),
          };
        }
      }

      if (userData.id !== user.id) {
        const roomSqlQuery = `
        SELECT cr.id as room_id, COUNT(cr.id) as room_count FROM chat_rooms cr
        INNER JOIN room_participants rp on rp.room_id = cr.id
        LEFT JOIN tasks t ON t.id = cr.task_id 
        WHERE rp.user_id IN (${user.id},${userData.id}) AND t.task_status IN (${TASK_STATUS.OPEN},${TASK_STATUS.ACTIVE})
        AND t.deleted_at IS NULL AND rp.deleted_at IS NULL AND cr.deleted_at IS NULL
        GROUP BY (cr.id) 
        HAVING COUNT(cr.id) >=2`;
        const roomData = await entityManager.query(roomSqlQuery);
        const roomValues = values(roomData);
        const room_value = uniqBy(roomValues, 'room_id')[0];
        room_id = room_value ? room_value.room_id : null;
      }

      const userCategoryServices = await this.UserCategoriesServicesRepository.find(
        {
          where: {
            user_id: userData.id,
            deleted_at: IsNull(),
          },
        },
      );
      const categoriesData = [];
      if (userCategoryServices) {
        const allCategories = map(
          uniqBy(userCategoryServices, 'category_id'),
          'category_id',
        );
        const allSubCategory = map(
          uniqBy(userCategoryServices, 'sub_category_id'),
          'sub_category_id',
        );

        for (let i = 0; i < allCategories.length; i++) {
          const categoryData = await this.CategoryRepository.findOne({
            where: { id: allCategories[i], deleted_at: IsNull() },
          });

          const subCategoriesData = await this.CategoryRepository.find({
            where: {
              id: In(allSubCategory),
              parent_id: allCategories[i],
              deleted_at: IsNull(),
            },
          });

          const parentCategory = allCategories[i];
          const subCatData = map(subCategoriesData, (data) => {
            if (+data.parent_id === parentCategory) {
              return data;
            }
          });
          remove(subCatData, (data) => {
            return !data;
          });

          const subCategoriesDataArr = [];
          for (let j = 0; j < subCatData.length; j++) {
            const subData = subCatData[j];
            const value = await Promise.all(
              map(userCategoryServices, async (data) => {
                if (
                  +data.sub_category_id === subData.id &&
                  +data.category_id === parentCategory
                ) {
                  const serviceData = await this.ServicesRepository.findOne({
                    where: { id: data.service_id, deleted_at: IsNull() },
                  });
                  if (serviceData) {
                    const obj = {
                      id: serviceData.id,
                      name: serviceData.name,
                      estimated_price: +data.estimated_price,
                    };
                    return obj;
                  }
                }
              }),
            );
            remove(value, (data) => {
              return !data;
            });
            const uniqValues = uniqBy(value, 'id');
            const pushObj = {
              data: subData,
              services: uniqValues,
            };
            subCategoriesDataArr.push(pushObj);
          }
          const obj = {
            parentCategoryData: categoryData,
            subCategoryData: subCategoriesDataArr,
          };
          categoriesData.push(obj);
        }
      }

      const albumData = [];
      let sqlQueryAlbum: string = null;
      if (user.id === userData.id || user.user_role === USER_ROLE.ADMIN) {
        sqlQueryAlbum = `SELECT a.id as user_album_id, user_album_media.id as user_album_media_id, a.visibility, a.album_name, a.user_categories_services_ids, user_album_media.media FROM user_albums a
          LEFT JOIN user_album_media ON a.id = user_album_media.user_album_id where a.user_id = ${userData.id} AND a.deleted_at is null AND user_album_media.deleted_at is null`;
      } else {
        sqlQueryAlbum = `SELECT a.id as user_album_id, user_album_media.id as user_album_media_id, a.visibility, a.album_name, a.user_categories_services_ids, user_album_media.media FROM user_albums a
          LEFT JOIN user_album_media ON a.id = user_album_media.user_album_id where a.user_id = ${userData.id} AND a.visibility = 1 AND a.deleted_at is null AND user_album_media.deleted_at is null`;
      }
      const resultResponse = await entityManager.query(sqlQueryAlbum);
      if (Object.entries(resultResponse).length > 0) {
        const allDataAlbum = values(resultResponse);
        const totalUniqueData = uniqBy(allDataAlbum, 'user_album_id');
        const allCategoryData = await this.CategoryRepository.find({
          where: { inserted_by: adminData.id, deleted_at: IsNull() },
        });
        for (let i = 0; i < totalUniqueData.length; i++) {
          const services = JSON.parse(
            totalUniqueData[i].user_categories_services_ids,
          );
          const serviceData = services.services;
          const catArr = [];
          let subCatArr = [];

          const category = filter(allCategoryData, (data) => {
            if (+data.id === services.category) {
              return services.category;
            }
          });
          catArr.push({ category: category[0] });

          const sub_category = filter(allCategoryData, (data) => {
            if (+data.id === services.sub_category) {
              return services.sub_category;
            }
          });
          subCatArr = sub_category;
          subCatArr.push({ services: serviceData });
          catArr.push({ subCategory: subCatArr });
          const obj = {
            album_id: totalUniqueData[i].user_album_id,
            album_name: totalUniqueData[i].album_name,
            category_details: catArr,
            visibility: totalUniqueData[i].visibility,
            media: map(
              filter(allDataAlbum, (data) => {
                return (
                  +data.user_album_id === +totalUniqueData[i].user_album_id
                );
              }),
              'media',
            ),
          };
          albumData.push(obj);
        }
      }

      const totalEmployerCompletedTask = await this.TaskRepository.find({
        where: {
          employer_id: userData.id,
          task_status: TASK_STATUS.COMPLETED,
          deleted_at: IsNull(),
        },
      });

      const totalSpecialistCompletedTask = await this.TaskRepository.find({
        where: {
          specialist_id: userData.id,
          task_status: TASK_STATUS.COMPLETED,
          deleted_at: IsNull(),
        },
      });

      let contact_details_visible = false;
      let contact_data = {
        email: null,
        phone_obj: null,
      };

      const task_data = await this.TaskRepository.findOne({
        where: {
          employer_id: userData.id,
          specialist_id: user.id,
          task_status: TASK_STATUS.ACTIVE,
          share_contact_details: 1,
          deleted_at: IsNull(),
        },
      });

      if (task_data) {
        contact_details_visible = true;
        if (userData.preferred_way_of_contacting === 1) {
          contact_data = {
            email: userData.email,
            phone_obj: null,
          };
        } else if (userData.preferred_way_of_contacting === 0)
          contact_data = {
            email: null,
            phone_obj:
              userData.phone_numbers && userData.phone_numbers.length > 0
                ? JSON.parse(userData.phone_numbers)
                : null,
          };
      }

      return ResponseMap(
        {
          loggedInUser: profile.user_id === user.id ? 1 : 0,
          profile: profile,
          room_id: room_id,
          can_receive_payment: can_receive_payout,
          outStandingData: outStandingData,
          totalEarning: totalEarning,
          contact_details_visible: contact_details_visible,
          contact_data: contact_data,
          specialist: {
            reviewData: specialistData,
            totalRating: totalSpecialistRating
              ? totalSpecialistRating.toFixed(2)
              : 0,
            totalTasks: totalSpecialistTasks,
            totalCompletedTasks: totalSpecialistCompletedTask.length,
          },
          employer: {
            reviewData: employerData,
            totalRating: totalEmployerRating
              ? totalEmployerRating.toFixed(2)
              : 0,
            totalTasks: totalEmployerTasks,
            totalCompletedTasks: totalEmployerCompletedTask.length,
          },
          categoriesData: categoriesData,
          albumData: albumData,
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
   * @author Bhargav Sakaria
   * @param user_id to get the user's id
   * @description View User Profile as Guest user
   * @Created June 01, 2021
   * @Updated June 01, 2021
   **/
  async guestViewUserProfile(user_id: string): GlobalResponseType {
    try {
      const userData = await this.findUserById(+user_id);
      if (!userData) {
        throw new BadRequestException(
          await this.i18n.translate('validation.invalid_user'),
        );
      }

      const profile = {
        user_id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        work_as: userData.work_as,
        zipcode: userData.zipcode,
        phone: JSON.parse(userData.phone_numbers),
        city: userData.city,
        last_seen: userData.last_seen,
        description: userData.bio,
        preferred_way_of_contacting: userData.preferred_way_of_contacting,
        profile_photo: userData.profile_photo,
        address: userData.address,
        latitude: userData.latitude,
        longitude: userData.longitude,
        authorized_by_nemid: userData.nemid_verified,
        status: userData.status,
      };

      const taskCondition = [TASK_STATUS.COMPLETED, TASK_STATUS.CANCELLED];
      const sqlQuery = `
      SELECT t.id as task_id, t.title as task_title, t.employer_id, t.specialist_id, tr.rating, tr.review ,tr.reviewed_by, u.full_name as reviewer_name, u.profile_photo as reviewer_photo from tasks t
      INNER JOIN task_reviews tr ON t.id = tr.task_id 
      AND (t.specialist_id = ${userData.id} OR t.employer_id = ${userData.id})
      LEFT JOIN users u ON tr.reviewer_id = u.id
      WHERE t.task_status IN (${toString(taskCondition)}) 
      AND tr.deleted_at IS NULL AND t.deleted_at IS NULL AND u.deleted_at IS NULL;`;

      const entityManager = getManager();
      const resultData = await entityManager.query(sqlQuery);
      const allData = values(resultData);
      const employerData = [];
      const specialistData = [];
      for (let i = 0; i < allData.length; i++) {
        if (
          +allData[i].specialist_id === userData.id &&
          +allData[i].reviewed_by === 0
        ) {
          specialistData.push(allData[i]);
        } else if (
          +allData[i].employer_id === userData.id &&
          +allData[i].reviewed_by === 1
        ) {
          employerData.push(allData[i]);
        }
      }

      const totalSpecialistTasks = specialistData.length;
      const totalEmployerTasks = employerData.length;

      const totalSpecialistRating =
        sumBy(specialistData, (data) => data.rating) / totalSpecialistTasks;
      const totalEmployerRating =
        sumBy(employerData, (data) => data.rating) / totalEmployerTasks;

      let can_receive_payout = {};

      if (!userData.stripe_account_id) {
        can_receive_payout = {
          status: false,
          message: await this.i18n.translate(
            'validation_stripe.no_stripe_standard_account',
          ),
        };
      } else {
        const stripeAccount = await Stripe.accounts.retrieve(
          userData.stripe_account_id,
        );
        const details_submitted = stripeAccount.details_submitted;
        can_receive_payout = {
          status: details_submitted,
          message: details_submitted
            ? await this.i18n.translate('validation_stripe.can_receive_payout')
            : await this.i18n.translate(
                'validation_stripe.stripe_account_details_missing',
              ),
        };
      }

      const userCategoryServices = await this.UserCategoriesServicesRepository.find(
        {
          where: {
            user_id: userData.id,
          },
        },
      );

      const categoriesData = [];
      if (userCategoryServices) {
        const allCategories = map(
          uniqBy(userCategoryServices, 'category_id'),
          'category_id',
        );
        const allSubCategory = map(
          uniqBy(userCategoryServices, 'sub_category_id'),
          'sub_category_id',
        );

        for (let i = 0; i < allCategories.length; i++) {
          const categoryData = await this.CategoryRepository.findOne({
            where: { id: allCategories[i] },
          });

          const subCategoriesData = await this.CategoryRepository.find({
            where: {
              id: In(allSubCategory),
              parent_id: allCategories[i],
            },
          });

          const parentCategory = allCategories[i];
          const subCatData = map(subCategoriesData, (data) => {
            if (+data.parent_id === parentCategory) {
              return data;
            }
          });
          remove(subCatData, (data) => {
            return !data;
          });

          const subCategoriesDataArr = [];
          for (let j = 0; j < subCatData.length; j++) {
            const subData = subCatData[j];
            const value = await Promise.all(
              map(userCategoryServices, async (data) => {
                if (
                  +data.sub_category_id === subData.id &&
                  +data.category_id === parentCategory
                ) {
                  const serviceData = await this.ServicesRepository.findOne({
                    where: { id: data.service_id },
                  });
                  if (serviceData) {
                    const obj = {
                      id: serviceData.id,
                      name: serviceData.name,
                      estimated_price: +data.estimated_price,
                    };
                    return obj;
                  }
                }
              }),
            );
            remove(value, (data) => {
              return !data;
            });
            const uniqValues = uniqBy(value, 'id');
            const pushObj = {
              data: subData,
              services: uniqValues,
            };
            subCategoriesDataArr.push(pushObj);
          }
          const obj = {
            parentCategoryData: categoryData,
            subCategoryData: subCategoriesDataArr,
          };
          categoriesData.push(obj);
        }
      }

      const albumData = [];

      const sqlQueryAlbum = `SELECT a.id as user_album_id, user_album_media.id as user_album_media_id, a.visibility, a.album_name, a.user_categories_services_ids, user_album_media.media FROM user_albums a
          LEFT JOIN user_album_media ON a.id = user_album_media.user_album_id where a.user_id = ${userData.id} AND a.visibility = 1 AND a.deleted_at is null AND user_album_media.deleted_at is null`;

      const resultResponse = await entityManager.query(sqlQueryAlbum);

      if (Object.entries(resultResponse).length > 0) {
        const allDataAlbum = values(resultResponse);
        const totalUniqueData = uniqBy(allDataAlbum, 'user_album_id');
        const allCategoryData = await this.CategoryRepository.find({
          where: { inserted_by: 1 },
        });
        for (let i = 0; i < totalUniqueData.length; i++) {
          const services = JSON.parse(
            totalUniqueData[i].user_categories_services_ids,
          );
          const serviceData = services.services;
          const catArr = [];
          let subCatArr = [];

          const category = filter(allCategoryData, (data) => {
            if (+data.id === services.category) {
              return services.category;
            }
          });
          catArr.push({ category: category[0] });

          const sub_category = filter(allCategoryData, (data) => {
            if (+data.id === services.sub_category) {
              return services.sub_category;
            }
          });
          subCatArr = sub_category;
          subCatArr.push({ services: serviceData });
          catArr.push({ subCategory: subCatArr });
          const obj = {
            album_id: totalUniqueData[i].user_album_id,
            album_name: totalUniqueData[i].album_name,
            category_details: catArr,
            visibility: totalUniqueData[i].visibility,
            media: map(
              filter(allDataAlbum, (data) => {
                return (
                  +data.user_album_id === +totalUniqueData[i].user_album_id
                );
              }),
              'media',
            ),
          };
          albumData.push(obj);
        }
      }

      const totalEmployerCompletedTask = await this.TaskRepository.find({
        where: {
          employer_id: userData.id,
          task_status: TASK_STATUS.COMPLETED,
        },
      });

      const totalSpecialistCompletedTask = await this.TaskRepository.find({
        where: {
          specialist_id: userData.id,
          task_status: TASK_STATUS.COMPLETED,
        },
      });

      const contact_details_visible = false;
      const contact_data = {
        email: null,
        phone_obj: null,
      };

      return ResponseMap(
        {
          profile: profile,
          can_receive_payment: can_receive_payout,
          contact_details_visible: contact_details_visible,
          contact_data: contact_data,
          specialist: {
            reviewData: specialistData,
            totalRating: totalSpecialistRating
              ? totalSpecialistRating.toFixed(2)
              : 0,
            totalTasks: totalSpecialistTasks,
            totalCompletedTasks: totalSpecialistCompletedTask.length,
          },
          employer: {
            reviewData: employerData,
            totalRating: totalEmployerRating
              ? totalEmployerRating.toFixed(2)
              : 0,
            totalTasks: totalEmployerTasks,
            totalCompletedTasks: totalEmployerCompletedTask.length,
          },
          categoriesData: categoriesData,
          albumData: albumData,
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
   * @author Bhargav Sakaria
   * @param user_id
   * @description Get user account status
   * @Created Dec 01, 2021
   * @Updated Dec 01, 2021
   */
  async getStatus(user_id: string, user: UserEntity): GlobalResponseType {
    try {
      const userData = await this.findUserById(+user_id);
      if (!userData) {
        throw new BadRequestException(
          await this.i18n.translate('validation.invalid_user'),
        );
      }

      return ResponseMap(
        {
          user_status: userData.status,
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
   * @param searchFilter to get the list of specialist by filter
   * @description Get all specialist listing
   * @Created May 27, 2021
   * @Updated Feb 08, 2022
   **/
  async specialistListing(
    searchFilter: SpecialistListingDto,
    user?: UserEntity,
  ): GlobalResponseType {
    try {
      const take = searchFilter.limit;
      const page = searchFilter.page;
      const skip = (page - 1) * take;

      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      let categoryCondition = ``;
      let userCondition = ``;
      let ratingConditions = 0;
      let category: CategoryEntity = null;
      let subCategory: CategoryEntity = null;

      if (searchFilter.business === 1 && searchFilter.freelancer === 1) {
        userCondition =
          userCondition +
          ` AND u.work_as IN (${UserWorkAs.BUSINESS},${UserWorkAs.FREELANCE})`;
      } else {
        if (searchFilter.business === 1) {
          userCondition =
            userCondition + ` AND u.work_as = ${UserWorkAs.BUSINESS}`;
        }
        if (searchFilter.freelancer === 1) {
          userCondition =
            userCondition + ` AND u.work_as = ${UserWorkAs.FREELANCE}`;
        }
      }
      if (searchFilter.nemid_authorization === 1) {
        userCondition = userCondition + ` AND u.nemid_verified = 1`;
      }
      if (searchFilter.search) {
        userCondition =
          userCondition + ` AND u.full_name LIKE '%${searchFilter.search}%'`;
      }

      if (searchFilter.category) {
        category = await this.CategoryRepository.findOne({
          where: {
            id: searchFilter.category,
            parent_id: 0,
            inserted_by: adminData.id,
            deleted_at: IsNull(),
          },
        });
        if (!category) {
          throw new BadRequestException(
            await this.i18n.translate('validation_task.no_category_found'),
          );
        }
        categoryCondition =
          categoryCondition + ` AND ucs.category_id = ${searchFilter.category}`;
      }
      if (searchFilter.city && searchFilter.city.length > 0) {
        const arr = searchFilter.city;
        const searchCity = `'${arr.join("' , '")}'`;
        userCondition = userCondition + ` AND u.city IN (${searchCity})`;
      }
      if (searchFilter.sub_category && searchFilter.sub_category.length > 0) {
        for (let i = 0; i < searchFilter.sub_category.length; i++) {
          subCategory = await this.CategoryRepository.findOne({
            where: {
              id: searchFilter.sub_category[i],
              inserted_by: adminData.id,
              parent_id: searchFilter.category,
              deleted_at: IsNull(),
            },
          });
          if (!subCategory) {
            throw new BadRequestException(
              `${searchFilter.sub_category[i]}: ${await this.i18n.translate(
                'validation_task.no_sub_category_found',
              )}`,
            );
          }
        }
        categoryCondition =
          categoryCondition +
          ` AND ucs.sub_category_id IN (${toString(
            searchFilter.sub_category,
          )})`;
      }

      if (searchFilter.rating_above_4 && searchFilter.rating_above_4 === 1) {
        ratingConditions = 4;
      }

      let excludeLoggedInUser = '';
      if (user) {
        excludeLoggedInUser = ` AND user_id != ${user.id}`;
      }

      const sqlQuery = `
      SELECT DISTINCT (u.id) as user_id,IFNULL(SUM(tr.rating),0) AS sum_rating,  IFNULL(Count(tr.reviewed_by), 0) AS total_rating, t.specialist_id, MAX(ucs.category_id) as category_id, MAX(ucs.sub_category_id) as sub_category_id, u.full_name, u.city,  u.profile_photo, u.nemid_verified, u.bio, u.work_as, COALESCE( IFNULL(SUM(tr.rating),0) / IFNULL(Count(tr.reviewed_by), 0) , 0) as avg_rate
      FROM task_reviews tr
      RIGHT JOIN tasks t on tr.task_id= t.id
      RIGHT JOIN users u on t.specialist_id = u.id
      LEFT JOIN user_categories_services ucs on u.id = ucs.user_id
      WHERE u.deleted_at IS NULL AND t.deleted_at IS NULL  AND u.work_as IN (0,1) AND ucs.category_id IS NOT NULL  ${userCondition} ${categoryCondition} ${excludeLoggedInUser} 
      GROUP BY (u.id), t.specialist_id, u.full_name, u.city, u.profile_photo, u.nemid_verified, u.bio, u.work_as
      HAVING COALESCE(sum_rating/NULLIF(total_rating,0) , 0)  >= ${ratingConditions}
      ORDER BY avg_rate DESC
      LIMIT ${skip},${take}`;
      const entityManager = getManager();

      const sqlCountQuery = `
      SELECT DISTINCT (u.id) as user_id,IFNULL(SUM(tr.rating),0) AS sum_rating,  IFNULL(Count(tr.reviewed_by), 0) AS total_rating, t.specialist_id, MAX(ucs.category_id), MAX(ucs.sub_category_id) , u.full_name, u.city,  u.profile_photo, u.nemid_verified, u.bio, u.work_as, COALESCE( IFNULL(SUM(tr.rating),0) / IFNULL(Count(tr.reviewed_by), 0) , 0) as avg_rate
      FROM task_reviews tr
      RIGHT JOIN tasks t on tr.task_id= t.id
      RIGHT JOIN users u on t.specialist_id = u.id
      LEFT JOIN user_categories_services ucs on u.id = ucs.user_id
      WHERE u.deleted_at IS NULL AND t.deleted_at IS NULL  AND u.work_as IN (0,1) AND ucs.category_id IS NOT NULL  ${userCondition} ${categoryCondition} ${excludeLoggedInUser}
      GROUP BY (u.id), t.specialist_id, u.full_name, u.city, u.profile_photo, u.nemid_verified, u.bio, u.work_as
      HAVING COALESCE(sum_rating/NULLIF(total_rating,0) , 0)  >= ${ratingConditions}
      ORDER BY avg_rate DESC`;

      const resultData = await entityManager.query(sqlQuery);
      const resultCountData = await entityManager.query(sqlCountQuery);
      const allData = values(resultData);
      const allCountData = values(resultCountData);
      const responseData = [];
      let sortedData = [];
      if (allData.length > 0) {
        for (let i = 0; i < allData.length; i++) {
          if (!category) {
            category = await this.CategoryRepository.findOne({
              where: {
                id: +allData[i].category_id,
                deleted_at: IsNull(),
              },
            });
          }
          if (!subCategory) {
            subCategory = await this.CategoryRepository.findOne({
              where: [
                {
                  parent_id: +category.id,
                  deleted_at: IsNull(),
                },
                {
                  id:
                    searchFilter.sub_category &&
                    searchFilter.sub_category.length > 0
                      ? searchFilter.sub_category[0]
                      : +allData[i].sub_category_id,
                  deleted_at: IsNull(),
                },
              ],
            });
          }
          const avg_rating =
            +allData[i].total_rating > 0
              ? +allData[i].sum_rating / +allData[i].total_rating
              : 0;

          if (!category) {
            throw new BadRequestException(
              await this.i18n.translate('validation_task.no_category_found'),
            );
          }

          const obj = {
            user_id: allData[i].user_id,
            user_name: allData[i].full_name,
            city: allData[i].city,
            profile_photo: allData[i].profile_photo,
            nemid_verified: allData[i].nemid_verified,
            category: category ? category.name : null,
            sub_category: subCategory ? subCategory.name : null,
            work_as: UserWorkAs[`${allData[i].work_as}`],
            description: allData[i].bio,
            avg_rating: +avg_rating.toFixed(2),
            total_review: +allData[i].total_rating,
          };
          responseData.push(obj);
        }
        sortedData = await this.bubbleSortTasks(responseData);
        // Update ranking according to Sorting
        for (let i = 0; i < sortedData.length; i++) {
          const rank = (page - 1) * 10 + i + 1;
          const ranking = `${rank}`.padStart(3, '0');
          sortedData[i] = assign(sortedData[i], { ranking: ranking });
        }
      }
      return ResponseMap(
        {
          specialists: sortedData,
          totalData: allCountData.length,
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

  async bubbleSortTasks(data: Array<any>): Promise<any> {
    const len = data.length;
    const arr = data;
    for (let i = len - 1; i >= 0; i--) {
      for (let j = 1; j <= i; j++) {
        let preceding_value = arr[j];
        let following_value = arr[j - 1];
        if (+following_value.avg_rating === +preceding_value.avg_rating) {
          // Check total completed task condition
          const followingValueTasksCount = await this.TaskRepository.find({
            where: {
              specialist_id: +following_value.user_id,
              task_status: TASK_STATUS.COMPLETED,
              deleted_at: IsNull(),
            },
          });
          const precedingValueTasksCount = await this.TaskRepository.find({
            where: {
              specialist_id: +preceding_value.user_id,
              task_status: TASK_STATUS.COMPLETED,
              deleted_at: IsNull(),
            },
          });

          if (
            followingValueTasksCount.length > precedingValueTasksCount.length
          ) {
            const temp = following_value;
            following_value = preceding_value;
            preceding_value = temp;
          } else if (
            followingValueTasksCount.length === precedingValueTasksCount.length
          ) {
            // Check total earning condition
            const preceding_payment = await this.OutstandingTransactionsRepository.find(
              {
                where: {
                  user_id: +preceding_value.user_id,
                  payment_type: PAYMENT_TYPE.CREDIT,
                  status: TRANSACTION_STATUS.SUCCESS,
                  type: Not(TRANSACTION_TYPE.CANCELLED_TASK_PAYMENT),
                  deleted_at: IsNull(),
                },
              },
            );
            const preceding_earning = +sum(map(preceding_payment, 'amount'));

            const following_payment = await this.OutstandingTransactionsRepository.find(
              {
                where: {
                  user_id: +following_value.user_id,
                  payment_type: PAYMENT_TYPE.CREDIT,
                  status: TRANSACTION_STATUS.SUCCESS,
                  type: Not(TRANSACTION_TYPE.CANCELLED_TASK_PAYMENT),
                  deleted_at: IsNull(),
                },
              },
            );
            const following_earning = +sum(map(following_payment, 'amount'));

            if (following_earning > preceding_earning) {
              const temp = following_value;
              following_value = preceding_value;
              preceding_value = temp;
            }
          }
        }
      }
    }
    return arr;
  }
  /**
   * @author Abhee Hudani
   * @description Get all global categories and sub categories
   * @Created May 28, 2021
   * @Updated May 28, 2021
   **/
  async viewCategories(): GlobalResponseType {
    try {
      const adminData = await this.UserRepository.findOne({
        where: { user_role: USER_ROLE.ADMIN, deleted_at: IsNull() },
      });

      const categoryData = await this.CategoryRepository.find({
        where: { inserted_by: adminData.id, deleted_at: IsNull() },
      });
      const categoriesData = [];
      const parentCategory = [];
      filter(categoryData, (data) => {
        return +data.parent_id === 0 ? parentCategory.push(data) : false;
      });

      for (let i = 0; i < parentCategory.length; i++) {
        const subCategoryData = filter(categoryData, (data) => {
          if (+data.parent_id === parentCategory[i].id) {
            return data;
          }
        });
        const obj = {
          parentCategoryData: parentCategory[i],
          subCategoryData: subCategoryData,
        };
        categoriesData.push(obj);
      }

      return ResponseMap(
        {
          allCategoriesData: categoriesData,
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
   * Author: Vaibhavi Rathod
   * Description: View all services from category_id and sub_category_id
   * dropdown listing Api
   * Created At: June 08, 2021
   * Update At: June 08, 2021
   **/
  async viewServices(
    user: UserEntity,
    serviceDto: serviceDto,
  ): GlobalResponseType {
    try {
      const userCategoryServices = await this.UserCategoriesServicesRepository.find(
        {
          select: ['id', 'service_id', 'estimated_price'],
          where: {
            user_id: user.id,
            category_id: serviceDto.category,
            sub_category_id: serviceDto.sub_category,
            deleted_at: IsNull(),
          },
        },
      );
      const serviceData = [];
      const allServices = map(userCategoryServices, 'service_id');
      for (let i = 0; i < allServices.length; i++) {
        const service = await this.ServicesRepository.findOne({
          where: {
            id: allServices[i],
            deleted_at: IsNull(),
          },
        });
        const object = {
          service_name: service.name,
          service_id: service.id,
          user_category_services_id: userCategoryServices[i].id,
          estimated_price: userCategoryServices[i].estimated_price,
        };
        serviceData.push(object);
      }
      return ResponseMap(
        {
          serviceData: serviceData,
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
   * Author: Vaibhavi Rathod
   * Description: View all Categories, Sub Categories And Type of services Information of user
   * Created At: June 08, 2021
   * Update At: June 08, 2021
   **/
  async viewTypeOfServices(user: UserEntity, id: string): GlobalResponseType {
    try {
      const userCategoryServices = await this.UserCategoriesServicesRepository.find(
        {
          where: {
            user_id: +id,
            deleted_at: IsNull(),
          },
        },
      );
      const serviceData = [];
      const allCategories = map(userCategoryServices, 'category_id');
      const allSubCategory = map(userCategoryServices, 'sub_category_id');
      const allServices = map(userCategoryServices, 'service_id');

      for (let i = 0; i < allCategories.length; i++) {
        const service = await this.ServicesRepository.findOne({
          where: {
            id: allServices[i],
            deleted_at: IsNull(),
          },
        });

        const categoryData = await this.CategoryRepository.findOne({
          where: {
            id: allCategories[i],
            deleted_at: IsNull(),
          },
        });
        const subCategoryData = await this.CategoryRepository.findOne({
          where: {
            id: allSubCategory[i],
            deleted_at: IsNull(),
          },
        });

        const object = {
          category_name: categoryData.name,
          category: categoryData.id,
          subCategory: subCategoryData.id,
          sub_category_name: subCategoryData.name,
          service_name: service.name,
          service_id: service.id,
          estimated_price: userCategoryServices[i].estimated_price,
        };
        serviceData.push(object);
      }
      if (Object.entries(serviceData).length === 0) {
        throw new BadRequestException(
          await this.i18n.translate('add_type_of_service.services_not_exits'),
        );
      }
      return ResponseMap(
        {
          serviceData: serviceData,
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
   * @description Get all notifications
   * @Created May 29, 2021
   * @Updated Aug 17, 2021
   **/
  async viewNotifications(user: UserEntity, lang: string): GlobalResponseType {
    try {
      const notifications = await this.NotificationsRepository.find({
        where: {
          recipient_id: user.id,
        },
        order: {
          created_at: ORDER_BY_TYPE.DESC,
        },
      });

      const notificationData: Array<any> = [];
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        const obj = {
          id: notification.id,
          recipient_id: notification.recipient_id,
          notification_text:
            lang === LANGUAGE.DE
              ? notification.notification_text_da
              : notification.notification_text,
          read_flag: notification.read_flag,
          routes: notification.routes ? JSON.parse(notification.routes) : null,
          created_at: notification.created_at,
        };
        notificationData.push(obj);
      }

      return ResponseMap(
        {
          notifications: notificationData,
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
   * @description Get all notifications with pagination
   * @Created Aug 17, 2021
   * @Updated Aug 17, 2021
   **/
  async viewNotificationsPagination(
    user: UserEntity,
    lang: string,
    paginationDto: PaginationDto,
  ): GlobalResponseType {
    try {
      const take = paginationDto.limit;
      const page = paginationDto.page;
      const skip = (page - 1) * take;

      const notifications = await this.NotificationsRepository.findAndCount({
        where: {
          recipient_id: user.id,
        },
        order: {
          created_at: ORDER_BY_TYPE.DESC,
        },
        take: take,
        skip: skip,
      });

      const notificationData: Array<any> = [];
      const allNotificationsData = notifications[0];
      for (let i = 0; i < allNotificationsData.length; i++) {
        const notification = allNotificationsData[i];
        const obj = {
          id: notification.id,
          recipient_id: notification.recipient_id,
          notification_text:
            lang === LANGUAGE.DE
              ? notification.notification_text_da
              : notification.notification_text,
          read_flag: notification.read_flag,
          routes: notification.routes ? JSON.parse(notification.routes) : null,
          created_at: notification.created_at,
        };
        notificationData.push(obj);
      }

      return ResponseMap(
        {
          notifications: notificationData,
          totalNotifications: notifications[1],
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
   * @description Update notification status to mark as read
   * @Created Jun 30, 2021
   * @Updated Jun 30, 2021
   **/
  async updateNotificationStatus(
    user: UserEntity,
    notificationDto: NotificationDto,
  ): GlobalResponseType {
    try {
      if (notificationDto.read_all) {
        await this.NotificationsRepository.update(
          {
            recipient_id: user.id,
          },
          { read_flag: NOTIFICATION_STATUS.READ },
        );
      } else {
        await this.NotificationsRepository.update(
          {
            id: In(notificationDto.notification_id),
            recipient_id: user.id,
          },
          { read_flag: NOTIFICATION_STATUS.READ },
        );
      }

      const allNotifications = await this.NotificationsRepository.find({
        where: { recipient_id: user.id },
      });

      return ResponseMap(
        {
          notifications: allNotifications,
          notification_status: CUSTOM_RESPONSE_STATUS.UPDATE,
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
   * @description Report user profile that is disturbing or rule-breaking profile
   * @Created Jun 04, 2021
   * @Updated Jul 20, 2021
   **/
  async reportProfile(
    user: UserEntity,
    reportProfile: ReportProfileDto,
    // media: Express.Multer.File[],
  ): GlobalResponseType {
    try {
      // filter(media, (data) => {
      //   const file_type = data.mimetype.split('/');
      //   if (
      //     file_type[0] === FILE_TYPE.image &&
      //     +data.size > FILE_SIZE.report_image
      //   ) {
      //     throw new BadGatewayException(
      //       `${data.originalname}: ${FILE_ERROR.big_image}`,
      //     );
      //   } else if (
      //     file_type[0] === FILE_TYPE.video &&
      //     +data.size > FILE_SIZE.report_video
      //   ) {
      //     throw new BadGatewayException(
      //       `${data.originalname}: ${FILE_ERROR.big_video}`,
      //     );
      //   }
      // });

      const userData = await this.UserRepository.findOne({
        where: { id: reportProfile.user_id, deleted_at: IsNull() },
      });
      if (!userData) {
        throw new BadRequestException(
          await this.i18n.translate('validation.no_user_report'),
        );
      }
      const previousReported = await this.ReportedUserRepository.findOne({
        where: {
          reported_by: user.id,
          reported_user: reportProfile.user_id,
          deleted_at: IsNull(),
        },
      });

      if (user.id === reportProfile.user_id) {
        throw new BadRequestException(
          await this.i18n.translate('validation.can_not_report_own_profile'),
        );
      }

      // const fileResponse: Array<FileNameDto> = [];
      // for (let i = 0; i < media.length; i++) {
      //   const newName = editFileName(media[i]);
      //   const media_path = fileUpload(newName, media[i], FILE_PATH.report_user);
      //   const file_type = media[i].mimetype.split('/');
      //   const fileNameObj: FileNameDto = {
      //     filename: media_path,
      //     mimetype: file_type[0],
      //   };
      //   fileResponse.push(fileNameObj);
      // }
      if (
        previousReported &&
        previousReported.status === REPORT_PROFILE_STATUS.PENDING
      ) {
        // previousReported.report_proof = JSON.stringify(fileResponse);
        // previousReported.report_reason = reportProfile.reason;
        await previousReported.save();
        return ResponseMap(
          {
            reportedUser: previousReported,
            report: CUSTOM_RESPONSE_STATUS.UPDATE,
          },
          await this.i18n.translate('success.report_profile_success'),
        );
      } else {
        const newReportUser = new UserReportProfileEntity();
        newReportUser.reported_user = reportProfile.user_id;
        newReportUser.reported_by = user.id;
        // newReportUser.report_reason = reportProfile.reason;
        // newReportUser.report_proof = JSON.stringify(fileResponse);
        newReportUser.status = REPORT_PROFILE_STATUS.PENDING;
        await newReportUser.save();
        return ResponseMap(
          {
            reportedUser: newReportUser,
            report: CUSTOM_RESPONSE_STATUS.CREATE,
          },
          await this.i18n.translate('success.report_profile_success'),
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
