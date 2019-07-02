import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '@env/environment';

import {ConfigService} from '@services/config/config.service';
import {ConfigParamsService} from '@params/config/config-params.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';

import {CredentialInterface} from '@interfaces/credential.interface';
import {CreateCredentialInterface} from '@interfaces/createCredential.interface';
import {Response} from '@interfaces/response.interface';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private configParams: ConfigParamsService,
    private statefulCredentialService: StatefulCredentialsService
  ) { }

  getCredential( credential_id: string ): Observable<HttpResponse<CredentialInterface>> {
    const url = `${environment.backendUrl}/credentials/${credential_id}`;
    return this.httpClient.get<CredentialInterface>( url, {
      observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParams.getConfigParams
    });
  }

  getAllCredentials( ): Observable<HttpResponse<Response<CredentialInterface>>> {
    const id = this.configService.getUser.id;
    const url = `${environment.backendUrl}/users/${ id }/credentials`;
    return this.httpClient.get<Response<CredentialInterface>>(
      url,
      {
        observe: 'response',
        headers: this.configService.getHeaders,
        params: this.configParams.getConfigParams
      }
    ).pipe(
      map( res => {
          this.statefulCredentialService.credentials = res.body.data;
          return res;
        }
      ));
  }

  createCredential( credential: CreateCredentialInterface ): Observable<HttpResponse<CredentialInterface>> {
    const id = this.configService.getUser.id;
    const url = `${environment.backendUrl}/users/${ id }/credentials`;
    const postBody = JSON.stringify(credential);
    return this.httpClient.post<CredentialInterface>(url, postBody, {
      observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParams.getConfigParams
    });
  }

  updateCredential( credential: CredentialInterface ): Observable<HttpResponse<CredentialInterface>> {
    const postBody = JSON.stringify(credential);
    const url = `${environment.backendUrl}/credentials/${credential.id}`;
    return this.httpClient.put<CredentialInterface>(url, postBody, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }

  deleteCredential( credentialId: string ): Observable<HttpResponse<CredentialInterface>> {
    const url = `${environment.backendUrl}/credentials/${credentialId}`;
    return this.httpClient.delete<CredentialInterface>(url, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }
}
