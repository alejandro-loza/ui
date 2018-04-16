import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { FinerioService } from '../shared/config.service';

import { User } from './../../shared/dto/authLoginDot';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  user: User;
  token: string;

  private backendUrl = `${environment.backendUrl}/api`;
  constructor(
    private httpClient: HttpClient,
    private finerioService: FinerioService) {
      this.getData();
    }

  isAuth() {
    return (  this.token.length  > 0 ) ? true : false;
  }

  getData() {
    if ( localStorage.getItem('access token') ) {
      this.token = localStorage.getItem('access token');
    } else {
      this.token = '';
    }
  }

  saveData( access_token: string, refresh_token: string, username: string ) {
    localStorage.setItem( 'access token', access_token );
    localStorage.setItem( 'refresh token', refresh_token );
    localStorage.setItem( 'username', username );

    this.finerioService.setToken( refresh_token );
  }

  login(user: User){
    const url = `${this.backendUrl}/login`;
    return this.httpClient.post(
      url, JSON.stringify({ username: user.email, password: user.password }), {headers : this.finerioService.getJsonHeaders()}
    ).map( (res: any ) => {
      this.saveData( res.access_token, res.refresh_token, res.username );
      this.getData();
      return true;
    });
  }
}
