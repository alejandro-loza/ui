import { InstitutionInterface } from '@interfaces/institution.interface';

export class Account {

    id: string;
    type: string;
    institution: InstitutionInterface;
    name: string;
    number: string;
    dateCreated: Date;
    lastUpdated: Date;
    balance: number;
    nature: string;
    pendingDepositAmount: number;
    pendingChargeAmount: number;
    lastBalance: number;

    constructor() {
        this.institution = {
            code: null,
            id: null,
            name: null,
            status: null
        };
    }

    static reviver(key: any, value: any): any {
         if (key === 'dateCreated' || key === 'lastPaymentDate' || key === 'paymentDueDate' || key === 'lastUpdated'){
             return new Date(value);
         }
        return value;
    }
}