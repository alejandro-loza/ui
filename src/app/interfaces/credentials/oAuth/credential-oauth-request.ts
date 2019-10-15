import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {CredentialCreateModel} from '@app/model/credential/credential.create.model';

import {CredentialBaseInterface} from '@interfaces/credentials/base/credential-base.interface';
import {CredentialUpdateModel} from '@model/credential/credential-update.model';

export interface CredentialOauthRequest {
  createCredential( credential: CredentialCreateModel ): Observable<HttpResponse<CredentialBaseInterface>>;
  updateCredential( credential: CredentialUpdateModel ): Observable<HttpResponse<CredentialBaseInterface>>;
}
