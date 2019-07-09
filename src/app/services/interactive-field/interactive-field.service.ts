import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import {environment} from '@env/environment';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';

import {ConfigService} from '@services/config/config.service';
import {Observable} from 'rxjs';

@Injectable()
export class InteractiveFieldService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  findAllFields(credential: CredentialInterface): Observable<HttpResponse<any>> {
    const url = `${environment.backendUrl}/interactiveField`;
    let params: HttpParams = new HttpParams();
    params = params.append('credentialId', `${credential.id}`);

    return this.httpClient.get<any>(url, {
      headers: this.configService.getHeaders,
      params: params
    });
  }

  sendToken(credential: CredentialInterface, data: any): Observable<HttpResponse<any>> {
    const url = `${environment.backendUrl}/interactiveField/send`;
    const body = {
      credentialId: credential.id,
      interactiveFields: data
    };
    const postBody = JSON.stringify(body);

    return this.httpClient.post<any>(url, postBody, {
      headers: this.configService.getHeaders
    });
  }
}
