import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/guards/session.guard';
import { ErrorMessage } from 'src/interfaces/error.interface';
import { UserInterface } from 'src/users/interfaces/users.interface';
import { ProfileDto } from './dto/profile.dto';
import { _Profile } from './interfaces/profile.interface';
import { ProfileService } from './profile.service';

@Controller('api/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Get()
  // findAll(): Promise<_Profile[] | ErrorMessage> | ErrorMessage {
  //   try {
  //     return this.profileService.findAll();
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  @Get()
  @UseGuards(SessionGuard)
  findOne(@Request() req): Promise<_Profile | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.profileService.findOne(user.profileId);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  @Post()
  @UseGuards(SessionGuard)
  async create(
    @Body() createProfileDto: ProfileDto,
    @Request() req,
  ): Promise<_Profile | ErrorMessage> {
    try {
      const user: UserInterface = req.session.auth;
      const profile: any = await this.profileService.create({
        ...createProfileDto,
        userId: user._id,
      });
      if (profile?.id !== undefined) {
        req.session.auth = <UserInterface>{ ...user, profileId: profile.id };
      }
      return profile;
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  @Put()
  @UseGuards(SessionGuard)
  update(
    @Request() req,
    @Body() updateUserDto: ProfileDto,
  ): Promise<_Profile | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.profileService.update(user.profileId, updateUserDto);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  @Delete()
  @UseGuards(SessionGuard)
  delete(@Request() req): Promise<_Profile | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.profileService.delete(user.profileId);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  // @Put(':id/image')
  // @UseInterceptors(FileInterceptor('image'))
  // uploadFile(
  //   @UploadedFile() file,
  //   @Param('id') id,
  // ): Promise<_Profile | ErrorMessage> | ErrorMessage {
  //   const path: string = file.path;
  //   try {
  //     if (file.mimetype.startsWith('image/') && file.size <= 125000) {
  //       return this.profileService.uploadImage(id, path.replace('public', ''));
  //     } else {
  //       unlink(path, () => {
  //         /**delete the unwanted file */
  //       });
  //       return {
  //         error: { message: 'File is either too large or not an image.' },
  //       };
  //     }
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }
}
