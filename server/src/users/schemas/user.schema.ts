import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ require: true, select: false })
  password: string;

  @Prop({ require: true })
  street: string;

  @Prop({ require: true })
  city: string;

  @Prop({ require: true })
  state: string;

  @Prop({ require: true })
  postalCode: string;

  @Prop({ require: true })
  country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
