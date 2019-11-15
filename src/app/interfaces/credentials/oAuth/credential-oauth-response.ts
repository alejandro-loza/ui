import {CredentialStatusEnum} from '@interfaces/credentials/oAuth/credential-status.enum';
import {AccountInterface} from '@interfaces/account.interfaces';

export interface CredentialOauthResponse {
  status: CredentialStatusEnum;
  account?: AccountInterface;
}
