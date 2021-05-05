import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/interfaces/error.interface';
import { _Room } from './interfaces/room.interface';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {}

  async findAll(profileId: string): Promise<_Room[] | ErrorMessage> {
    try {
      return await this.roomModel.find({ profileId });
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async findOne(id: string, profileId: string): Promise<_Room | ErrorMessage> {
    try {
      return await this.roomModel.findOne({ _id: id, profileId });
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async create(room: _Room, profileId: string): Promise<_Room | ErrorMessage> {
    try {
      const newCompany = new this.roomModel({ ...room, profileId });
      return await newCompany.save();
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async update(
    id: string,
    room: _Room,
    profileId: string,
  ): Promise<_Room | ErrorMessage> {
    try {
      const roomPayload = await this.roomModel.findOne({ _id: id, profileId });
      const rm: _Room = roomPayload['_doc'];
      const rmProfileId: string = String(rm.profileId).toString();
      if (rmProfileId === profileId) {
        return await this.roomModel.findByIdAndUpdate(
          id,
          { ...room, updated_at: Date.now().valueOf() },
          {
            new: true,
          },
        );
      }
      throw new UnauthorizedException();
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  async delete(id: string, profileId: string): Promise<_Room | ErrorMessage> {
    try {
      const roomPayload = await this.roomModel.findOne({ _id: id, profileId });
      const rm: _Room = roomPayload['_doc'];
      const rmProfileId: string = String(rm.profileId).toString();
      if (rmProfileId === profileId) {
        return await this.roomModel.findByIdAndRemove(id);
      }
      throw new UnauthorizedException();
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  // async uploadBanner(id: string, path: string): Promise<_Room | ErrorMessage> {
  //   try {
  //     const company: _Room = await this.roomModel.findOne({ _id: id });
  //     unlink('public' + company.banner_url, () => {
  //       /**
  //         delete current image */
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     return await this.roomModel.findByIdAndUpdate(
  //       id,
  //       { banner_url: path, updated_at: Date.now().valueOf() },
  //       { new: true },
  //     );
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  // async uploadLogo(id: string, path: string): Promise<_Room | ErrorMessage> {
  //   try {
  //     const company: _Room = await this.roomModel.findOne({ _id: id });
  //     unlink('public' + company.logo_url, () => {
  //       /**
  //         delete current image */
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     return await this.roomModel.findByIdAndUpdate(
  //       id,
  //       { logo_url: path, updated_at: Date.now().valueOf() },
  //       { new: true },
  //     );
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }
}
