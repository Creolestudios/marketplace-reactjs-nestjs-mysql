import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class ReportHistoryDto extends PaginationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id: number;
}
