import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { last, size } from 'lodash';
import { transformAndValidate } from 'class-transformer-validator';
import { ErrorMessage } from 'src/utils/constant';
import { MarkChatReadDto } from 'src/dto/user.dto';

export class FileArrayObj {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  fileMime: string;

  @IsNotEmpty()
  fileBuffer: ArrayBuffer | SharedArrayBuffer;
}

@ValidatorConstraint()
export class IsFileArray implements ValidatorConstraintInterface {
  public async validate(fileData: FileArrayObj[], args: ValidationArguments) {
    return (
      Array.isArray(fileData) &&
      fileData.reduce(
        (a, b) =>
          a &&
          size(b) === 3 &&
          typeof b.fileName === 'string' &&
          typeof b.fileMime === 'string' &&
          typeof b.fileBuffer === 'object',
        true,
      )
    );
  }
}

class ChatMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  task_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  receiver_id: number;

  @ValidateIf((o) => !o.files || (o.files && o.files.length === 0))
  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  room_id: number;

  @IsOptional()
  @IsArray()
  @Validate(IsFileArray, {
    message: ErrorMessage.invalid_file_object,
  })
  files: FileArrayObj[];
}

interface ChatValidationMessage {
  valid: boolean;
  error?: {
    property: string;
    message: string;
  };
}

export const validateChatMessage = async (
  object: any,
): Promise<ChatValidationMessage> => {
  try {
    await transformAndValidate(ChatMessageDto, object);
    return {
      valid: true,
      error: null,
    };
  } catch (err) {
    const errorData = err[0];
    return {
      valid: false,
      error: {
        property: errorData.property,
        message: last(Object.values(errorData.constraints)),
      },
    };
  }
};

export const validateChatReadMessage = async (
  object: any,
): Promise<ChatValidationMessage> => {
  try {
    await transformAndValidate(MarkChatReadDto, object);
    return {
      valid: true,
      error: null,
    };
  } catch (err) {
    const errorData = err[0];
    return {
      valid: false,
      error: {
        property: errorData.property,
        message: last(Object.values(errorData.constraints)),
      },
    };
  }
};
