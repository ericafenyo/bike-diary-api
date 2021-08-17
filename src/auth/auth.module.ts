import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';

const secret = process.env.JWT_SECRET;
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({ secret }),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
