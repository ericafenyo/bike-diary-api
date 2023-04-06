import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { isEmail } from "class-validator";
import { errors } from "../errors";
import { User } from "./user.schema";
import { User as UserEntity } from "./user.entity";
import { CredentialService } from "../credential/credential.service";
import { MailService } from "../mail/mail.service";
import { OtpService } from "src/otp/otp.service";
import speakeasy = require("speakeasy");
import { CreateUserInput } from "./user.types";
import { v4 as uuid } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private readonly credentialService: CredentialService,
    private readonly optService: OtpService,
    private readonly mailService: MailService,
  ) {}

  async findById(id: string, validate: boolean = true): Promise<User> {
    const user = await this.userModel.findOne({ id });

    if (validate) {
      if (!user) {
        throw new NotFoundException(errors.user.accountNotFound);
      }
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
   * @param user an object containing the user's information
   */
  async createUser(user: CreateUserInput): Promise<User> {
    // Checks if th email address is valid
    if (!isEmail(user.email)) {
      throw new BadRequestException(errors.validation.invalidEmail);
    }

    // Find a user with the same email
    const currentUser = await this.findByEmail(user.email, false);

    // Throw error if the user already exists
    if (currentUser) {
      throw new ConflictException(errors.user.alreadyCreated);
    }

    new this.userEntity.create({})

    // Check if the user has an any opt verification
    // const currentOpt = await this.optService.findByEmail(email);

    // if (currentOpt) {
    //   // User has at least one otp verification
    //   //Get access to one in progress
    // }

    // this.mailService.sendAccountVerificationCode(email, {});
    // Validate the email

    // const secret = speakeasy.generateSecret();

    // var token = speakeasy.totp({
    //   secret: secret.base32,
    //   encoding: 'base32',
    // });

    // var tokenValidates = speakeasy.totp.verify({
    //   secret: secret.base32,
    //   encoding: 'base32',
    //   token: token,
    // });

    // console.log(secret);

    // Save and return the user information

    const userinfo = new this.userModel();

    // const savedUser = await this.userModel.create({ ...user, uuid: uuid() });
    // await this.credentialService.save(savedUser.id, user.password);
    // return savedUser;

    return userinfo;
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    const isValid = await this.credentialService.validate(user._id, password);
    return isValid ? user : null;
  }
}
