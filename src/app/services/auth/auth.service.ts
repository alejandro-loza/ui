import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { User } from '@app/shared/interfaces/authLogin.interface';
import { InfoUser } from '@interfaces/infoUser.interface';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RefreshToken } from '@interfaces/refreshToken.interface';

@Injectable()
export class AuthService {
  url = `${environment.backendUrl}/login`;
  user: User;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.getData();
  }

  isAuth() {
    return this.configService.getToken.length > 0 ? true : false;
  }

  getData() {
    if (sessionStorage.getItem('access-token')) {
      this.configService.setToken = sessionStorage.getItem('access-token');
    }
  }

  saveData(access_token: string, refresh_token: string) {
    sessionStorage.setItem('access-token', access_token);
    sessionStorage.setItem('refresh-token', refresh_token);

    this.configService.setToken = access_token;
    this.configService.setRefreshToken = refresh_token;
  }

  login(user: User): Observable<HttpResponse<RefreshToken>> {
    return this.httpClient
      .post<RefreshToken>(
        this.url,
        JSON.stringify({ username: user.email, password: user.password }),
        { observe: 'response', headers: this.configService.getJsonHeaders() }
      )
      .pipe(
        map(res => {
          this.saveData(res.body.access_token, res.body.refresh_token);
          this.getData();
          return res;
        })
      );
  }

  personalInfo(): Observable<HttpResponse<InfoUser>> {
    return this.httpClient
      .get<InfoUser>(`${environment.backendUrl}/me`, {
        observe: 'response',
        headers: this.configService.getJsonHeaders()
      })
      .pipe(
        map(res => {
          sessionStorage.setItem('id-user', res.body.id);
          this.configService.setId = res.body.id;
          return res;
        })
      );
  }
}
