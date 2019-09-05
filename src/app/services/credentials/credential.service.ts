import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '@env/environment';

import {ConfigService} from '@services/config/config.service';
import {ConfigParamsService} from '@params/config/config-params.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {EditCredentialListService} from '@services/credentials/edit-list/edit-credential-list.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {CreateCredentialInterface} from '@interfaces/credentials/createCredential.interface';
import {Response} from '@interfaces/response.interface';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CredentialCreateModel} from '@app/model/credential/credential.create.model';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private configParamsService: ConfigParamsService,
    private statefulCredentialsService: StatefulCredentialsService,
    private statefulCredentialService: StatefulCredentialService,
    private editCredentialsService: EditCredentialListService,
  ) { }

  getCredential( credential_id: string ): Observable<HttpResponse<CredentialInterface>> {
    const url = `${environment.backendUrl}/credentials/${credential_id}`;
    return this.httpClient.get<CredentialInterface>( url, {
      observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParamsService.getConfigParams
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
        params: this.configParamsService.getConfigParams
      }
    ).pipe(
      map( res => {
          this.statefulCredentialsService.credentials = res.body.data;
          return res;
        }
      ));
  }

  createCredential( credential: CreateCredentialInterface | CredentialCreateModel ): Observable<HttpResponse<CredentialInterface>> {
    const id = this.configService.getUser.id;
    const url = `${environment.backendUrl}/users/${ id }/credentials`;
    const postBody = JSON.stringify(credential);
    return this.httpClient.post<CredentialInterface>(url, postBody, {
      observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParamsService.getConfigParams
    }).pipe(
      map( res => {
        this.statefulCredentialService.credential = res.body;
        this.editCredentialsService.addCredential();
        return res;
      })
    );
  }

  updateCredential( credential: CredentialInterface ): Observable<HttpResponse<CredentialInterface>> {
    const postBody = JSON.stringify(credential);
    const url = `${environment.backendUrl}/credentials/${credential.id}`;
    return this.httpClient.put<CredentialInterface>(url, postBody, {
      observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParamsService.getConfigParams
    }).pipe(
      map( res => {
        this.statefulCredentialService.credential = res.body;
        this.editCredentialsService.updateCredential();
        return res;
      })
    );
  }

  deleteCredential( credentialId: string ): Observable<HttpResponse<CredentialInterface>> {
    const url = `${environment.backendUrl}/credentials/${credentialId}`;
    return this.httpClient.delete<CredentialInterface>(url, {
      observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParamsService.getConfigParams
    }).pipe(
      map( res => {
        this.statefulCredentialService.credential = res.body;
        this.editCredentialsService.deleteCredential();
        return res;
      })
    );
  }
}
