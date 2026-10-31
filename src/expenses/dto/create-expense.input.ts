import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsArray,
} from 'class-validator';

@InputType()
export class CreateExpenseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  date: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  cost: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  originalCost: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  paidBy: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  typeId: string;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsString({ each: true })
  sharedBy: string[];
}
