import {CredentialInterface} from '@interfaces/credentials/credential.interface';

export interface CredentialOauth extends CredentialInterface {
  authorizationUri: string;
  scrapperCredentialId: string;
  securityCode: string;
}
