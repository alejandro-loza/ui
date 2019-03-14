import { Injectable } from                   '@angular/core';
import { HttpResponse, HttpClient } from     '@angular/common/http';
import { Router } from                       '@angular/router';

import { ConfigService } from                '../config/config.service';

import { User } from                         '@interfaces/user.interface';
import { JWT } from                          '@interfaces/jwt.interface';

import { environment } from                  '@env/environment';

import { Observable } from                   'rxjs';
import { map } from                          'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.backendUrl}/login`;
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

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
        })
      );
  }
}
