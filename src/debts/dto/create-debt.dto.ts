import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebtDto {
  @ApiProperty({ example: 25.5, description: 'Amount of the debt' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 'user-uuid-1', description: 'Creditor user ID' })
  @IsString()
  @IsNotEmpty()
  creditorId: string;

  @ApiProperty({ example: 'user-uuid-2', description: 'Debtor user ID' })
  @IsString()
  @IsNotEmpty()
  debtorId: string;
}

export class UpdateDebtDto {
  @ApiProperty({ example: 25.5, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: number;

  @ApiProperty({ example: 'user-uuid-1', required: false })
  @IsString()
  @IsOptional()
  creditorId?: string;

  @ApiProperty({ example: 'user-uuid-2', required: false })
  @IsString()
  @IsOptional()
  debtorId?: string;
}
