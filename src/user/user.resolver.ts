import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('user') user: User) {
    return await this.usersService.update(id, user);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return await this.usersService.delete(id);
  }
}
