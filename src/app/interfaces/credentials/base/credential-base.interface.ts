import {InstitutionInterface} from '@interfaces/institution.interface';

export interface CredentialBaseInterface {
  readonly id: string;
  institution: InstitutionInterface;
  status: string;
}
