import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';
import { DtoErrorMessage, ErrorMessage } from 'src/utils/constant';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return propertyValue < args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be before of ${args.constraints[0]}`;
  }
}

@ValidatorConstraint({ name: 'isAfter', async: false })
export class IsAfterConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    const currentTime = moment().format('YYYY-MM-DD');
    const givenTime = moment(propertyValue).format('YYYY-MM-DD');
    return moment(givenTime).isAfter(currentTime);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be greater than Current Date`;
  }
}
@ValidatorConstraint({ name: 'checkDate', async: false })
export class checkDateFormat implements ValidatorConstraintInterface {
  // it is used to check date format and validation for date : YYYY-MM-DD
  validate(value: string, args: ValidationArguments) {
    return (
      /^[1-9]\d*-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value) &&
      moment(value, 'YYYY-MM-DD').isValid()
    );
  }

  defaultMessage(args: ValidationArguments) {
    // args.property represent the input value / the value being passed
    return `${args.property} must be a valid date (Required format: YYYY-MM-DD)`;
  }
}

@ValidatorConstraint({ name: 'checkAge', async: false })
export class checkAge implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const years = moment().diff(value, 'years', true);
    const minAge = years >= 13 ? true : false;
    return minAge;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} ${ErrorMessage.invalid_age}`;
  }
}

@ValidatorConstraint({ name: 'checkMaxDate', async: false })
export class checkMaxDate implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    // max date indicates that end date must be today
    const now = moment(value).format('YYYY-MM-DD');
    const diff = moment().diff(now, 'days');
    return diff >= 0 ? true : false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} ${DtoErrorMessage.max_date}`;
  }
}

@ValidatorConstraint({ name: 'oneMonth', async: false })
export class OneMonthConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    // this check for the validation of dates duration must be less than or equals to 31
    const startTime = moment(args.object[args.constraints[0]]).format(
      'YYYY-MM-DD',
    );
    const endTime = moment(propertyValue).format('YYYY-MM-DD');
    return moment(startTime).diff(endTime, 'days') <= 31;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be less than or equals to 31 days compared to end_date`;
  }
}
