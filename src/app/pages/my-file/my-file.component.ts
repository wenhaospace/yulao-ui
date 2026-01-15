import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-my-file',
  standalone: true,
  imports: [RouterOutlet,CommonModule, RouterModule],
  templateUrl: './my-file.component.html',
  styleUrl: './my-file.component.css'
})
export class MyFileComponent {
 private authService = inject(AuthService);

  // 模拟权限（实际可从服务或 token 解析）
  canViewList = true;
  canManage = this.hasPermission();


  private hasPermission(): boolean {
    // 示例：从 localStorage、AuthService 等获取权限
    return this.authService.canAccess('file.manage');
  }
  


    
}
