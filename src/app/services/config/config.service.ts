import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {environment} from '@env/environment.prod';

import {JWT} from '@interfaces/jwt.interface';
import {User} from '@interfaces/user.interface';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly headers: HttpHeaders;
  private jwt: JWT;
  private user: User;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }

  refreshToken(): Observable<HttpResponse<JWT>> {
    const url = `${environment.apiUrl}/oauth/access_token`;
    const body = `grant_type=refresh_token&refresh_token=${this.getJWT.refresh_token}`;
    return this.httpClient
      .post<JWT>(
        url, body,
        {
          observe: 'response',
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        }
      )
      .pipe(
        map(res => {
          this.setJWT = res.body;
          return res;
        })
      );
  }

  resetVariable() {
    this.setJWT = {access_token: undefined};
    this.setUser = {};
  }

  get getHeaders(): HttpHeaders {
    return this.headers;
  }

  set setJWT(jwt: JWT) {
    this.jwt = jwt;
  }

  set setUser(user: User) {
    this.user = user;
  }

  set setAccessToken(token: string) {
    this.jwt = {
      access_token: token
    };
  }

  get getJWT(): JWT {
    return this.jwt;
  }

  get getUser(): User {
    return this.user;
  }
}
