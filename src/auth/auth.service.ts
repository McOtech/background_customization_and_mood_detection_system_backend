import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    username: string,
    plainPassword: string,
  ): Promise<UserInterface> {
    try {
      const user: UserInterface = await this.usersService.findUser(username);
      const isValidUser = await bcrypt.compare(plainPassword, user.password);
      if (user && isValidUser) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
