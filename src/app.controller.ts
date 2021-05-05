import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { ErrorMessage } from './interfaces/error.interface';
import { CreateUserDto } from './users/dto/users.dto';
import { CreateUserInterface } from './users/interfaces/users.interface';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/api/login')
  async login(@Request() req) {
    try {
      if (!req.user) {
        req.session.auth = null;
        return null;
      }
      req.session.auth = req.user;
      return req.user;
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Post('/api/register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserInterface | ErrorMessage> {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  @Post('/api/logout')
  async logout(@Request() req) {
    try {
      req.session.auth = null;
      return {
        status: !!!req.session.auth,
        message: 'Logged out successfully',
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Post('/api/auth_status')
  async authStatus(@Request() req) {
    return !!req.session.auth;
  }
}
