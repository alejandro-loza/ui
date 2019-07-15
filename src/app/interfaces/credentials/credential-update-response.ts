import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {Subscription} from 'rxjs';

export interface CredentialUpdateResponse {
  checkCredentialSyncing ( credential: CredentialInterface, subscription: Subscription );
}
