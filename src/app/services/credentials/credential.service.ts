import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '@env/environment';

import {ConfigService} from '@services/config/config.service';
import {ConfigParamsService} from '@params/config/config-params.service';

import {CredentialInterface} from '@interfaces/credential.interface';
import {CreateCredentialInterface} from '@interfaces/createCredential.interface';
import {Response} from '@interfaces/response.interface';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private url: string;
  private urlCredential: string;
  private userId: string;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private configParams: ConfigParamsService
  ) {
    this.userId = this.configService.getUser.id;
    this.urlCredential = `${environment.backendUrl}/credentials`;
    this.url = `${environment.backendUrl}/users/${ this.userId }/credentials`;
  }

  getCredential( credentialId: string ): Observable<HttpResponse<CredentialInterface>> {
    const urlCredential = `${this.urlCredential}/${credentialId}`;
    return this.httpClient.get<CredentialInterface>( urlCredential, {
      observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParams.getParams
    });
  }

  getAllCredentials( ): Observable<HttpResponse<Response<CredentialInterface>>> {
    let url = `${environment.backendUrl}/users/${ this.userId }/credentials`;
    return this.httpClient.get<Response<CredentialInterface>>(
      url,
      {
        observe: 'response',
        headers: this.configService.getHeaders,
        params: this.configParams.getParams
      }
    );
  }

  createCredential( credential: CreateCredentialInterface ): Observable<HttpResponse<CredentialInterface>> {
    const postBody = JSON.stringify(credential);
    return this.httpClient.post<CredentialInterface>(this.url, postBody, {
      observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParams.getParams
    });
  }

  updateCredential( credential: CredentialInterface ): Observable<HttpResponse<CredentialInterface>> {
    const postBody = JSON.stringify(credential);
    const urlCredential = `${this.urlCredential}/${ credential.id }`;
    return this.httpClient.put<CredentialInterface>(urlCredential, postBody, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }

  deleteCredential( credentialId: string ): Observable<HttpResponse<CredentialInterface>> {
    const urlCredential = `${this.urlCredential}/${credentialId}`;
    return this.httpClient.delete<CredentialInterface>(urlCredential, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }
}
