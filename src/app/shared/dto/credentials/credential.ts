import { FinancialInstitution } from './financialInstitution';

export class Credential {
    id: number;
    securityCode: string;
    username: string;
    password: string;
    institution: FinancialInstitution;
    txDate: string;
    status: string;
    errorCode: string;
    errorDescription: string;
}