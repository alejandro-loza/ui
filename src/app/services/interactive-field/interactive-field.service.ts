import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {environment} from '@env/environment';

import {CredentialInterface} from '@interfaces/credential.interface';

import {ConfigService} from '@services/config/config.service';

@Injectable()
export class InteractiveFieldService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  findAllFields(credential: CredentialInterface) {
    const url = `${environment.backendUrl}/interactiveField`;
    let params: HttpParams = new HttpParams();
    params = params.append('credentialId', `${credential.id}`);

    return this.httpClient.get(url, {
      headers: this.configService.getHeaders,
      params: params
    });
  }

  sendToken(credential: CredentialInterface, data: any) {
    const url = `${environment.backendUrl}/interactiveField/send`;
    const body = {
      credentialId: credential.id,
      interactiveFields: data
    };
    const postBody = JSON.stringify(body);

    return this.httpClient.post(url, postBody, {
      headers: this.configService.getHeaders
    });
  }
}
