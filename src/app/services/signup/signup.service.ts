import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { Signup } from '@interfaces/signup.interface';

import { ConfigService } from '@services/config/config.service';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InfoUser } from '@app/shared/interfaces/infoUser.interface';

@Injectable()
export class SignupService {
  private headers = new HttpHeaders();
  url: string = environment.backendUrl;
  data: Signup;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  signup(data: Signup): Observable<HttpResponse<InfoUser>> {
    const body = JSON.stringify({
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirm,
      termsAndConditionsAccepted: data.termsAndConditions,
      blog: data.blog
    });

    return this.http
      .post<InfoUser>(`${this.url}/users`, body, {
        observe: 'response',
        headers: this.configService.getJsonHeaders()
      });
  }
}
