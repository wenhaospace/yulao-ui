import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import languages from './config/language.support';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http/http.service';
import { TranslationRequest } from './model/TranslationRequest';
import { TranslationResponse } from './model/TranslationResponse';
import { debounceTime, Subject } from 'rxjs';
import { agentUrl } from '../../configuration/properties';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.css'
})
export class TranslatorComponent {
  fromLang: string = 'en';
  toLang: string = 'zh';
  inputText: string = '';
  translatedText: string = '';
  languages = languages

    // 新增
  private translateSubject = new Subject<void>();

  constructor(private httpService: HttpService) {
    // 防抖处理
    this.translateSubject.pipe(debounceTime(600)).subscribe(() => {
      this.doTranslate();
    });

  }

  doTranslate() {
    if (!this.inputText.trim()) {
      this.translatedText = '';
      return;
    }
    
    const request: TranslationRequest = {
      text: this.inputText,
      source_lang: this.fromLang,
      target_lang: this.toLang
    };
    console.log(request);

    this.httpService.setBaseUrl(agentUrl);
    this.httpService.post<TranslationResponse>('/translate', request)
      .subscribe(
        response => {
          this.translatedText = this.removeThinkTags(response.translated_text);
        },
        error => {
          console.error('Translation error:', error); 
          this.translatedText = 'Translation failed. Please try again.';
        }
      );

  }

  // 新的 translate 方法，触发防抖
  translate() {
    this.translateSubject.next();
  }

  onLanguageChange() {
    if (this.inputText) {
      this.translate();
    }
  }

  swapLanguages() {
    [this.fromLang, this.toLang] = [this.toLang, this.fromLang];
    [this.inputText, this.translatedText] = [this.translatedText, this.inputText];
  }



  // 工具方法
  // 移除文本中的<think>.*?<\/think>标签里的内容
  removeThinkTags(text: string): string {
    return text.replace(/<think>.*?<\/think>/gs, '').replace(/^\s+/, '');
  }

}
