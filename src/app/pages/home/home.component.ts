import { Component } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { API_ENDPOINTS } from '../../configuration/apis/river_endpoint_v1';
import { HttpResponse } from '../../entity/http/HttpResponse';
import { User } from '../../entity/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userList: User[] = [];

   personalInfo = {
    name: '张文浩',
    title: '全栈工程师',
    description: '我是一名全栈工程师，擅长前端和后端开发，热爱编程和技术创新。',
    contact: 'superwenhao.511@gmail.com'
  };

  projects = [
    { title: '智能翻译', description: '基于Qwen3实现的多语言翻译应用', link: '/translator' },
    { title: 'Project B', description: 'A description of Project B.', link: '/' },
    { title: 'Project C', description: 'A description of Project C.', link: '/' },
    { title: '翻译', description: '基于Qwen3实现的多语言翻译应用', link: '/translator' },
    { title: 'Project B', description: 'A description of Project B.', link: '/' },
    { title: 'Project C', description: 'A description of Project C.', link: '/' }
  ];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.post<HttpResponse>(API_ENDPOINTS.users.getAll, null).subscribe((response:HttpResponse) => {
      this.userList = response.data;
      console.log(response);
    });
  }

}
