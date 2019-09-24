import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {CredentialCreateModel} from '@app/model/credential/credential.create.model';

import {CredentialOauthResponse} from '@interfaces/credentials/oAuth/credential-oauth-response';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';

export interface CredentialOauthRequest {
  createCredential( credential: CredentialCreateModel ): Observable<HttpResponse<CredentialOauthResponse>>;
  updateCredential( credential: CredentialInterface ): Observable<HttpResponse<CredentialOauthResponse>>;
}
