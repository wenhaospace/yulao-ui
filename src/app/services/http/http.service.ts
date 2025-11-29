import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../configuration/properties';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = baseUrl;

  constructor(private http: HttpClient) { }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  get<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }
}
