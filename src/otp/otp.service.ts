import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OPT } from './otp.schema';

@Injectable()
export class OtpService {
  constructor(@InjectModel(OPT.name) private model: Model<OPT>) {}

  async findByEmail(email: string) {
    return await this.model.findOne({ email });
  }
}
