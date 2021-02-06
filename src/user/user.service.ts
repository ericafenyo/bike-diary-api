import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInput } from './user.resolver';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(uid: string): Promise<User> {
    const user = await this.userModel.findOne({ uid });
    console.log(user);
    if (!user) {
      throw new NotFoundException(
        'The user has no account. Create one and try again',
      );
    }
    return user;
  }

  async save(input: UserInput): Promise<User> {
    return await new this.userModel(input).save();
  }
}
