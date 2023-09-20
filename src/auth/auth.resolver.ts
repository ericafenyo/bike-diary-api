import { UseGuards } from '@nestjs/common';
import { Resolver, Field, ObjectType, Mutation, Args } from '@nestjs/graphql';
import { OptType, OptArgs } from 'src/otp/otp.types';
import { CurrentUser, AuthenticatedUser } from './auth.decorator';
import { LocalAuthGuard } from './auth.guard';
import { AuthService, JWTokens } from './auth.service';

@ObjectType()
export class JWTokensType {
  @Field({ name: 'access_token' })
  accessToken: string;

  @Field({ name: 'refresh_token' })
  refreshToken: string;
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  /**
   * Takes the {@link user} information and returns JWT codes
   *
   * @param {AuthenticationArgs} login a GraphQL args with an email and a password
   * @param {AuthenticatedUser} user an {@link AuthenticatedUser} object
   */
  @UseGuards(new LocalAuthGuard())
  @Mutation(() => JWTokensType, { name: 'login' })
  async authenticateUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<JWTokens> {
    return await this.authService.getToken(user);
  }

  @Mutation(() => OptType)
  async sendVerificationCode(@Args() args: OptArgs): Promise<OptType> {
    await this.authService.generateOneTimeUseCode(args.email);

    return args;
  }
}
