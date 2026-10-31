import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ExpenseUser } from '../expense-user/expense-user.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  phone: string;

  @OneToMany(() => ExpenseUser, (expenseUser) => expenseUser.user)
  expenseUsers?: ExpenseUser[];
}
