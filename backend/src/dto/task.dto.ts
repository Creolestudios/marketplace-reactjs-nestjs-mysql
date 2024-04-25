import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  IsNumber,
  Min,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  Max,
  IsDateString,
  IsPositive,
  ValidateIf,
  IsBoolean,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { size } from 'lodash';
import * as moment from 'moment';
import { ErrorMessage } from 'src/utils/constant';
import {
  ACCEPT_REJECT,
  SpecialistPreference,
  TASK_CREATE_UPDATE_REPOST,
  TASK_DATE_AND_TIME,
  USER_TYPE,
} from 'src/utils/enums';
import { checkDateFormat, IsAfterConstraint } from './dateValidator.dto';
import { PaginationDto } from './pagination.dto';

export class BudgetObj {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  start_value: number;

  @IsNotEmpty()
  @IsNumber()
  end_value: number;
}

@ValidatorConstraint()
export class IsBudgetArray implements ValidatorConstraintInterface {
  public async validate(budgetData: BudgetObj[], args: ValidationArguments) {
    return (
      Array.isArray(budgetData) &&
      budgetData.reduce(
        (a, b) =>
          a && size(b) === 2 && b.end_value !== -1
            ? b.end_value >= b.start_value
            : true &&
              typeof b.start_value === 'number' &&
              typeof b.end_value === 'number',
        true,
      )
    );
  }
}

export class NewTaskDto {
  currentTime = moment().format('YYY-MM-DD');

  @IsNotEmpty()
  @IsString()
  @IsEnum(TASK_CREATE_UPDATE_REPOST)
  task_action: string;

  @ValidateIf(
    (o) =>
      o.task_action === TASK_CREATE_UPDATE_REPOST.UPDATE ||
      o.task_action === TASK_CREATE_UPDATE_REPOST.REPOST,
  )
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category_id: number;

  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  sub_category_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TASK_DATE_AND_TIME)
  date_and_time: string;

  @ValidateIf(
    (o) =>
      o.date_and_time === TASK_DATE_AND_TIME.GET_STARTED ||
      o.date_and_time === TASK_DATE_AND_TIME.SPECIFY_PERIOD,
  )
  @IsNotEmpty()
  @Validate(checkDateFormat)
  // @Validate(IsBeforeConstraint, ['end_date'])
  @IsDateString()
  start_date: string;

  @ValidateIf((o) => o.start_date)
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Max(24)
  @Min(0)
  start_time: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Max(60)
  @Min(0)
  start_minute: number;

  @ValidateIf(
    (o) =>
      o.date_and_time === TASK_DATE_AND_TIME.TO_FINISH_WORK ||
      o.date_and_time === TASK_DATE_AND_TIME.SPECIFY_PERIOD,
  )
  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(IsAfterConstraint, ['currentTime'])
  @IsDateString()
  end_date: string;

  @ValidateIf((o) => o.end_date)
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Max(24)
  @Min(0)
  end_time: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Max(60)
  @Min(0)
  end_minute: number;

  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;

  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(50, { message: ErrorMessage.minimum_amount_50 })
  estimated_budget: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsIn([0, 1])
  remote_job: number;

  @IsOptional()
  @IsString()
  @IsEnum(SpecialistPreference)
  specialist_preference: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsIn([0, 1])
  nemid_authorized: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsIn([0, 1])
  share_contact_details: number;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  // @ArrayMinSize(1)
  delete_media: Array<string>;
}

export class MyTaskDto {
  @IsNotEmpty()
  @IsString()
  user_type: string;

  @IsNotEmpty()
  @IsString()
  task_id: string;
}

export class CancelTaskDto {
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @IsNotEmpty()
  @IsString()
  cancel_reason: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(USER_TYPE)
  user_type: string;
}

export class CompleteTaskDto {
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: string;
}

export class ReportTaskDto extends CompleteTaskDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(USER_TYPE)
  user_type: string;

  @IsNotEmpty()
  @IsString()
  report_reason: string;
}

export class MyTaskFilterDto extends PaginationDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(USER_TYPE)
  user_type: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1])
  open_task: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  active_task: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  completed_task: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  cancelled_task: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  archived_task: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  reported_task: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  resolved_task: number;

  @ValidateIf((o) => o.user_type === USER_TYPE.SPECIALIST)
  @IsOptional()
  @IsNumber()
  @IsIn([0, 1])
  task_invitations: number;
}

export class GetTaskBidDto extends PaginationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;
}

export class AcceptRejectBidDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  bid_id: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ACCEPT_REJECT)
  bid_action: string;

  @ValidateIf((o) => o.bid_action === ACCEPT_REJECT.ACCEPT)
  @IsNotEmpty()
  @IsBoolean()
  from_default_card: boolean;

  @ValidateIf(
    (o) =>
      o.bid_action === ACCEPT_REJECT.ACCEPT && o.from_default_card === false,
  )
  @IsNotEmpty()
  @IsString()
  source_id: string;

  @ValidateIf(
    (o) =>
      o.bid_action === ACCEPT_REJECT.ACCEPT && o.from_default_card === false,
  )
  @IsNotEmpty()
  @IsBoolean()
  from_saved_card: boolean;

  @ValidateIf((o) => o.bid_action === ACCEPT_REJECT.ACCEPT)
  @IsOptional()
  @IsString()
  charge_details: string;
}

export class FindTaskDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title_search: string;

  @ValidateIf((o) => o.sub_category)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  sub_category: number;

  @IsOptional()
  @IsNumber()
  zip_code: number;

  @IsOptional()
  @IsNumber()
  search_radius: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsBudgetArray, {
    message: ErrorMessage.invalid_budget_object,
  })
  budget_object: BudgetObj[];

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  placed_bids: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_for_business: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_for_freelance: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_urgent: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_with_no_bid: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  nemid_authorization: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  remote_work: number;

  @IsOptional()
  @IsString()
  radius: string;

  @IsOptional()
  @IsString()
  latitude: string;

  @IsOptional()
  @IsString()
  longitude: string;
}

export class GuestFindTaskDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title_search: string;

  @ValidateIf((o) => o.sub_category)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  sub_category: number;

  @IsOptional()
  @IsNumber()
  zip_code: number;

  @IsOptional()
  @IsNumber()
  search_radius: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsBudgetArray, {
    message: ErrorMessage.invalid_budget_object,
  })
  budget_object: BudgetObj[];

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_for_business: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_for_freelance: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_urgent: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_with_no_bid: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  nemid_authorization: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  remote_work: number;
}

export class AcceptRejectTaskCancellationDto {
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ACCEPT_REJECT)
  task_action: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(USER_TYPE)
  user_type: string;

  @ValidateIf((o) => o.task_action === ACCEPT_REJECT.REJECT)
  @IsNotEmpty()
  @IsString()
  disagree_reason: string;
}

export class RateReviewTaskDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(USER_TYPE)
  user_type: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
  task_rating: number;

  @IsNotEmpty()
  @IsString()
  task_review: string;
}

export class InviteTaskDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  task_id: Array<number>;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  specialist_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsEnum([0, 1])
  visible_to_others: number;
}

export class TaskBidsDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(50, { message: ErrorMessage.minimum_amount_50 })
  bid_amount: number;

  @IsNotEmpty()
  @IsString()
  bid_message: string;
}

export class CheckoutTaskDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  bid_id: number;
}

export class ViewReportedTaskDto extends CompleteTaskDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(USER_TYPE)
  user_type: string;
}

export class ShareContactDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  share_contact_details: number;
}
