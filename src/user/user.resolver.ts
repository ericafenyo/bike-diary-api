import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';
import { CreateUserInput, UserType } from './user.types';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  async getUser(): Promise<string> {
    return '';
  }

  @Mutation(() => UserType, { name: 'createUser' })
  async createUser(@Args('user') user: CreateUserInput): Promise<User> {
    return await this.userService.createUser(user);
  }
}
