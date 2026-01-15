import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-file',
  standalone: true,
  imports: [RouterOutlet,CommonModule, RouterModule],
  templateUrl: './my-file.component.html',
  styleUrl: './my-file.component.css'
})
export class MyFileComponent {

  // 模拟权限（实际可从服务或 token 解析）
  canViewList = true;
  canManage = this.hasPermission('manage_library');

  constructor() {
    
  }

  private hasPermission(role: string): boolean {
    // 示例：从 localStorage、AuthService 等获取权限
    const permissions = ['view_library', 'manage_library'];
    return permissions.includes(role);
  }
  


    
}
