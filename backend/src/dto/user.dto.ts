import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsNumber,
  Min,
  IsEnum,
  IsArray,
  ArrayMinSize,
  IsOptional,
  Max,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
  Length,
  IsNumberString,
  MaxLength,
  IsBoolean,
  ValidateIf,
  IsPositive,
} from 'class-validator';
import { size } from 'lodash';
import * as moment from 'moment';
import { DtoErrorMessage, ErrorMessage } from 'src/utils/constant';
import {
  ORDER_BY_TYPE,
  PreferredWayOfContacting,
  TRANSACTION_USER_ORDER_BY,
  UserWorkAs,
} from 'src/utils/enums';
import { checkDateFormat, checkMaxDate } from './dateValidator.dto';
import { PaginationDto } from './pagination.dto';

export class PhoneNumberObj {
  @IsOptional()
  @IsString()
  country_code: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  phone_type: string;
}

@ValidatorConstraint()
export class IsPhoneArray implements ValidatorConstraintInterface {
  public async validate(
    phoneData: PhoneNumberObj[],
    args: ValidationArguments,
  ) {
    return (
      Array.isArray(phoneData) &&
      phoneData.reduce(
        (a, b) =>
          a &&
          typeof b.phone_number === 'string' &&
          typeof b.phone_type === 'string' &&
          typeof b.country_code === 'string',
        true,
      )
    );
  }
}

export class EditUseProfileDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsOptional()
  @IsEnum(UserWorkAs, { message: DtoErrorMessage.work_as })
  work_as: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  zipcode: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  address: string;

  @Transform(({ value }) => +value)
  @IsIn([0, 1])
  @IsNumber()
  preferred_way_of_contacting: number;

  @ValidateIf(
    (o) => o.preferred_way_of_contacting == PreferredWayOfContacting.PHONE,
  )
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsPhoneArray, {
    message: ErrorMessage.invalid_phone_object,
  })
  phone_object: PhoneNumberObj[];

  @ValidateIf(
    (o) =>
      (o.address && o.address.length > 0) ||
      (o.longitude && o.longitude.length > 0),
  )
  @IsString()
  latitude: string;

  @ValidateIf(
    (o) =>
      (o.address && o.address.length > 0) ||
      (o.latitude && o.latitude.length > 0),
  )
  @IsString()
  longitude: string;
}

export class AddCardDto {
  @IsNotEmpty()
  @IsString()
  card_name: string;

  @IsNotEmpty()
  @IsString()
  card_number: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  card_exp_month: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(moment().year())
  card_exp_year: number;

  @IsNotEmpty()
  @IsNumberString()
  @Length(3, 4)
  card_cvc: string;

  @IsNotEmpty()
  @IsBoolean()
  save_card: boolean;
}

export class DeleteCardDto {
  @IsNotEmpty()
  @IsString()
  card_id: string;
}

export class MakeDefaultCardDto extends DeleteCardDto {}

export class CreateStripeConnectDto {
  @IsNotEmpty()
  @IsString()
  account_number: string;

  // @IsNotEmpty()
  // @IsString()
  // id_number: string;

  @IsNotEmpty()
  @MaxLength(10)
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address_line_1: string;

  @IsNotEmpty()
  @IsString()
  address_line_2: string;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;
}

export class PaymentHistoryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(TRANSACTION_USER_ORDER_BY, {
    message: DtoErrorMessage.user_transaction_order_by,
  })
  order_by: string;

  @ValidateIf((o) => o.order_by && o.order_by.length > 0)
  @IsEnum(ORDER_BY_TYPE, { message: DtoErrorMessage.order_by_type })
  order_by_type: string;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  start_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  end_date: Date;
}

export class SpecialistListingDto extends PaginationDto {
  @ValidateIf((o) => o.sub_category)
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsOptional()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  sub_category: Array<number>;

  @IsOptional()
  @ArrayMinSize(1)
  @IsString({ each: true })
  city: Array<string>;

  @IsOptional()
  @IsString()
  search: string;

  @IsNotEmpty()
  @IsIn([0, 1])
  business: number;

  @IsNotEmpty()
  @IsIn([0, 1])
  freelancer: number;

  @IsNotEmpty()
  @IsIn([0, 1])
  rating_above_4: number;

  @IsNotEmpty()
  @IsIn([0, 1])
  nemid_authorization: number;
}

export class NotificationDto {
  @ValidateIf((o) => !o.read_all)
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  notification_id: Array<number>;

  @IsNotEmpty()
  @IsBoolean()
  read_all: boolean;
}

export class ReportProfileDto {
  // @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id: number;

  // @IsNotEmpty()
  // @IsString()
  // reason: string;
}

export class ViewRecentChatsDto {
  @IsOptional()
  @IsNumber()
  @IsEnum([0, 1, 2]) // 0 -> Employer || 1 -> Specialist || 2 -> All
  chat_by: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  @IsEnum([1, 2, 3]) // 1 -> Active || 2 -> Trash || 3 -> Archived
  chat_type: number;
}

export class ViewChatHistoryDto extends PaginationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  room_id: number;
}

export class MarkChatRoomTrashDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  room_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsEnum([1, 2]) // 1 -> Mark as Trash || 2 -> Permanent Delete
  room_status: number;
}

export class MarkChatReadDto {
  @ValidateIf((o) => !o.read_all)
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  chat_id: Array<number>;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  room_id: number;

  @IsNotEmpty()
  @IsBoolean()
  read_all: boolean;
}

export class ViewChatAttachmentsDto extends PaginationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  room_id: number;
}
