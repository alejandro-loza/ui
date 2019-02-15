import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { LoginInterface } from '@interfaces/authLogin.interface';
import { UserInterface } from '@interfaces/user.interface';
import { Token } from '@interfaces/token.interface';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  url = `${environment.backendUrl}/login`;
  user: LoginInterface;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {}

  isAuth() {
    const accessToken = sessionStorage.getItem('access-token');
    return accessToken.length > 0 ? true : this.router.navigate(['/access/login']);
  }

  saveData(token: Token) {
    sessionStorage.setItem('access-token', token.access_token);
    sessionStorage.setItem('refresh-token', token.refresh_token);

    this.configService.setAccessToken = token.access_token;
    this.configService.setRefreshToken = token.refresh_token;
  }

  login(user: LoginInterface): Observable<HttpResponse<Token>> {
    return this.httpClient
      .post<Token>(
        this.url,
        JSON.stringify({ username: user.email, password: user.password }),
        { observe: 'response', headers: this.configService.getJsonHeaders() }
      )
      .pipe(
        map(res => {
          sessionStorage.clear();
          this.saveData(res.body);
          return res;
        })
      );
  }

  personalInfo(): Observable<HttpResponse<UserInterface>> {
    return this.httpClient
      .get<UserInterface>(`${environment.backendUrl}/me`, {
        observe: 'response',
        headers: this.configService.getJsonHeaders()
      })
      .pipe(
        map(res => {
          sessionStorage.setItem('id-user', res.body.id);
          this.configService.setId = res.body.id;
          this.configService.setAccessToken = sessionStorage.getItem(
            'access-token'
          );
          this.configService.setRefreshToken = sessionStorage.getItem(
            'refresh-token'
          );
          return res;
        })
      );
  }
}
