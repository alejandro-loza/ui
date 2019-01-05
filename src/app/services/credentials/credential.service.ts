import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { CredentialsInterface } from '@interfaces/crendetials.interface';
import { CredentialInterface } from '@interfaces/credential.interface';

import { Credential } from '@shared/dto/credentials/credential';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private url: string;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.url = `${environment.backendUrl}/users`;
  }

  getCredential(credentialId): Observable<HttpResponse<CredentialInterface>> {
    const url = `${
      environment.backendUrl
    }/credentials/${credentialId}?deep=true`;
    return this.httpClient
      .get<CredentialInterface>(url, {
        observe: 'response',
        headers: this.configService.getJsonHeaders()
      });
  }

  getAllCredentials(
    userId: String
  ): Observable<HttpResponse<CredentialsInterface>> {
    return this.httpClient.get<CredentialsInterface>(
      `${this.url}/${userId}/credentials?deep=true`,
      {
        observe: 'response',
        headers: this.configService.getJsonHeaders()
      }
    );
  }

  createCredential(credential: Credential) {
    let userId = sessionStorage.getItem('id-user');
    let url = `${this.url}/${userId}/credentials`;
    let postBody = JSON.stringify(credential);

    return this.httpClient.post(url, postBody, {
      headers: this.configService.getJsonHeaders()
    });
  }

  updateCredential(credential) {
    let postBody = JSON.stringify(credential);
    let url = `${environment.backendUrl}/credentials/${credential.id}`;
    return this.httpClient.put(url, postBody, {
      headers: this.configService.getJsonHeaders()
    });
  }

  deleteCredential(credentialId: string) {
    let url = `${environment.backendUrl}/credentials/${credentialId}`;
    return this.httpClient
      .delete(url, { headers: this.configService.getJsonHeaders() })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
