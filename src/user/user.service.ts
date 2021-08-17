import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialService } from 'src/credential/credential.service';
import { errors } from '../errors';
import { User } from './user.schema';
import { AddUserInput } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly credentialService: CredentialService,
  ) {}

  async findById(uid: string): Promise<User> {
    const user = await this.userModel.findOne({ uid });
    console.log(user);
    if (!user) {
      throw new NotFoundException(errors.user.accountNotFound);
    }
    return user;
  }

  /**
   * Find a user using the provided {@link email}
   *
   * @param email the user's email address
   * @param validate if true, throw error if the user does not exist
   */
  async findByEmail(email: string, validate = true): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (validate && !user) {
      throw new NotFoundException(errors.user.accountNotFound);
    }
    return user;
  }

  /**
   * Add a user to the database.
   *
   * @param userInput an object containing the user's information
   */
  async addUser(userInput: AddUserInput): Promise<User> {
    // Find a user with the same email
    const currentUser = await this.findByEmail(userInput.email, false);

    // Throw error if the user already exists
    if (currentUser) {
      throw new ConflictException(errors.user.alreadyCreated);
    }

    // Save and return the user information
    const savedUser = await new this.userModel(userInput).save();
    await this.credentialService.save(savedUser._id, userInput.password);
    return savedUser;
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    const isValid = await this.credentialService.validate(user._id, password);
    return isValid ? user : null;
  }
}
