import {
  Controller,
  Delete,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/guards/session.guard';
import { UsersGuard } from 'src/guards/users.guard';
import { ErrorMessage } from 'src/interfaces/error.interface';
import {
  CreateUserInterface,
  UserInterface,
} from './interfaces/users.interface';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Get()
  // findAll(): Promise<CreateUserInterface[] | ErrorMessage> | ErrorMessage {
  //   try {
  //     return this.userService.findAll();
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  @Get()
  @UseGuards(SessionGuard)
  findOne(
    @Request() req,
  ): Promise<CreateUserInterface | ErrorMessage> | ErrorMessage {
    try {
      const user: UserInterface = req.session.auth;
      return this.userService.findOne(user._id);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  // @Put(':id/reset_type')
  // updateType(
  //   @Param('id') id,
  //   @Body() updateUserTypeDto: UpdateUserTypeDto,
  // ): Promise<UserInterface | ErrorMessage> | ErrorMessage {
  //   try {
  //     return this.userService.updateType(id, updateUserTypeDto);
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  // @Put(':id/reset_email')
  // updateEmail(
  //   @Param('id') id,
  //   @Body() updateUserEmailDto: UpdateUserEmailDto,
  // ): Promise<UserInterface | ErrorMessage> | ErrorMessage {
  //   try {
  //     return this.userService.updateEmail(id, updateUserEmailDto);
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  // @Put(':id/reset_password')
  // resetPassword(
  //   @Param('id') id,
  //   @Body() updateUserPasswordDto: ResetUserPasswordDto,
  // ): Promise<UserInterface | ErrorMessage> | ErrorMessage {
  //   try {
  //     return this.userService.resetPassword(id, updateUserPasswordDto);
  //   } catch (error) {
  //     return { error: { message: error.message } };
  //   }
  // }

  @Delete(':id')
  @UseGuards(UsersGuard)
  delete(
    @Param('id') id,
    @Request() req,
  ): Promise<CreateUserInterface | ErrorMessage> | ErrorMessage {
    try {
      return this.userService.delete(id);
    } catch (error) {
      return { error: { message: error.message } };
    } finally {
      req.session.auth = null;
    }
  }
}
