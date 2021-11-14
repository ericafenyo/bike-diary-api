import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OtpService } from './otp.service';
import { OptArgs, OptType } from './otp.types';

@Resolver()
export class OtpResolver {
  constructor(private readonly optService: OtpService) {}
}
