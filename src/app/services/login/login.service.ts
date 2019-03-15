import { Injectable } from                   '@angular/core';
import {HttpResponse, HttpClient, HttpErrorResponse} from '@angular/common/http';

import { ConfigService } from                '../config/config.service';
import {ToastService} from                   '@services/toast/toast.service';

import { User } from                         '@interfaces/user.interface';
import { JWT } from                          '@interfaces/jwt.interface';
import {ToastInterface} from                 '@interfaces/toast.interface';

import { environment } from                  '@env/environment';

import {Observable, throwError} from         'rxjs';
import {catchError, map} from                'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.backendUrl}/login`;
  private readonly toast: ToastInterface;
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private toastService: ToastService
  ) {
    this.toast = {};
  }

  login( user: User ): Observable<HttpResponse<JWT>> {
    return this.httpClient
      .post<JWT>(
        this.url,
        JSON.stringify({ username: user.email, password: user.password }),
        { observe: 'response', headers: this.configService.getHeaders }
      )
      .pipe(
        map(res => {
          this.configService.setJWT = res.body;
          return res;
        }),
        catchError( (error: HttpErrorResponse) => {
          this.toast.code = error.status;
          if ( error.status === 0 ) {
            this.toastService.toastGeneral(this.toast);
          } else if ( error.status === 400 ) {
            this.toast.message = 'Te falto llenar un campo del formulario';
            this.toastService.toastGeneral(this.toast);
          } else if ( error.status === 401 ) {
            this.toast.code = 4011;
            this.toastService.toastGeneral(this.toast);
          } else if ( error.status === 500) {
            this.toast.message = 'Ocurrió un error al querer ingresar.<br>Intentalo más tarde';
            this.toastService.toastGeneral(this.toast);
          }
          return throwError(error);
        })
      );
  }
}
