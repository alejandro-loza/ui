import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment.prod';

import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { isNullOrUndefined } from 'util';

import { Token } from '@app/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private headers: HttpHeaders;
  private token_access: string;
  private token_refresh: string;
  private idUser: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.token_access = null;
    this.token_refresh = null;
    this.idUser = null;
  }

  public set setAccessToken(token: string) {
    this.token_access = token;
  }

  public get getAccessToken(): string {
    return this.token_access;
  }

  public set setRefreshToken(refreshToken: string) {
    this.token_refresh = refreshToken;
  }

  public get getRefreshToken(): string {
    return this.token_refresh;
  }

  public set setId(id: string) {
    this.idUser = id;
  }

  public get getId(): string {
    return this.idUser;
  }

  getJsonHeaders() {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
    if ( sessionStorage.getItem('access-token') !== null ) {
      this.headers = this.headers.set('Authorization', `Bearer ${sessionStorage.getItem('access-token')}`);
    }
    return this.headers;
  }

  refreshToken(): Observable<HttpResponse<Token>> {
    const url = `${environment.apiUrl}/oauth/access_token`;

    this.setRefreshToken = sessionStorage.getItem('refresh-token');
    this.setId = sessionStorage.getItem('id-user');

    return this.httpClient
      .post<Token>(
        url,
        `grant_type=refresh_token&refresh_token=${this.getRefreshToken}`,
        {
          observe: 'response',
          headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
        }
      )
      .pipe(
        retry(2),
        map(res => {
          sessionStorage.clear();

          sessionStorage.setItem('access-token', res.body.access_token);
          sessionStorage.setItem('refresh-token', res.body.refresh_token);
          sessionStorage.setItem('id-user', this.getId);

          this.setAccessToken = res.body.access_token;
          this.setRefreshToken = res.body.refresh_token;
          return res;
        })
      );
  }
}
