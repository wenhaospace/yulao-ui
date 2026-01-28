import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { baseUrl } from '../../configuration/properties';
import { MyHttpResponse } from '../../services/common/MyHttpResponse';
import { Note } from './model/Note';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { PaginationNote } from './model/PaginationNote';

@Component({
  selector: 'app-my-note',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './my-note.component.html',
  styleUrl: './my-note.component.css'
})
export class MyNoteComponent {
  notes: { platform: string; description: string ; url:string }[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.setBaseUrl(baseUrl);
    this.loadNotes();
  }

  loadNotes(): void {
    this.notes = [];

    this.httpService.get<MyHttpResponse<PaginationNote>>(`/notes/page?pageNum=${this.currentPage}&pageSize=${this.itemsPerPage}`).subscribe(
      response =>{
        if (response.code !== 200) {
          console.error('Failed to load notes:', response.message);
          return;
        }

        const data: PaginationNote = response.data;

        this.currentPage = data.pageNum;
        this.totalItems = data.total;
        this.itemsPerPage = data.pageSize;
        data.list.forEach(note => {
          this.notes.push({
            platform: note.platform,
            description: note.description,
            url: note.url
          });
        })
      },
      error => {
        console.error('Error loading notes:', error);
      }
    );
    
  }

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100; // 假设总条数

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.loadNotes();
  }

  updateNotes() {
    // 这里可以根据 currentPage 和 itemsPerPage 更新 notes 数据
    console.log(`Fetching notes for page ${this.currentPage}`);
  }

}
