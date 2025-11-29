import { Component } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { API_ENDPOINTS } from '../../configuration/apis/river_endpoint_v1';
import { HttpResponse } from '../../entity/http/HttpResponse';
import { User } from '../../entity/User';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userList: User[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.post<HttpResponse>(API_ENDPOINTS.users.getAll, null).subscribe((response:HttpResponse) => {
      this.userList = response.data;
      console.log(response);
    });
  }

}
