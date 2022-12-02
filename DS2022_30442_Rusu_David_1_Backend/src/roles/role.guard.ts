import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../authentification/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentification/jwt-authentication.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
 
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      if(Role.Admin === user.role) {
        return true;
      }

      return user.role === role;
    }
  }
 
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;