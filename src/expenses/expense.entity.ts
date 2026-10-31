import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ExpenseUser } from '../expense-user/expense-user.entity';

@ObjectType()
@Entity()
export class Expense {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  date: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, name: 'original_cost' })
  originalCost: number;

  @Field()
  @Column({ name: 'paid_by' })
  paidBy: string;

  @Field()
  @Column({ name: 'type_id' })
  typeId: string;

  @OneToMany(() => ExpenseUser, (expenseUser) => expenseUser.expense)
  expenseUsers?: ExpenseUser[];
}
