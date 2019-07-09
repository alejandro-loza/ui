import {HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';

export interface CredentialTokenRequest {
  getInteractiveField(credential: CredentialInterface): Observable<HttpResponse<any>>;
  sendToken(credential: CredentialInterface, data: any): Observable<HttpResponse<any>>;
}
