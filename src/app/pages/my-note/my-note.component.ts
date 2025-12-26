import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { baseUrl } from '../../configuration/properties';
import { MyHttpResponse } from '../../services/common/MyHttpResponse';
import { Note } from './model/Note';

@Component({
  selector: 'app-my-note',
  standalone: true,
  imports: [CommonModule],
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

    this.httpService.get<MyHttpResponse<Note[]>>('/notes').subscribe(
      response =>{
        if (response.code !== 200) {
          console.error('Failed to load notes:', response.message);
          return;
        }
        response.data.forEach(note => {
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

}
