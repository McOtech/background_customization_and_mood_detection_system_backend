import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/interfaces/error.interface';
import {
  CreateUserInterface,
  UserInterface,
} from './interfaces/users.interface';
import { User, UserDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { _Profile } from 'src/profiles/interfaces/profile.interface';
import { ProfileService } from 'src/profiles/profile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly profileService: ProfileService,
  ) {}

  async findAll(): Promise<CreateUserInterface[] | ErrorMessage> {
    try {
      const users = await this.userModel.find();
      return users.map((payload) => {
        const { password, ...result } = payload['_doc'];
        return result;
      });
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async findOne(_id: string): Promise<CreateUserInterface | ErrorMessage> {
    try {
      const payload = await this.userModel.findOne({ _id });
      const { password, ...result } = payload['_doc'];
      return result;
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async findUser(username: string): Promise<UserInterface> {
    try {
      const payload = await this.userModel.findOne({
        username,
      });
      const user: CreateUserInterface = payload['_doc'];
      if (!!user) {
        const profile: _Profile = await this.profileService.findUserProfile(
          user._id,
        );
        return { ...user, profileId: profile?._id };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async create(
    user: CreateUserInterface,
  ): Promise<CreateUserInterface | ErrorMessage> {
    try {
      //Generate a hashed password.
      const plainPassword = user.password;
      const rounds = 15;
      const salt = await bcrypt.genSalt(rounds);
      const hash = await bcrypt.hash(plainPassword, salt);

      const newUser = new this.userModel({ ...user, password: hash });
      const payload = await newUser.save();
      const { password, ...result } = payload['_doc'];
      return result;
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  // async updateType(
  //   _id: string,
  //   payload: UpdateUserTypeInterface,
  // ): Promise<UserInterface | ErrorMessage> {
  //   try {
  //     // this.httpService.get(`/users/${id}`).subscribe((user: UserInterface) => {});
  //     const _user = await this.userModel.findOne({ _id });
  //     if (
  //       _user.password === payload.adminPassword &&
  //       _user.type === userType.admin
  //     ) {
  //       const dbPayload = await this.userModel.findByIdAndUpdate(
  //         payload.clientId,
  //         { type: payload.type, updated_at: Date.now().valueOf() },
  //         { new: true },
  //       );
  //       const { password, ...result } = dbPayload['_doc'];
  //       return result;
  //     } else {
  //       return { error: { message: 'Unauthorized request.' } };
  //     }
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  // async updateEmail(
  //   _id: string,
  //   user: UpdateUserEmailInterface,
  // ): Promise<UserInterface | ErrorMessage> {
  //   try {
  //     const _user = await this.userModel.findOne({ _id });
  //     if (
  //       _user.email === user.oldEmail &&
  //       _user.password === user.password &&
  //       _user.username === user.username
  //     ) {
  //       const dbPayload = await this.userModel.findByIdAndUpdate(
  //         _id,
  //         { email: user.newEmail, updated_at: Date.now().valueOf() },
  //         { new: true },
  //       );
  //       const { password, ...result } = dbPayload['_doc'];
  //       return result;
  //     } else {
  //       const { password, ...result } = _user['_doc'];
  //       return result;
  //     }
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  // async resetPassword(
  //   _id: string,
  //   user: ResetUserPasswordInterface,
  // ): Promise<UserInterface | ErrorMessage> {
  //   try {
  //     const _user = await this.userModel.findOne({ _id });
  //     if (
  //       _user.password === user.oldPassword &&
  //       _user.username === user.username
  //     ) {
  //       const dbPayload = await this.userModel.findByIdAndUpdate(
  //         _id,
  //         { password: user.newPassword, updated_at: Date.now().valueOf() },
  //         { new: true },
  //       );
  //       const { password, ...result } = dbPayload['_doc'];
  //       return result;
  //     } else {
  //       const { password, ...result } = _user['_doc'];
  //       return result;
  //     }
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  async delete(_id: string): Promise<CreateUserInterface | ErrorMessage> {
    try {
      const payload = await this.userModel.findByIdAndRemove(_id);
      const { password, ...result } = payload['_doc'];
      return result;
    } catch (error) {
      return { error: { message: error.message } };
    }
  }
}
