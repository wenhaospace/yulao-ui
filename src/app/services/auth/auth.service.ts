import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 注入 Router 服务
  private router = inject(Router);

  // 模拟当前用户权限（实际可从 JWT、localStorage 或 API 获取）
  // TODO: 根据实际需求动态修改权限获取逻辑
  private userPermissions : Set<string> = new Set(['file.view']); // 示例：普通用户只有查看权限
  private tempExpiryTimer: any;

  
  // =====无权限时跳转=============================
  navigateToUnauthorized(): void {
    this.router.navigate(['/unauthorized']);
  }

  // ======永久权限 + 临时权限合并判断==============
  hasPermission(perm: string): boolean {
    return this.userPermissions.has(perm);
  }

  // ======主动授予临时权限（可带有效期）=============
  grantTemporaryPermission(permission: string, durationMs: number = 10 * 60_000) { // 默认10分钟
    this.userPermissions.add(permission);

    // 清除旧定时器
    if (this.tempExpiryTimer) clearTimeout(this.tempExpiryTimer);

    // 设置过期自动清除
    this.tempExpiryTimer = setTimeout(() => {
      this.userPermissions.delete(permission);
      console.log(`[权限] 临时权限 ${permission} 已过期`);
    }, durationMs);
  }

  // =========检查是否已加载完成（用于守卫等待）=======
  isLoaded(): boolean {
    return true; // 简化处理，实际可结合 API 加载状态
  }

}
