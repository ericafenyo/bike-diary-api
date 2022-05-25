import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AdventureModule } from './adventure/adventure.module';
import { AuthModule } from './auth/auth.module';
import { CredentialModule } from './credential/credential.module';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      driver: ApolloDriver,
      playground: true,
    }),
    UserModule,
    AdventureModule,
    AuthModule,
    CredentialModule,
    MailModule,
    OtpModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
