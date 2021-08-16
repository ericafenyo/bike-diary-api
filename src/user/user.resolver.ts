import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';
import { UserType, AddUserInput } from './user.types';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  async getUser(): Promise<string> {
    return '';
  }

  @Mutation(() => UserType, { name: 'user' })
  async addUser(@Args('user') user: AddUserInput): Promise<User> {
    return await this.userService.addUser(user);
  }
}
