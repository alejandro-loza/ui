import { FinancialInstitution } from './credentials/financialInstitution';

export class Account {

    id: string;
    type: string;
    institution: FinancialInstitution;
    name: string;
    number: string;
    dateCreated: Date;
    lastUpdated: Date;
    balance: number;
    nature:string;
    pendingDepositAmount: number;
    pendingChargeAmount: number;
    lastBalance: number;

    constructor() {
        this.institution = new FinancialInstitution();
    }

    static reviver(key: any, value: any): any {
         if(key === "dateCreated" || key === "lastPaymentDate" || key === "paymentDueDate" || key === "lastUpdated"){
             return new Date(value);
         }
        return value;
    }
}