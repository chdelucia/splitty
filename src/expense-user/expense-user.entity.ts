import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expense } from '../expenses/expense.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class ExpenseUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  expenseId: string;

  @Field()
  @Column()
  userId: string;

  @ManyToOne(() => Expense, (expense) => expense.expenseUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'expenseId' })
  expense?: Expense;

  @ManyToOne(() => User, (user) => user.expenseUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;
}
