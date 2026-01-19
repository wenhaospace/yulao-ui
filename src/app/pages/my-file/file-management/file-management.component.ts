import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FileVo } from '../model/FileVo';
import { HttpService } from '../../../services/http/http.service';
import { baseUrl } from '../../../configuration/properties';
import { MyHttpResponse } from '../../../services/common/MyHttpResponse';
import { Base64 } from 'js-base64';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';



@Component({
  selector: 'app-file-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.css'
})
export class FileManagementComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private httpService = inject(HttpService);
  private router = inject(Router);

  files: FileVo[] = [];

  selectedFiles = new Set<string>();
  showConfirmModal = false;
  filesToBeDeleted: FileVo[] = [];


  ngOnInit(): void {
    this.setupRouteListener();
    this.httpService.setBaseUrl(baseUrl);
    this.fetchFiles();
    
  }

  setupRouteListener() {
    // 监听所有导航结束事件
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      console.log('Navigation ended, refetching data...');
      this.fetchFiles(); // 每次回来都重载数据
    });
  }

  fetchFiles() {
    this.httpService.get<MyHttpResponse<FileVo[]>>('/files/all').subscribe((response) => {
      if (response.code !== 200) {
        console.error('Failed to load files:', response.message);
        return;
      }
      this.files = response.data;
    });
  }

  // ========================= 上传文件相关 =========================
  // 触发隐藏的文件选择框
  onUploadClick(): void {
    this.fileInput.nativeElement.click();
  }

  // 文件已选中（可多选）
  onFileSelected(event: any): void {
    const files = event.target.files as FileList;
    if (files.length === 0) return;

    // 可以在这里调用上传服务
    Array.from(files).forEach(file => {
      this.uploadFile(file);
    });

    // 清空 input，允许重复选择相同文件
    this.fileInput.nativeElement.value = '';
  }

  // 实际上传逻辑（示例）
  uploadFile(file: File): void {
    console.log(`开始上传: ${file.name} (${file.size} 字节)`);

    const formData = new FormData();
    formData.append('file', file);

    // 调用 HttpClient 发送到后端
    this.httpService.post<MyHttpResponse<string>>('/files/upload', formData).subscribe(
      (response) => {
        if (response.code === 200) {
          console.log('上传成功:', response.data);
          // 示例：成功后更新列表
          this.fetchFiles();
        } else {
          console.error('上传失败:', response.message);
        }
      },
      (error) => {
        console.error('上传错误:', error);
      }
    );
  }

  // ============= 文件拖拽上传相关 ===============================
  onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  handleFiles(fileList: FileList) {
    Array.from(fileList).forEach(file => this.uploadFile(file));
  }

  // ========================= 文件选择与删除相关 =========================
  // 全选/反选
  toggleAll(event: any) {
    if (event.target.checked) {
      this.files.forEach(f => this.selectedFiles.add(f.id));
    } else {
      this.selectedFiles.clear();
    }
  }

  // 单个选择
  toggleSelection(file: FileVo) {
    if (this.selectedFiles.has(file.id)) {
      this.selectedFiles.delete(file.id);
    } else {
      this.selectedFiles.add(file.id);
    }
  }

  isSelected(file: FileVo): boolean {
    return this.selectedFiles.has(file.id);
  }

  viewFile(id: string) {
    // Implement file viewing logic here
    this.httpService.get<MyHttpResponse<string>>(`/files/presigned-url/${id}`).subscribe((response) => {
      if (response.code !== 200) {
        console.error('Failed to load file:', response.message);
        return;
      }
      // Handle the loaded file data
      const fileUrl = response.data;

      // 使用 Base64.encode 编码原始 URL
      const encodedUrl = Base64.encode(fileUrl);
      window.open('http://47.245.100.81:8012/onlinePreview?url='+ encodeURIComponent(encodedUrl), '_blank');
    });
  }

  downloadFile(fileId: string): void {
    const url = `${baseUrl}/files/download/${fileId}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // 可选
    link.download = ''; // 表示希望下载而不是打开
    link.click();
}


  // 单个删除确认
  openSingleDeleteConfirm(file: FileVo) {
    this.filesToBeDeleted = [file];
    this.showConfirmModal = true;
  }

  // 批量删除确认
  openBatchDeleteConfirm() {
    this.filesToBeDeleted = this.files.filter(f => this.selectedFiles.has(f.id));
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.filesToBeDeleted = [];
  }

  confirmDelete() {
    // 实际删除逻辑（调用服务）
    const idsToDelete = this.filesToBeDeleted.map(f => f.id);
    this.files = this.files.filter(f => !idsToDelete.includes(f.id));
    this.selectedFiles = new Set([...this.selectedFiles].filter(id => !idsToDelete.includes(id)));

    this.httpService.post<MyHttpResponse<string>>('/files/delete', { fileIds: idsToDelete }).subscribe(
      (response) => {
        if (response.code === 200) {
          console.log('删除成功:', response.data);
          this.closeConfirmModal();
        } else {
          console.error('删除失败:', response.message);
        }
      }
    );
  }
}
