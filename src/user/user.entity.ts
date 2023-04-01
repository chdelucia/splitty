import { Expense } from 'src/expenses/expense.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @ManyToMany(() => Expense, (expense) => expense.sharedBy)
  expenses: Expense[];
}
