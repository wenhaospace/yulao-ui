import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { baseUrl } from '../../../configuration/properties';
import { MyHttpResponse } from '../../../services/common/MyHttpResponse';
import { FileVo } from '../model/FileVo';

// 引入 Base64 工具
import { Base64 } from 'js-base64';


@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent {
      files: FileVo[] = [];
    
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
  
      viewFile(fileId: string) {
        // Implement file viewing logic here
        this.httpService.get<MyHttpResponse<string>>(`files/presigned-url/${fileId}`).subscribe((response) => {
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
  
      get lastUpdateTime(): Date {
        return this.files.length > 0
          ? new Date(Math.max(...this.files.map(f => new Date(f.createTime).getTime())))
          : new Date();
      }
}
