import {HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';

export interface CredentialTokenRequest {
  postToken(credential: CredentialInterface, token: string): Observable<HttpResponse<any>>;
}
