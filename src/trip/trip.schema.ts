import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Trip extends Document {
  @Prop()
  @Field()
  document: string;

  @Prop({ default: Date.now })
  @Field()
  createdAt: Date;

  @Prop()
  user: Types.ObjectId;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
