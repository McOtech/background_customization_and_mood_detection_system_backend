import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    immutable: true,
    trim: true,
    validate: { validator: (v) => /[a-zA-Z]/.test(v) },
  })
  username: string;

  // @Prop({ required: true, trim: true, unique: true, lowercase: true })
  // email: string;

  // @Prop({
  //   required: true,
  //   trim: true,
  //   lowercase: true,
  //   enum: userTypes,
  //   default: userType.client,
  // })
  // type: string;

  // @Prop({ required: true, default: false })
  // isVerified: boolean;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, default: Date.now().valueOf() })
  updated_at: number;

  @Prop({ default: Date.now().valueOf() })
  created_at: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
