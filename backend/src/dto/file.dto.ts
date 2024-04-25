import { IsNotEmpty, IsOptional } from 'class-validator';

export class FileNameDto {
  @IsOptional()
  originalname?: string;

  @IsNotEmpty()
  filename: string;

  @IsOptional()
  mimetype: string;

  @IsOptional()
  size?: number;
}
