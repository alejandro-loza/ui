import { Account } from './account.interfaces';
import { Concept } from './concept.interface';

export interface Movement {
    account: Account;
    amount: number;
    balance: number;
    concepts: Concept[];
    customDate: Date;
    customDescription: string;
    date: Date;
    dateCreated: Date;
    description: string;
    duplicated: true;
    hasConcepts: boolean;
    id: string;
    lastUpdated: Date;
    type: string;
}
