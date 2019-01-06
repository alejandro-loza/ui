import { InstitutionInterface } from '@interfaces/institution.interface';

export class Account {

    balance: number;
    dateCreated: Date;
    id: string;
    institution: InstitutionInterface;
    lastBalance: number;
    lastUpdated: Date;
    name: string;
    number: string;
    nature: string;
    pendingDepositAmount: number;
    pendingChargeAmount: number;
    type: string;

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