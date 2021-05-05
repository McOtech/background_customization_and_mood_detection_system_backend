import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/users/interfaces/users.interface';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request): boolean {
    try {
      const user: UserInterface = request.session.auth;
      if (!user) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
