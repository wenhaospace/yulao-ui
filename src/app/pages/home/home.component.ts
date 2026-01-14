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
    name: 'Zhang Wenhao',
    title: '全栈工程师',
    description: '我是一名全栈工程师，擅长前端和后端开发，正在探索AI技术，热爱编程和技术创新。',
    contact: 'superwenhao.511@gmail.com'
  };

  projects = [
    { title: '智能翻译', description: '基于Qwen3实现的多语言翻译应用', link: '/translator' },
    { title: '技术实践笔记', description: '记录个人实践随笔及常用命令', link: '/mynote' },
    { title: '个人资料库', description: '基于Minio, kkFileView构建的高性能文件存储与查阅助手', link: '/myfile' },
    { title: '个人AI助手(开发中)', description: '基于Langgraph构建个人辅助智能体', link: '/' },
    { title: 'SQL生成与调优(调研中)', description: '辅助编写SQL, 支持Mysql, Oracle, Postgres', link: '/' },
    { title: '农作物辅助种植(调研中)', description: '上传农作物图片，经过图片模型处理分析生长状态， 给出最佳养护指导', link: '/' },
    { title: '公文简报写作(调研中)', description: '基于给定资料和公文模板，快速生成公务员简报', link: '/' },
    { title: '网页阅读(搁置)', description: '总结页面主要内容，可用于快速学习或查阅技术文档 - 备注： 中文页面布局过于紧凑， 需要先做数据清洗后再调用大模型分析', link: '/' },
    { title: '代码片段重构转换(开发中)', description: '用于重构相同逻辑的代码,SQL或格式, 例如： Java实体切换成Python实体; Java实体切换成对应的Json实体 ', link: '/' },
    { title: '全球金融大盘跟踪分析面板(开发中)', description: '以大A, 港股， 美股总市值出发， 分析在不同基准汇率间的市值比例与增长幅度', link: '/' },
  ];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    // this.httpService.post<HttpResponse>(API_ENDPOINTS.users.getAll, null).subscribe((response:HttpResponse) => {
    //   this.userList = response.data;
    //   console.log(response);
    // });
  }

}
