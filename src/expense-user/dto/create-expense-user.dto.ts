import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseUserDto {
  @ApiProperty({ example: 'expense-uuid-1', description: 'ID of the expense' })
  @IsString()
  @IsNotEmpty()
  expenseId: string;

  @ApiProperty({ example: 'user-uuid-1', description: 'ID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateExpenseUserDto {
  @ApiProperty({ example: 'expense-uuid-1', required: false })
  @IsString()
  @IsOptional()
  expenseId?: string;

  @ApiProperty({ example: 'user-uuid-1', required: false })
  @IsString()
  @IsOptional()
  userId?: string;
}
