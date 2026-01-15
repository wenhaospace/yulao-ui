import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const requiredPermission = route.data['permission']; // 从路由 data 中读取所需权限

  if (authService.canAccess(requiredPermission)) {
    return true;
  } else {
    authService.navigateToUnauthorized();
    return false;
  }
};
