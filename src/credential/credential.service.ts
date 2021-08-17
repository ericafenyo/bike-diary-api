import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Credential } from './credential.schema';
import { Model } from 'mongoose';
import bcrypt = require('bcrypt');

@Injectable()
export class CredentialService {
  constructor(@InjectModel(Credential.name) private model: Model<Credential>) {}

  async save(userId: string, password: string): Promise<void> {
    const hashedPassword = await this.hash(password);
    await new this.model({ userId: userId, password: hashedPassword }).save();
  }

  private async hash(password: string) {
    const saltRounds = 14;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Returns true if the {@link candidate} password matches the hashed one.
   *
   * @param candidate the password to be verified
   * @param hashed the existing password hash
   */
  private async isValid(candidate: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(candidate, hashed);
  }

  async validate(userId: string, candidate: string): Promise<boolean> {
    const credentials = await this.model.findOne({ userId });

    if (!credentials) {
      return false;
    }

    console.log('Body', credentials, userId);
    return await this.isValid(candidate, credentials.password);
  }
}
