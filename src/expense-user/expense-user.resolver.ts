import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ExpenseUserService } from './expense-user.service';
import { ExpenseUser } from './expense-user.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Resolver(() => ExpenseUser)
export class ExpenseUserResolver {
  constructor(
    private readonly expenseUserService: ExpenseUserService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [ExpenseUser])
  async expensesUsers(): Promise<ExpenseUser[]> {
    return this.expenseUserService.findAll();
  }

  @Query(() => ExpenseUser)
  async expenseUser(@Args('id') id: number): Promise<ExpenseUser> {
    return await this.expenseUserService.findOne(id);
  }

  @Mutation(() => ExpenseUser)
  async createExpenseUser(
    @Args('input') input: ExpenseUser,
  ): Promise<ExpenseUser> {
    return this.expenseUserService.create(input);
  }

  @ResolveField(() => User)
  async participant(@Parent() expenseUser: ExpenseUser): Promise<User> {
    const { userId } = expenseUser;
    return this.userService.findOne(userId);
  }
}
