import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // 注入 Router 服务
  private router = inject(Router);

  // 模拟当前用户权限（实际可从 JWT、localStorage 或 API 获取）
  // TODO: 根据实际需求动态修改权限获取逻辑
  private userPermissions = ['file.view']; // 示例：普通用户只有查看权限

  canAccess(permissionsRequired: string): boolean {
    return this.userPermissions.includes(permissionsRequired);
  }

  // 无权限时跳转
  navigateToUnauthorized(): void {
    this.router.navigate(['/unauthorized']);
  }
}
