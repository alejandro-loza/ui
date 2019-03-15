import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { Signup } from '@interfaces/signup.interface';
import { User } from '@interfaces/user.interface';

import { ConfigService } from '@services/config/config.service';

import { Observable } from 'rxjs';

@Injectable()
export class SignupService {
  url: string = environment.backendUrl;
  data: Signup;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  signup(data: Signup): Observable<HttpResponse<User>> {
    const body = JSON.stringify({
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirm,
      termsAndConditionsAccepted: data.termsAndConditions,
      blog: data.blog
    });

    return this.http
      .post<User>(`${this.url}/users`, body, {
        observe: 'response',
        headers: this.configService.getHeaders
      });
  }
}
