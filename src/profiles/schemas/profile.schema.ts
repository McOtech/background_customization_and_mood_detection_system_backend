import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({
    required: true,
    unique: true,
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId: string;

  @Prop({
    required: true,
    lowercase: true,
    maxlength: 30,
    trim: true,
    validate: { validator: (v) => /[a-zA-Z]/.test(v) },
  })
  name: string;

  @Prop({ required: true, trim: true, unique: true, lowercase: true })
  email: string;

  // @Prop({
  //   required: true,
  //   lowercase: true,
  //   maxlength: 6,
  //   minlength: 4,
  //   trim: true,
  //   enum: sex,
  //   default: sex.male,
  // })
  // gender: number;

  // @Prop({
  //   required: true,
  //   validate: { validator: (v) => /[+0-9]/.test(v) },
  //   maxlength: 20,
  //   trim: true,
  // })
  // phone: string;

  // @Prop({
  //   required: true,
  //   validate: { validator: (v) => /[0-9]/.test(v) },
  //   maxlength: 10,
  //   trim: true,
  // })
  // postal_address: string;

  // @Prop({
  //   required: true,
  //   validate: { validator: (v) => /[0-9]/.test(v) },
  //   maxlength: 10,
  //   trim: true,
  // })
  // postal_code: string;

  // @Prop({
  //   required: true,
  //   lowercase: true,
  //   trim: true,
  //   maxlength: 100,
  //   validate: { validator: (v) => /[a-zA-Z ]/.test(v) },
  // })
  // county: string;

  // @Prop({
  //   required: true,
  //   lowercase: true,
  //   trim: true,
  //   maxlength: 100,
  //   validate: { validator: (v) => /[a-zA-Z ]/.test(v) },
  // })
  // town: string;

  // @Prop({
  //   required: true,
  //   trim: true,
  //   maxlength: 4,
  //   validate: { validator: (v) => /[0-9]/.test(v) },
  // })
  // year_of_birth: number;

  // @Prop({
  //   required: true,
  //   trim: true,
  //   default: filePaths.profile().avatar,
  // })
  // image_url: string;

  @Prop({ required: true, default: Date.now().valueOf() })
  updated_at: number;

  @Prop({ default: Date.now().valueOf() })
  created_at: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
