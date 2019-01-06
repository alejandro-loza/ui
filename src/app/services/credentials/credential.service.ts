import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { CredentialsInterface } from '@interfaces/crendetials.interface';
import { CredentialInterface } from '@interfaces/credential.interface';

import { Observable } from 'rxjs';
import { CreateCredentialInterface } from '@interfaces/createCredential.interface';

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
    this.urlCredential = `${this.urlCredential}/${credentialId}?deep=true`;
    return this.httpClient.get<CredentialInterface>( this.urlCredential, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    });
  }

  getAllCredentials( ): Observable<HttpResponse<CredentialsInterface>> {
    return this.httpClient.get<CredentialsInterface>(
      this.url,
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
    this.urlCredential = `${this.urlCredential}/${ credential.id }`;
    return this.httpClient.put<CredentialInterface>(this.urlCredential, postBody, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    });
  }

  deleteCredential( credentialId: string ): Observable<HttpResponse<CredentialInterface>> {
    this.urlCredential = `${this.urlCredential}/${credentialId}`;
    return this.httpClient.delete<CredentialInterface>(this.urlCredential, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    });
  }
}
