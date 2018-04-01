import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { User } from './../../shared/dto/authLoginDot';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class AuthService {
  private backendUrl: string = `${environment.backendUrl}api`;
  url:string;
  user: User;
  constructor( private httpClient: HttpClient) {  
  }

  isAuth():boolean {
    return false;
  }

  login(user: User){
  	let url = `${this.backendUrl}/login`;
    return this.httpClient.post<User>(
        url,
        JSON.stringify({username: user.username, password: user.password}),
        httpOptions).subscribe(res => { console.log(res)});
    
  }
}