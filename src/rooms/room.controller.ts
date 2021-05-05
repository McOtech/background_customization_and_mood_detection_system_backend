import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ErrorMessage } from 'src/interfaces/error.interface';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';
import { _Room } from './interfaces/room.interface';
import { UserInterface } from 'src/users/interfaces/users.interface';
import { SessionGuard } from 'src/guards/session.guard';

@Controller('api/rooms')
export class RoomController {
  constructor(private readonly companyService: RoomService) {}

  @Get()
  @UseGuards(SessionGuard)
  findAll(@Request() req): Promise<_Room[] | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.companyService.findAll(user.profileId);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  @Get(':id')
  @UseGuards(SessionGuard)
  findOne(
    @Param('id') id,
    @Request() req,
  ): Promise<_Room | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.companyService.findOne(id, user.profileId);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  @Post()
  @UseGuards(SessionGuard)
  create(
    @Body() companyDto: RoomDto,
    @Request() req,
  ): Promise<_Room | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.companyService.create(
        { ...companyDto, dueDate: new Date(companyDto.dueDate).valueOf() },
        user.profileId,
      );
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  @Put(':id')
  @UseGuards(SessionGuard)
  update(
    @Param('id') id,
    @Body() companyDto: RoomDto,
    @Request() req,
  ): Promise<_Room | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.companyService.update(
        id,
        { ...companyDto, dueDate: new Date(companyDto.dueDate).valueOf() },
        user.profileId,
      );
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  @Delete(':id')
  @UseGuards(SessionGuard)
  delete(
    @Param('id') id,
    @Request() req,
  ): Promise<_Room | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.companyService.delete(id, user.profileId);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  // @Put(':id/banner')
  // @UseInterceptors(FileInterceptor('banner'))
  // uploadBanner(
  //   @UploadedFile() file,
  //   @Param('id') id,
  // ): Promise<_Room | ErrorMessage> | ErrorMessage {
  //   const path: string = file.path;
  //   try {
  //     if (file.mimetype.startsWith('image/') && file.size <= 125000) {
  //       return this.companyService.uploadBanner(id, path.replace('public', ''));
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

  // @Put(':id/logo')
  // @UseInterceptors(FileInterceptor('logo'))
  // uploadLogo(
  //   @UploadedFile() file,
  //   @Param('id') id,
  // ): Promise<_Room | ErrorMessage> | ErrorMessage {
  //   const path: string = file.path;
  //   try {
  //     if (file.mimetype.startsWith('image/') && file.size <= 125000) {
  //       return this.companyService.uploadLogo(id, path.replace('public', ''));
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
