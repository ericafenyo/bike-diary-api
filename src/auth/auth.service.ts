import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthenticatedUser } from './auth.decorator';
import speakeasy = require('speakeasy');

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

    const payload = { email: user.email };

    const crypto = await import('crypto');
    const signature = crypto.randomBytes(32).toString('hex');

    const refreshTokenOptions = {
      subject: `auth|${user.id}`,
      signature: signature,
    };

    return {
      accessToken: this.jwtService.sign(payload, jwtOptions),
      refreshToken: signature,
    };
  }

  async generateOneTimeUseCode(email: string) {
    const secret = process.env.OTP_SECRETE;
    // const secret = speakeasy.generateSecret();

    const token = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
    });

    const isValid = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: 98765,
    });

    console.log(isValid);

    // const currentUser = await this.userService.findByEmail(email, false);
  }
}
