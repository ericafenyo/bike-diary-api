import { Injectable, Logger } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import speakeasy = require("speakeasy");
import { randomBytes } from "crypto";
import { RefreshToken } from "./refresh-token.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserIdentity } from "./auth.types";

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

  async validateUser(email: string, password: string): Promise<UserIdentity | null> {
    return await this.userService.validate(email, password);
  }

  async validateUserWithEmail(email: string): Promise<UserIdentity | null> {
    const user = await this.userService.findByEmail(email, false);
    return user ? { id: user.uuid, email: user.email } : null;
  }

  /**
   * Generates Json Web Tokens.
   *
   * @param {UserIdentity} user a metadata of the authenticated user.
   *
   * @returns a {@link JWTokens} object.
   */
  async getToken(user: UserIdentity): Promise<JWTokens> {
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async generateAccessToken(user: UserIdentity): Promise<string> {
    const payload = { email: user.email };
    const options: JwtSignOptions = {
      audience: process.env.JWT_AUDIENCE,
      expiresIn: 86400,
      subject: `auth|${user.id}`,
      secret: process.env.JWT_SECRET,
    };
    return this.jwtService.sign(payload, options);
  }

  async generateRefreshToken(user: UserIdentity): Promise<string> {
    const token = randomBytes(64).toString("base64url");

    const refreshToken = new this.model({
      value: token,
      userId: user.id,
    });

    const previousToken = await this.model.findOne({
      userId: user.id,
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
      encoding: "base32",
    });

    const isValid = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: 98765,
    });

    // const currentUser = await this.userService.findByEmail(email, false);
  }
}
