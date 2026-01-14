import { Component } from '@angular/core';
import { File } from './model/File';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-file',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './my-file.component.html',
  styleUrl: './my-file.component.css'
})
export class MyFileComponent {

  
  constructor() {
    
  }

    
}
