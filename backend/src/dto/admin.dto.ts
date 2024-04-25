import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { size } from 'lodash';
import { DtoErrorMessage } from 'src/utils/constant';
import {
  ACCOUNT_STATUS,
  ATTRIBUTES_CATEGORY_ORDER_BY,
  ATTRIBUTES_ORDER_BY,
  ORDER_BY_TYPE,
  REPORT_PROFILE_STATUS,
  TASKS_ORDER_BY,
  TRANSACTION_ORDER_BY,
  USER_ORDER_BY,
} from 'src/utils/enums';
import {
  checkDateFormat,
  checkMaxDate,
  IsBeforeConstraint,
  OneMonthConstraint,
} from './dateValidator.dto';
import { PaginationDto } from './pagination.dto';

export class SubCategoryObj {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class BudgetObj {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  start_value: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  end_value: number;
}

@ValidatorConstraint()
export class IsBudgetArray implements ValidatorConstraintInterface {
  public async validate(budgetData: BudgetObj[], args: ValidationArguments) {
    return (
      Array.isArray(budgetData) &&
      budgetData.reduce(
        (a, b) =>
          a &&
          size(b) === 2 &&
          b.end_value >= b.start_value &&
          typeof b.start_value === 'number' &&
          typeof b.end_value === 'number',
        true,
      ) // Validate Array and the element of array
    );
  }
}

@ValidatorConstraint()
export class IsSubCatArray implements ValidatorConstraintInterface {
  public async validate(
    phoneData: SubCategoryObj[],
    args: ValidationArguments,
  ) {
    return (
      Array.isArray(phoneData) &&
      phoneData.reduce(
        (a, b) =>
          a &&
          size(b) === 2 &&
          typeof b.id === 'number' &&
          typeof b.name === 'string',
        true,
      )
    );
  }
}

export class AttributesListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsEnum(ATTRIBUTES_ORDER_BY, { message: DtoErrorMessage.attributes_order_by })
  order_by: string;

  @ValidateIf((o) => o.order_by && o.order_by.length > 0)
  @IsEnum(ORDER_BY_TYPE, { message: DtoErrorMessage.order_by_type })
  order_by_type: string;
}

export class AttributesCategoryListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsEnum(ATTRIBUTES_CATEGORY_ORDER_BY, {
    message: DtoErrorMessage.attributes_category_order_by,
  })
  order_by: string;

  @ValidateIf((o) => o.order_by && o.order_by.length > 0)
  @IsEnum(ORDER_BY_TYPE, { message: DtoErrorMessage.order_by_type })
  order_by_type: string;

  @IsNotEmpty()
  @IsNumber({}, { message: DtoErrorMessage.category_number })
  @IsPositive()
  category_id: number;
}

export class AttributesAddCategoryDto {
  @IsNotEmpty()
  @IsIn([0, 1, 2]) //0 -> Category || 1 -> Sub Category || 2 -> Both category and Sub Category
  category_type: number;

  @ValidateIf((o) => +o.category_type === 0 || +o.category_type === 2)
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @ValidateIf((o) => +o.category_type === 1 || +o.category_type === 2)
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  sub_category_name: Array<string>;

  @ValidateIf((o) => +o.category_type === 1)
  @IsNotEmpty()
  @IsNumber({}, { message: DtoErrorMessage.category_number })
  @IsPositive()
  parent_category_id: number;
}

export class AttributesEditCategoryDto {
  @IsNotEmpty()
  @IsIn([0, 1, 2]) //0 -> Category || 1 -> Sub Category || 2 -> Both category and Sub Category
  category_type: number;

  @IsNotEmpty()
  @IsNumber({}, { message: DtoErrorMessage.category_number })
  @IsPositive()
  category_id: number;

  @ValidateIf((o) => +o.category_type === 0 || +o.category_type === 2)
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @ValidateIf((o) => +o.category_type === 1 || +o.category_type === 2)
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsSubCatArray, {
    message: DtoErrorMessage.invalid_sub_category_object,
  })
  sub_category_object: SubCategoryObj[];
}

export class AttributesDeleteCategoryDto {
  @IsNotEmpty()
  @IsNumber({}, { message: DtoErrorMessage.category_number })
  @IsPositive()
  category_id: number;

  @IsNotEmpty()
  @IsIn([0, 1]) //0 -> Category || 1 -> Sub Category
  // Not required just for extra validations
  category_type: number;
}

export class TaskFilterDto extends PaginationDto {
  @IsOptional()
  @IsEnum(TASKS_ORDER_BY, { message: DtoErrorMessage.tasks_order_by })
  order_by: string;

  @ValidateIf((o) => o.order_by && o.order_by.length > 0)
  @IsEnum(ORDER_BY_TYPE, { message: DtoErrorMessage.order_by_type })
  order_by_type: string;

  @IsOptional()
  @IsString()
  search: string;

  @ValidateIf((o) => o.reported_task === 0)
  @IsOptional()
  @IsNumber()
  @IsIn([0, 1])
  open_task: number;

  @ValidateIf((o) => o.reported_task === 0)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  active_task: number;

  @ValidateIf((o) => o.reported_task === 0)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  completed_task: number;

  @ValidateIf((o) => o.reported_task === 0)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  cancelled_task: number;

  @ValidateIf((o) => o.reported_task === 0)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  resolved_task: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  reported_task: number;

  @ValidateIf((o) => o.sub_category)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category: number;

  @IsOptional()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  sub_category: Array<number>;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsBudgetArray, {
    message: DtoErrorMessage.invalid_budget_object,
  })
  budget_object: BudgetObj[];

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  task_without_bid: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  urgent_task: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  created_by_business: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  created_by_freelancer: number;

  @IsOptional()
  @Validate(checkDateFormat)
  start_date: Date;

  @ValidateIf((o) => o.start_date)
  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  end_date: Date;

  // start_date and end_date representing the range of task creation date for task list filter
}

export class ViewProofsDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;
}

export class MyAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message: DtoErrorMessage.password,
  })
  password: string;

  @ValidateIf((value) => value.password)
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message: DtoErrorMessage.confirm_password,
  })
  @IsNotEmpty()
  confirm_password: string;
}
export class TransactionFilterDto extends PaginationDto {
  @IsOptional()
  @IsEnum(TRANSACTION_ORDER_BY, {
    message: DtoErrorMessage.transaction_order_by,
  })
  order_by: string;

  @ValidateIf((o) => o.order_by && o.order_by.length > 0)
  @IsEnum(ORDER_BY_TYPE, { message: DtoErrorMessage.order_by_type })
  order_by_type: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  transaction_success: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  transaction_failure: number;

  @IsOptional()
  @Validate(checkDateFormat)
  start_date: Date;

  @ValidateIf((o) => o.start_date)
  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  end_date: Date;

  // start_date and end_date representing the range of transaction creation date for Transaction Filter
}

export class FilterDashboardDto {
  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(IsBeforeConstraint, ['signUp_end_date'])
  @Validate(OneMonthConstraint, ['signUp_end_date'])
  signUp_start_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  signUp_end_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(IsBeforeConstraint, ['tasks_end_date'])
  @Validate(OneMonthConstraint, ['tasks_end_date'])
  tasks_start_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  tasks_end_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(IsBeforeConstraint, ['income_end_date'])
  @Validate(OneMonthConstraint, ['income_end_date'])
  income_start_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  income_end_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(IsBeforeConstraint, ['nemId_authorized_end_date'])
  @Validate(OneMonthConstraint, ['nemId_authorized_end_date'])
  nemId_authorized_start_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  nemId_authorized_end_date: Date;
}

export class SearchUserDto extends PaginationDto {
  @IsOptional()
  @IsEnum(USER_ORDER_BY, { message: DtoErrorMessage.user_order_by })
  order_by: string;

  @ValidateIf((o) => o.order_by && o.order_by.length > 0)
  @IsEnum(ORDER_BY_TYPE, { message: DtoErrorMessage.order_by_type })
  order_by_type: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1])
  active: number;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1])
  suspended: number;

  @IsOptional()
  @IsIn([0, 1])
  reported_profile: number;
}

export class SuspendUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id: number;
}

export class DeleteStripeConnectAccountDto extends SuspendUserDto {}

export class ViewStripeConnectAccountDto extends SuspendUserDto {}

export class ViewStripeConnectAccountsDto extends PaginationDto {
  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(IsBeforeConstraint, ['end_date'])
  start_date: Date;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  end_date: Date;
}

export class ReportedProfileResolveDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  reported_id: number;
}

export class ReportedProfileProofDto extends ReportedProfileResolveDto {}

export class DisputePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @ValidateIf((o) => !o.refund_to_specialist)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  refund_to_employer: number;

  @ValidateIf((o) => !o.refund_to_employer)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  refund_to_specialist: number;

  @IsNotEmpty()
  @IsString()
  refund_message: string;
}
export class ChatFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsNotEmpty()
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
  reported_task: number;

  @ValidateIf((o) => o.sub_category)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category: number;

  @IsOptional()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  sub_category: Array<number>;

  @ValidateIf((o) => o.end_date)
  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(IsBeforeConstraint, ['end_date'])
  start_date: Date;

  @IsOptional()
  @Validate(checkDateFormat)
  @Validate(checkMaxDate)
  end_date: Date;

  // chat listing is task oriented that's why all dto data depending on task
}
