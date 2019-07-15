import {Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import {ConfigService} from '@services/config/config.service';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {CredentialTokenRequest} from '@interfaces/credentials/credential-token-request';

import {environment} from '@env/environment';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InteractiveFieldService implements CredentialTokenRequest {
  constructor(

    private configService: ConfigService,
    private httpClient: HttpClient

  ) { }

  postToken(credential: CredentialInterface, token: string): Observable<HttpResponse<any>> {

    const url = `${environment.backendUrl}/interactiveField/send`;

    const body = JSON.stringify({
      credentialId: credential.id,
      interactiveFields : { token: token }
    });

    return this.httpClient.post<any>(url, body, {

      headers: this.configService.getHeaders,

      observe: 'response'

    });

  }
}
