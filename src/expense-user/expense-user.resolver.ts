import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { ExpenseUserService } from './expense-user.service';
import { ExpenseUser } from './expense-user.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateExpenseUserDto } from './dto/create-expense-user.dto';

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
  async expenseUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ExpenseUser> {
    return this.expenseUserService.findOne(id);
  }

  @Mutation(() => ExpenseUser)
  async createExpenseUser(
    @Args('expenseId') expenseId: string,
    @Args('userId') userId: string,
  ): Promise<ExpenseUser> {
    const input: CreateExpenseUserDto = { expenseId, userId };
    return this.expenseUserService.create(input);
  }

  @ResolveField(() => User, { nullable: true })
  async participant(@Parent() expenseUser: ExpenseUser): Promise<User> {
    const { userId } = expenseUser;
    return this.userService.findOne(userId);
  }
}
