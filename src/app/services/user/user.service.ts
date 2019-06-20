import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {environment} from '@env/environment.prod';

import {User} from '@interfaces/user.interface';

import {ConfigService} from '@services/config/config.service';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {isUndefined} from 'util';
import {ToastService} from '@services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private toastService: ToastService
  ) { }

  updateUser(user: User): Observable<HttpResponse<User>> {
    if (isUndefined(this.configService.getUser) ) {
      this.toastService.setCode = 400;
      this.toastService.setMessage = 'Ocurrió un error al guardar tu nombre';
      this.toastService.toastGeneral();
      return throwError(new HttpErrorResponse({}));
    }
    const url = `${environment.backendUrl}/users/${this.configService.getUser.id}`;
    return this.httpClient.put<User>(
      url,
      JSON.stringify(user),
      {
        observe: 'response',
        headers: this.configService.getHeaders
      }
    ).pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastService.setCode = err.status;
          this.toastService.setMessage = 'Ocurrió un error al guardar tu nombre';
          this.toastService.toastGeneral();
          return throwError(err);
        })
     );
  }
}
