import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { User } from '@interfaces/user.interface';

import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ToastService} from '@services/toast/toast.service';

@Injectable()
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private toastService: ToastService
  ) {}

  isAuth() {
    if (this.configService.getJWT) {
      const accessToken = this.configService.getJWT.access_token;
      if (accessToken.length > 0) {
        return true;
      }
    } else {
      return this.router.navigate([ '/access/login' ]);
    }
  }

  personalInfo(): Observable<HttpResponse<User>> {
    return this.httpClient
      .get<User>(`${environment.backendUrl}/me`, {
        observe: 'response',
        headers: this.configService.getHeaders
      })
      .pipe(
        map((res) => {
          this.configService.setUser = res.body;
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toastService.setCode = 4011;
            this.toastService.toastGeneral();
          }
          return throwError(error);
        })
      );
  }

  relateInviter(finerioCode): Observable<HttpResponse<User>> {
    const URL = `${environment.backendUrl}/relateInviter`;
    return this.httpClient.post<User>(URL, finerioCode, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }
}
