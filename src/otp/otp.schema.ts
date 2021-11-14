import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UseType {
  ACCOUNT_VERIFICATION = 'verify_account',
  PASSWORD_RENEWALS = 'forget_password',
}

@Schema()
export class OPT extends Document {
  @Prop()
  token: string;

  @Prop()
  email: string;

  @Prop()
  expiry: number;

  @Prop()
  isVerified: boolean;

  @Prop()
  requestId: string;

  @Prop({
    enum: [UseType.ACCOUNT_VERIFICATION, UseType.PASSWORD_RENEWALS],
    required: true,
  })
  type: string;
}

export const OtpSchema = SchemaFactory.createForClass(OPT);
