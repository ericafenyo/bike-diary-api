import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthenticatedUser } from './auth.decorator';

export interface JWTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.userService.validate(email, password);
    return user ? { id: user.id, email: user.email } : null;
  }

  /**
   * Generates Json Web Tokens.
   *
   * @param {AuthenticatedUser} user a metadata of the authenticated user.
   *
   * @returns a {@link JWTokens} object.
   */
  async getToken(user: AuthenticatedUser): Promise<JWTokens> {
    const jwtOptions: JwtSignOptions = {
      audience: process.env.JWT_AUDIENCE,
      expiresIn: 86400,
      subject: `auth|${user.id}`,
      secret: process.env.JWT_SECRET,
    };

    console.log(jwtOptions);

    const payload = { email: user.email };

    return {
      accessToken: this.jwtService.sign(payload, jwtOptions),
      refreshToken: '',
    };
  }
}
