import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment.prod';

import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { isNullOrUndefined } from 'util';

import { RefreshToken } from '@interfaces/refreshToken.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private headers: HttpHeaders;
  token_access: string;
  token_refresh: string;
  idUser: string;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.token_access = null;
    this.token_refresh = null;
    this.idUser = null;
  }

  public set setToken(token: string) {
    this.token_access = token;
  }

  public get getToken(): string {
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
    this.headers = this.headers.append(
      'Content-Type',
      'application/json'
    );
    this.headers = this.headers.append(
      'Accept',
      'application/json'
    );
    /**
     * Se checa si el toquen es undefined o null.
     * Esto puede darse por dos circunstancias,
     * si el token no existe es undefined,
     * pero si el token expira entonces es nulo.
     */
    if (!isNullOrUndefined(this.token_access)) {
      this.headers = this.headers.set(
        'Authorization',
        `Bearer ${this.token_access}`
      );
    } else if (sessionStorage.getItem('access-token')) {
      this.setToken = sessionStorage.getItem('access-token');
      this.headers = this.headers.set(
        'Authorization',
        `Bearer ${this.token_access}`
      );
    }

    return this.headers;
  }

  refreshToken(): Observable<HttpResponse<RefreshToken>> {
    const url = `${environment.apiUrl}/oauth/access_token`;
    this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    if (
      isNullOrUndefined(this.token_refresh) ||
      isNullOrUndefined(this.idUser)
    ) {
      this.setRefreshToken = sessionStorage.getItem('refresh-token');
      this.setId = sessionStorage.getItem('id-user');
    }
    return this.httpClient
      .post<RefreshToken>(
        url,
        `grant_type=refresh_token&refresh_token=${this.getRefreshToken}`,
        {
          observe: 'response',
          headers: this.getJsonHeaders()
        }
      )
      .pipe(
        retry(2),
        map(res => {
          console.log('refreshToken', res);
          sessionStorage.clear();

          sessionStorage.setItem('access-token', res.body.access_token);
          sessionStorage.setItem('refresh-token', res.body.refresh_token);
          sessionStorage.setItem('id-user', this.getId);

          this.setToken = res.body.access_token;
          this.setRefreshToken = res.body.refresh_token;
          return res;
        })
      );
  }
}
