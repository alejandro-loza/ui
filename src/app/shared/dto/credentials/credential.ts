import { InstitutionInterface } from '@interfaces/institution.interface';

export interface Credential {
    id: number;
    securityCode: string;
    username: string;
    password: string;
    institution: InstitutionInterface;
    txDate: string;
    status: string;
    errorCode: string;
    errorDescription: string;
}
