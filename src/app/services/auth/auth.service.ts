import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable()
export class AuthService {

  private backendUrl: string = `${environment.backendUrl}api`;
  private headers = new HttpHeaders({'content-type':'application/json'});
  url:string;

  constructor( private _httpClient: HttpClient) {
  }

  isAuth():boolean {
    return false;
  }

  login(username:string, password:string){
  	let url = `${this.backendUrl}/login`;
  	this._httpClient.post(url, JSON.stringify);

  	return true;
  }
}