import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';

import { Field, InputType } from '@nestjs/graphql';
import { User } from './user.schema';

@InputType()
export class UserInput {
  @Field()
  uid: string;
}

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return await this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return await this.userService.save(input);
  }
}
