import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseUserService } from '../expense-user/expense-user.service';
import { CreateExpenseInput } from './dto/create-expense.input';

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly expenseUserService: ExpenseUserService,
  ) {}

  @Query(() => [Expense])
  async expenses(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Query(() => Expense)
  async expense(@Args('id', { type: () => ID }) id: string): Promise<Expense> {
    return this.expenseService.findOne(id);
  }

  @Mutation(() => Expense)
  async createExpense(
    @Args('createExpenseInput') createExpenseInput: CreateExpenseInput,
  ): Promise<Expense> {
    const expense = await this.expenseService.create(createExpenseInput);
    if (createExpenseInput.sharedBy && createExpenseInput.sharedBy.length > 0) {
      await this.expenseUserService.createExpenseUsers(
        expense.id,
        createExpenseInput.sharedBy,
      );
    }
    return this.expenseService.findOne(expense.id);
  }

  @Mutation(() => Expense)
  async deleteExpense(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Expense> {
    const expense = await this.expenseService.findOne(id);
    await this.expenseService.delete(id);
    return expense;
  }
}
