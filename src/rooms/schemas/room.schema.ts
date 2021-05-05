import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Profile } from 'src/profiles/schemas/profile.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({
    required: true,
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Profile.name,
  })
  profileId: string;

  @Prop({
    required: true,
    lowercase: true,
    maxlength: 100,
    trim: true,
    validate: { validator: (v) => /[a-zA-Z0-9]/.test(v) },
  })
  title: string;

  @Prop({
    required: true,
  })
  dueDate: number;

  // @Prop({
  //   required: true,
  //   lowercase: true,
  //   maxlength: 20,
  //   trim: true,
  //   unique: true,
  //   validate: { validator: (v) => /[a-zA-Z0-9]/.test(v) },
  // })
  // name: string;

  // @Prop({
  //   required: true,
  //   maxlength: 255,
  //   trim: true,
  //   validate: { validator: (v) => /[a-zA-Z0-9 ]/.test(v) },
  // })
  // summary: string;

  // @Prop({
  //   required: true,
  //   trim: true,
  // })
  // description: string;

  // @Prop({
  //   required: true,
  //   validate: { validator: (v) => /[0-9a-zA-Z/:.]/.test(v) },
  //   trim: true,
  // })
  // banner_url: string;

  // @Prop({
  //   required: true,
  //   validate: { validator: (v) => /[0-9a-zA-Z/:.]/.test(v) },
  //   trim: true,
  // })
  // logo_url: string;

  // @Prop({
  //   required: true,
  //   validate: { validator: (v) => /[0-9.]/.test(v) },
  //   trim: true,
  // })
  // lat: number;

  // @Prop({
  //   required: true,
  //   validate: { validator: (v) => /[0-9.]/.test(v) },
  //   trim: true,
  // })
  // lon: number;

  // @Prop({
  //   required: true,
  //   enum: visibility,
  //   default: visibility.private,
  //   trim: true,
  // })
  // visibility: number;

  @Prop({ required: true, default: Date.now().valueOf() })
  updated_at: number;

  @Prop({ default: Date.now().valueOf() })
  created_at: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
