import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  code: number | null = null;


  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private authService: AuthService
  // ) {}

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  submit() {
    if (!this.code) return;

    // 解析认证数字 → 映射为临时权限
    const tempPermission = this.getPermissionFromCode(this.code);

    if (tempPermission) {
      // 保存临时权限（可加过期时间）
      this.authService.grantTemporaryPermission(tempPermission);

      // 获取跳转前的目标 URL
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/myfile/list';
      this.router.navigate([returnUrl]);
    } else {
      alert('无效的认证数字，请重试！');
    }
  }

  private getPermissionFromCode(code: number): string | null {
    switch (code) {
      case 1122:
        return 'file.view';
      case 1818:
        return 'file.manage';
      default:
        return null;
    }
  }
}
