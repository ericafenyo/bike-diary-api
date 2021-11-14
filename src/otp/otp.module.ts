import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { OtpResolver } from './otp.resolver';
import { OPT, OtpSchema } from './otp.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: OPT.name, schema: OtpSchema }])],
  providers: [OtpService, OtpResolver],
  exports: [OtpService],
})
export class OtpModule {}
