import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';

import { ConfigService } from '../config/config.service';

import { JWT } from '@interfaces/jwt.interface';

import { Observable, throwError } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorsService {
  constructor(private configService: ConfigService) {}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const jwt: JWT = this.configService.getJWT;
    if (!isNullOrUndefined(jwt)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt.access_token}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.configService.refreshToken();
          this.intercept(req, next);
        }
        return throwError(error);
      })
    );
  }
}

export const HttpInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorsService, multi: true }
];
