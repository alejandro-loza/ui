import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {CredentialCreateModel} from '@model/credential/credential.create.model';
import {CredentialUpdateModel} from '@model/credential/credential-update.model';

import {ConfigParamsService} from '@params/config/config-params.service';

import {CredentialOauthRequest} from '@interfaces/credentials/oAuth/credential-oauth-request';
import {CredentialOauth} from '@interfaces/credentials/oAuth/credential-oauth';

import {ConfigService} from '@services/config/config.service';

import {environment} from '@env/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastService} from '@services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialOauthRequestService implements CredentialOauthRequest {

  constructor(
    private configService: ConfigService,
    private configParamsService: ConfigParamsService,
    private httpClient: HttpClient
  ) { }

  createCredential( credential: CredentialCreateModel ): Observable<HttpResponse<CredentialOauth>> {

    const id = this.configService.getUser.id;

    const url = `${environment.xuangaUrl}/users/${ id }/credentials`;

    const headers = this.configService.getHeaders;

    const params = this.configParamsService.getConfigParams;

    return this.httpClient.post<CredentialOauth>( url, credential, { observe: 'response', headers, params } );

  }

  updateCredential( credential: CredentialUpdateModel ): Observable<HttpResponse<CredentialOauth>> {

    const body = JSON.stringify( credential );

    const url = `${environment.xuangaUrl}/credentials/${ credential.id }`;

    const headers = this.configService.getHeaders;

    const params = this.configParamsService.getConfigParams;

    return this.httpClient.put<CredentialOauth>( url, body, { observe: 'response', headers, params } );

  }

}
