import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Dinner with friends', description: 'Expense title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '2026-10-31', description: 'Expense date' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 50.0, description: 'Expense cost' })
  @IsNumber()
  @IsPositive()
  cost: number;

  @ApiProperty({ example: 50.0, description: 'Original cost before splits' })
  @IsNumber()
  @IsPositive()
  originalCost: number;

  @ApiProperty({ example: 'user-uuid-1', description: 'User ID of who paid' })
  @IsString()
  @IsNotEmpty()
  paidBy: string;

  @ApiProperty({ example: 'food', description: 'Type/category identifier' })
  @IsString()
  @IsNotEmpty()
  typeId: string;

  @ApiProperty({
    example: ['user-uuid-1', 'user-uuid-2'],
    description: 'User IDs sharing the expense',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  sharedBy: string[];
}

export class UpdateExpenseDto {
  @ApiProperty({ example: 'Dinner with friends', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: '2026-10-31', required: false })
  @IsString()
  @IsOptional()
  date?: string;

  @ApiProperty({ example: 50.0, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  cost?: number;

  @ApiProperty({ example: 50.0, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  originalCost?: number;

  @ApiProperty({ example: 'user-uuid-1', required: false })
  @IsString()
  @IsOptional()
  paidBy?: string;

  @ApiProperty({ example: 'food', required: false })
  @IsString()
  @IsOptional()
  typeId?: string;

  @ApiProperty({
    example: ['user-uuid-1', 'user-uuid-2'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sharedBy?: string[];
}
