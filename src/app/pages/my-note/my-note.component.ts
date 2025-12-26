import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-note.component.html',
  styleUrl: './my-note.component.css'
})
export class MyNoteComponent {
  notes: { platform: string; description: string ; url:string }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notes = [
      {
        platform: '微信公众号',
        description: 'VSCode - 基于code-server实现在线IDE部署实践',
        url: 'https://mp.weixin.qq.com/s/t0WOnt50hRn_34Kd7m3hmg'
      },
       {
        platform: '微信公众号',
        description: 'VSCode - 基于code-server实现在线IDE部署实践',
        url: 'https://mp.weixin.qq.com/s/t0WOnt50hRn_34Kd7m3hmg'
      }
    ];
  }

}
