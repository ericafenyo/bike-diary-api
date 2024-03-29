import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

export class Location {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  altitude: number;

  @Prop()
  time: number;

  @Prop()
  speed: number;

  @Prop()
  accuracy: number;

  @Prop()
  bearing: number;
}
export class Trace {
  @Prop()
  timezone: string;

  @Prop()
  writeTime: Date;

  @Prop()
  location: Location;
}

@Schema()
export class Adventure extends Document {
  @Prop({ unique: true })
  uuid: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  altitude: number;

  @Prop()
  calories: number;

  @Prop()
  distance: number;

  @Prop()
  duration: number;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  speed: number;

  @Prop()
  polyline: string;

  @Prop()
  image: String;

  @Prop()
  traces: Trace[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: () => User })
  userId: Types.ObjectId;
}

export const AdventureSchema = SchemaFactory.createForClass(Adventure);
