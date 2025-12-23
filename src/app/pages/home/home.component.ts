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
    { title: '速查笔记(开发中)', description: '记录个人实践随笔及常用命令', link: '/' },
    { title: 'SQL生成与调优(调研中)', description: '辅助编写SQL, 支持Mysql, Oracle, Postgres', link: '/' },
    { title: '农作物辅助种植(调研中)', description: '上传农作物图片，经过图片模型处理分析生长状态， 给出最佳养护指导', link: '/' },
    { title: '公文简报写作(调研中)', description: '基于给定资料和公文模板，快速生成公务员简报', link: '/' },
    { title: '网页阅读(搁置)', description: '总结页面主要内容，可用于快速学习或查阅技术文档 - 备注： 中文页面布局过于紧凑， 需要先做数据清洗后再调用大模型分析', link: '/' },
  ];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.post<HttpResponse>(API_ENDPOINTS.users.getAll, null).subscribe((response:HttpResponse) => {
      this.userList = response.data;
      console.log(response);
    });
  }

}
