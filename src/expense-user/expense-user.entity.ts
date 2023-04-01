import { Expense } from 'src/expenses/expense.entity';
import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseUser {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Expense, (expense) => expense.sharedBy, {
    onDelete: 'CASCADE',
  })
  expenseId: string;

  @ManyToOne(() => User, (user) => user.expenses, { onDelete: 'CASCADE' })
  userId: string;
}
