import {CreateCredentialInterface} from '@interfaces/credentials/createCredential.interface';
import {InstitutionInterface} from '@interfaces/institution.interface';

export class CredentialCreateModel implements CreateCredentialInterface {
  institution: InstitutionInterface;
  password: string;
  securityCode: string;
  username: string;

  constructor( institution: InstitutionInterface, username?: string, password?: string, securityCode?: string ) {
    this.institution = institution;
    ( username ) ? this.username = username : this.username = 'username';
    ( password ) ? this.password = password : this.password = 'password';
    ( securityCode ) ? this.securityCode = securityCode : this.securityCode = 'securityCode';
  }
}
