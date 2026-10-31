import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('phone') phone: string,
  ): Promise<User> {
    return this.usersService.create({ name, phone });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('phone', { nullable: true }) phone?: string,
  ): Promise<User> {
    return this.usersService.update(id, { name, phone });
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    await this.usersService.delete(id);
    return user;
  }
}
