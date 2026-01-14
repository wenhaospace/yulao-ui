import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileVo } from '../model/FileVo';
import { HttpService } from '../../../services/http/http.service';
import { baseUrl } from '../../../configuration/properties';
import { MyHttpResponse } from '../../../services/common/MyHttpResponse';



@Component({
  selector: 'app-file-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.css'
})
export class FileManagementComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  files: FileVo[] = [];

  selectedFiles = new Set<string>();
  showConfirmModal = false;
  filesToBeDeleted: FileVo[] = [];

  constructor(private httpService: HttpService) {
    httpService.setBaseUrl(baseUrl)
    this.fetchFiles();
  }

  fetchFiles() {
    this.httpService.get<MyHttpResponse<FileVo[]>>('files/all').subscribe((response) => {
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
    this.httpService.post<MyHttpResponse<string>>('files/upload', formData).subscribe(
      (response) => {
        if (response.code === 200) {
          console.log('上传成功:', response.data);
          // 示例：成功后更新列表
          
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
    console.log('查看文件:', id);
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

    console.log('已删除:', idsToDelete);
    this.closeConfirmModal();
  }
}
