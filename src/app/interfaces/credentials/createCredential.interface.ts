import { InstitutionInterface } from '@interfaces/institution.interface';

export interface CreateCredentialInterface {
  institution: InstitutionInterface;
  password: string;
  securityCode: string;
  username: string;
}
