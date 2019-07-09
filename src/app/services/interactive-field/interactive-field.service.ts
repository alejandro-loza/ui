import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import {ConfigService} from '@services/config/config.service';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {CredentialTokenRequest} from '@interfaces/credentials/credential-token-request';

import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable()
export class InteractiveFieldService implements CredentialTokenRequest {
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private readonly httpParams: HttpParams,
  ) {
    this.httpParams = new HttpParams();
  }

  getInteractiveField(credential: CredentialInterface): Observable<HttpResponse<any>> {

    const url = `${environment.backendUrl}/interactiveField`;

    this.httpParams.append('credentialId', `${credential.id}`);

    return this.httpClient.get<any>(url, {

      headers: this.configService.getHeaders,

      observe: 'response',

      params: this.httpParams

    });

  }

  sendToken(credential: CredentialInterface, data: any): Observable<HttpResponse<any>> {

    const url = `${environment.backendUrl}/interactiveField/send`;

    const body = JSON.stringify({
      credentialId: credential.id,
      interactiveFields: data
    });

    return this.httpClient.post<any>(url, body, {

      headers: this.configService.getHeaders,

      observe: 'response'

    });
  }
}
