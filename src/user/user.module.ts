import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailModule } from "../mail/mail.module";
import { CredentialModule } from "../credential/credential.module";
import { UserResolver } from "./user.resolver";
import { User, UserSchema } from "./user.schema";
import { User as UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { OtpModule } from "src/otp/otp.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([UserEntity]),
    CredentialModule,
    MailModule,
    OtpModule,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
