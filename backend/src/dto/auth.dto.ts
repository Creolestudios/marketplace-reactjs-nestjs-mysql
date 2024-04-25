import {
  IsNotEmpty,
  IsEmail,
  MaxLength,
  IsString,
  Matches,
  IsEnum,
  IsOptional,
  IsIn,
  ValidateIf,
  Validate,
} from 'class-validator';
import { DtoErrorMessage, ErrorMessage } from 'src/utils/constant';
import { UserWorkAs } from 'src/utils/enums';
import { checkAge, checkDateFormat } from './dateValidator.dto';

export class SignUpUserDto {
  @IsNotEmpty()
  @MaxLength(50, {
    message: DtoErrorMessage.full_name,
  })
  full_name: string;

  @IsNotEmpty()
  @Validate(checkDateFormat)
  @Validate(checkAge)
  birth_date: Date;

  @IsNotEmpty()
  @IsEmail({}, { message: ErrorMessage.invalid_email })
  email: string;

  @IsNotEmpty()
  @IsIn([0, 1])
  nemid_verified: number;

  @ValidateIf((o) => o.nemid_verified === 1)
  @IsNotEmpty()
  @IsString()
  sub_nemid: string;

  @IsNotEmpty()
  @IsEnum(UserWorkAs, {
    message: DtoErrorMessage.work_as,
  })
  work_as: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message: DtoErrorMessage.password,
  })
  password: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message: DtoErrorMessage.confirm_password,
  })
  confirm_password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: ErrorMessage.invalid_email })
  email: string;

  @IsNotEmpty()
  @IsString({ message: ErrorMessage.invalid_password })
  password: string;
}

export class GuestLoginDto {
  @IsNotEmpty()
  @IsString()
  unique_id: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail({}, { message: ErrorMessage.invalid_email })
  email: string;
}

export class VerifyUserDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class ResendVerificationLinkDto {
  @IsNotEmpty()
  @IsEmail({}, { message: ErrorMessage.invalid_email })
  email: string;
}

export class ForgotPasswordChangeDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message: DtoErrorMessage.new_password,
  })
  new_password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message: DtoErrorMessage.new_confirm_password,
  })
  new_confirm_password: string;
}

export class ChangePasswordDto extends ForgotPasswordChangeDto {
  @IsNotEmpty()
  @IsString()
  current_password: string;
}

export class NemIDUpdateDto {
  @IsNotEmpty()
  @IsString()
  sub_nemid: string;
}
