import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.entity";

@Schema()
export class Credential extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, unique: true })
  userId: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);
