import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredPermission = route.data['permission']; // 从路由 data 中读取所需权限

  if (authService.hasPermission(requiredPermission)) {
    return true;
  } else {
    // 否则跳转到验证页，并带上返回地址
    return router.createUrlTree(['/verify'], {
      queryParams: { returnUrl: state.url }
    });
  }
};
