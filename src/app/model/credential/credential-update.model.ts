import {CredentialBaseInterface} from '@interfaces/credentials/base/credential-base.interface';
import {InstitutionInterface} from '@interfaces/institution.interface';

export class CredentialUpdateModel implements CredentialBaseInterface {

  readonly id: string;
  institution: InstitutionInterface;
  status: string;

  constructor( id: string, institution: InstitutionInterface, status: string ) {
    this.id = id;
    this.institution = institution;
    this.status = status;
  }

}
