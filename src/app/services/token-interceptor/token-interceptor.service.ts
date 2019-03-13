import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private configService: ConfigService) {
    console.log(this.configService.getJWT);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.configService.getJWT) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.configService.getJWT.accessToken}`
        }
      });
    }
    return next.handle(req);
  }
}
