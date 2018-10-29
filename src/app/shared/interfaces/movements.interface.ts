import { Account } from './account.interfaces';
import { Concept } from './concept.interface';

export interface Movement {
    id: string;
    amount: number;
    balance: number;
    customDate: Date;
    customDescription: string;
    date: Date;
    dateCreated: Date;
    description: string;
    duplicated: true;
    lastUpdated: Date;
    type: string;
    account: Account;
    concept: Concept;
}
