import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { CredentialInterface } from '@interfaces/credential.interface';
import { CreateCredentialInterface } from '@interfaces/createCredential.interface';
import { Response } from '@interfaces/response.interface';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private url: string;
  private urlCredential: string;
  private userId: string;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.userId = sessionStorage.getItem('id-user');
    this.urlCredential = `${environment.backendUrl}/credentials`;
    this.url = `${environment.backendUrl}/users/${ this.userId }/credentials?deep=true`;
  }

  getCredential( credentialId: string ): Observable<HttpResponse<CredentialInterface>> {
    const urlCredential = `${this.urlCredential}/${credentialId}?deep=true`;
    return this.httpClient.get<CredentialInterface>( urlCredential, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    });
  }

  getAllCredentials( ): Observable<HttpResponse<Response<CredentialInterface>>> {
    let url = `${environment.backendUrl}/users/${ sessionStorage.getItem('id-user') }/credentials?deep=true`;
    return this.httpClient.get<Response<CredentialInterface>>(
      url,
      {
        observe: 'response',
        headers: this.configService.getJsonHeaders()
      }
    );
  }

  createCredential( credential: CreateCredentialInterface ): Observable<HttpResponse<CredentialInterface>> {
    const postBody = JSON.stringify(credential);
    return this.httpClient.post<CredentialInterface>(this.url, postBody, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    });
  }

  updateCredential( credential: CredentialInterface ): Observable<HttpResponse<CredentialInterface>> {
    const postBody = JSON.stringify(credential);
    const urlCredential = `${this.urlCredential}/${ credential.id }`;
    return this.httpClient.put<CredentialInterface>(urlCredential, postBody, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    });
  }

  deleteCredential( credentialId: string ): Observable<HttpResponse<CredentialInterface>> {
    const urlCredential = `${this.urlCredential}/${credentialId}`;
    return this.httpClient.delete<CredentialInterface>(urlCredential, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    });
  }
}
