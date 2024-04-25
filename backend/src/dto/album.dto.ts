import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  ValidateIf,
  ArrayMinSize,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsArray,
  Validate,
  IsOptional,
} from 'class-validator';
import { ErrorMessage } from 'src/utils/constant';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  album_name: string;

  @IsNumber()
  @IsNotEmpty()
  category: number;

  @IsNumber()
  @IsNotEmpty()
  sub_category: number;

  @IsNumber()
  sub_category_type: number;

  @ValidateIf((value) => value.sub_category_type === 1)
  @IsString()
  @IsNotEmpty()
  other_sub_category: string;
}

export class TypeServiceObj {
  @IsOptional()
  @IsNumber()
  service_id: number;

  @ValidateIf((o) => !o.service_id) // New Service
  @IsNotEmpty()
  @IsString()
  service_name: string;

  @ValidateIf((o) => !o.service_id) // New Service
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  estimate_price: number;
}

export class AddTypeOfServiceObj {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  sub_category: number;

  @IsNotEmpty()
  @IsString()
  service_name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  estimate_price: number;
}

@ValidatorConstraint()
class IsServiceArray implements ValidatorConstraintInterface {
  public async validate(
    serviceData: TypeServiceObj[],
    args: ValidationArguments,
  ) {
    return (
      Array.isArray(serviceData) &&
      serviceData.reduce(
        (a, b) =>
          a && typeof b.service_id === 'number' && b.service_name
            ? typeof b.service_name === 'string'
            : true && b.estimate_price
            ? typeof b.estimate_price === 'number'
            : true,
        true,
      )
    );
  }
}

@ValidatorConstraint()
class IsAddTypeOfServiceArray implements ValidatorConstraintInterface {
  public async validate(
    serviceData: AddTypeOfServiceObj[],
    args: ValidationArguments,
  ) {
    return (
      Array.isArray(serviceData) &&
      serviceData.reduce(
        (a, b) =>
          a &&
          typeof b.category === 'number' &&
          typeof b.sub_category === 'number' &&
          typeof b.service_name === 'string' &&
          typeof b.estimate_price === 'number',
        true,
      )
    );
  }
}

export class TypeServiceDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsServiceArray, {
    message: ErrorMessage.invalid_service_object,
  })
  service_object: TypeServiceObj[];
}

export class UserAlbumMediaDto {
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_album_id: number;

  @IsOptional()
  @IsString()
  description: string;
}

export class AddTypeOfserviceDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsAddTypeOfServiceArray, {
    message: ErrorMessage.invalid_add_type_service_object,
  })
  service_object: AddTypeOfServiceObj[];
}

export class AddSubCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsNumber()
  sub_category: number;

  @ValidateIf((value) => value.sub_category == 2)
  @IsNotEmpty()
  @IsString()
  other_sub_category: string;
}

export class serviceDto {
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsNumber()
  sub_category: number;
}

export class AlbumDeletedDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  album_id: Array<number>;
}
