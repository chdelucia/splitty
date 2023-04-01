/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Parent, ResolveField } from '@nestjs/graphql/dist/decorators';
import { ExpenseUser } from 'src/expense-user/expense-user.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateExpenseInput } from './dto/create-expense.input';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly userService: UserService
    ) {}

  @Query(() => [Expense])
  async expenses(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Mutation(() => Expense)
  async createExpense(@Args('createExpenseInput') createExpenseInput: CreateExpenseInput): Promise<Expense> {
    return this.expenseService.create(createExpenseInput);
  }

  @Query(() => Expense)
  async expense(@Args('id') id: string) {
    return await this.expenseService.findOne(id);
  }

  @Mutation(() => Expense)
  async updateExpense(@Args('id') id: string, @Args('expense') expense: Expense) {
    return await this.expenseService.update(id, expense);
  }

  @Mutation(() => Expense)
  async deleteExpense(@Args('id') id: string) {
    return await this.expenseService.delete(id);
  }
  
  @ResolveField(() => User)
  async participant(@Parent() expenseUser: ExpenseUser): Promise<User> {
    const user  = expenseUser.userId;
    return this.userService.findOne(user);
  }
}
