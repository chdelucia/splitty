import { InputType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@InputType()
export class CreateExpenseInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  date: string;

  @Field()
  cost: number;

  @Field()
  originalCost: number;

  @Field()
  paidBy: string;

  @Field()
  typeId: string;

  @Field(() => [ID])
  sharedBy: string[];

  @Field(() => [ID])
  settleBy: User[];
}
