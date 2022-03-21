import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthenticatedUser } from './auth.decorator';
import speakeasy = require('speakeasy');
import { randomBytes } from 'crypto';
import { RefreshToken } from './refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

export interface JWTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name) private model: Model<RefreshToken>,
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
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async generateAccessToken(user: AuthenticatedUser): Promise<string> {
    const payload = { email: user.email };
    const options: JwtSignOptions = {
      audience: process.env.JWT_AUDIENCE,
      expiresIn: 86400,
      subject: `auth|${user.id}`,
      secret: process.env.JWT_SECRET,
    };
    return this.jwtService.sign(payload, options);
  }

  async generateRefreshToken(user: AuthenticatedUser): Promise<string> {
    const token = randomBytes(64).toString('base64url');

    const refreshToken = new this.model({
      value: token,
      userId: Types.ObjectId(user.id),
    });

    const previousToken = await this.model.findOne({
      userId: Types.ObjectId(user.id),
      revokedAt: null,
    });

    if (previousToken) {
      refreshToken.previousTokenId = previousToken._id;
      previousToken.revokedAt = new Date();
      await previousToken.save();
    }

    await refreshToken.save();
    return refreshToken.value;
  }

  async generateOneTimeUseCode(email: string) {
    const secret = process.env.OTP_SECRETE;

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
