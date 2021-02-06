import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

export const AccountStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DEACTIVATED: 'DEACTIVATED',
};

@ObjectType()
@Schema()
export class User extends Document {
  @Prop()
  @Field()
  uid: string;

  @Prop({
    enum: [
      AccountStatus.ACTIVE,
      AccountStatus.DEACTIVATED,
      AccountStatus.SUSPENDED,
    ],

    default: AccountStatus.ACTIVE,
  })
  @Field()
  status: string;

  @Prop({ default: Date.now })
  @Field()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
