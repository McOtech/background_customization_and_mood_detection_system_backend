import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/users/interfaces/users.interface';

@Injectable()
export class UsersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request): boolean {
    try {
      const user: UserInterface = request.session.auth;
      const id = request.params.id;
      if (!user) {
        return false;
      }
      if (user._id === id) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
