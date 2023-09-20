import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AuthenticatedUser, CurrentUser } from "src/auth/auth.decorator";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { UserService } from "./user.service";
import { CreateUserInput, UserType } from "./user.types";
import { User } from "./user.entity";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType, { name: "user" })
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: AuthenticatedUser): Promise<UserType> {
    return await this.userService.getUser(user);
  }

  @Mutation(() => UserType, { name: "createUser" })
  async createUser(@Args("user") user: CreateUserInput): Promise<User> {
    return await this.userService.createUser(user);
  }
}
