import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {environment} from '@env/environment';

import {ConfigService} from '@services/config/config.service';

import {User} from '@interfaces/user.interface';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {}

  isAuth() {
    if (this.configService.getJWT) {
      const accessToken = this.configService.getJWT.access_token;
      if (accessToken.length > 0) {
        return true;
      }
    } else {
      return this.router.navigate(['/access/login']);
    }
  }

  personalInfo(): Observable<HttpResponse<User>> {
    return this.httpClient
      .get<User>(`${environment.backendUrl}/me`, {
        observe: 'response',
        headers: this.configService.getHeaders
      })
      .pipe(
        map(res => {
          this.configService.setUser = res.body;
          return res;
        })
      );
  }
}
