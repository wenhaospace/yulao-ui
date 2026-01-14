import { Component } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { File } from './model/File';
import { baseUrl } from '../../configuration/properties';
import { MyHttpResponse } from '../../services/common/MyHttpResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-file.component.html',
  styleUrl: './my-file.component.css'
})
export class MyFileComponent {
  files: File[] = [];
  
    constructor(private httpService: HttpService) {
      httpService.setBaseUrl(baseUrl)
      this.fetchFiles();
    }

    fetchFiles() {
      this.httpService.get<MyHttpResponse<File[]>>('files/all').subscribe((response) => {
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

        window.open(fileUrl, '_blank');
      });
    }

    get lastUpdateTime(): Date {
      return this.files.length > 0
        ? new Date(Math.max(...this.files.map(f => new Date(f.createTime).getTime())))
        : new Date();
    }
}
