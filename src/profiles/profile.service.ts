import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/interfaces/error.interface';
import { _Profile } from './interfaces/profile.interface';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async findAll(): Promise<_Profile[] | ErrorMessage> {
    try {
      return await this.profileModel.find();
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async findOne(id: string): Promise<_Profile | ErrorMessage> {
    try {
      return await this.profileModel.findOne({ _id: id });
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async findUserProfile(userId: string): Promise<_Profile> {
    try {
      const profilePayload = await this.profileModel.findOne({
        userId,
      });
      const profile: _Profile = profilePayload['_doc'];
      return profile;
    } catch (error) {
      return null;
    }
  }

  async create(user: _Profile): Promise<_Profile | ErrorMessage> {
    try {
      const newProfile = new this.profileModel(user);
      return await newProfile.save();
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async update(id: string, user: _Profile): Promise<_Profile | ErrorMessage> {
    try {
      return await this.profileModel.findByIdAndUpdate(
        id,
        { ...user, updated_at: Date.now().valueOf() },
        { new: true },
      );
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async delete(id: string): Promise<_Profile | ErrorMessage> {
    try {
      return await this.profileModel.findByIdAndRemove(id);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  // async uploadImage(
  //   id: string,
  //   path: string,
  // ): Promise<_Profile | ErrorMessage> {
  //   try {
  //     const profile: _Profile = await this.profileModel.findOne({ _id: id });
  //     unlink('public' + profile.image_url, () => {
  //       /**
  //     delete current image */
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     return await this.profileModel.findByIdAndUpdate(
  //       id,
  //       { image_url: path, updated_at: Date.now().valueOf() },
  //       { new: true },
  //     );
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }
}
