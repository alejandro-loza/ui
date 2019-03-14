import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {ConfigService} from '@services/config/config.service';
import {CredentialInterface} from '@interfaces/credential.interface';

@Injectable()
export class InteractiveFieldService {
  constructor(
    private http: HttpClient,
    private finerioService: ConfigService
  ) {}

  findAllFields(credential: CredentialInterface) {
    let url = `${environment.backendUrl}/interactiveField`;
    let params: HttpParams = new HttpParams();
    params = params.append('credentialId', `${credential.id}`);

    return this.http.get(url, {
      headers: this.finerioService.getHeaders,
      params: params
    });
  }

  sendToken(credential: CredentialInterface, data: any) {
    let url = `${environment.backendUrl}/interactiveField/send`;
    let body = {};
    body['credentialId'] = credential.id;
    body['interactiveFields'] = data;
    let postBody = JSON.stringify(body);

    return this.http.post(url, postBody, {
      headers: this.finerioService.getHeaders
    });
  }
}
