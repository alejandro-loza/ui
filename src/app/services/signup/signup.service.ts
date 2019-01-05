import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { Signup } from '@interfaces/signup.interface';

import { ConfigService } from '@services/config/config.service';

import { Observable } from 'rxjs';
import { UserInterface } from '@interfaces/user.interface';

@Injectable()
export class SignupService {
  private headers = new HttpHeaders();
  url: string = environment.backendUrl;
  data: Signup;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  signup(data: Signup): Observable<HttpResponse<UserInterface>> {
    const body = JSON.stringify({
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirm,
      termsAndConditionsAccepted: data.termsAndConditions,
      blog: data.blog
    });

    return this.http
      .post<UserInterface>(`${this.url}/users`, body, {
        observe: 'response',
        headers: this.configService.getJsonHeaders()
      });
  }
}
