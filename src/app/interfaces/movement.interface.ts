import { AccountInterface } from './account.interfaces';
import { Concept } from './concept.interface';

export interface Movement {
    account: AccountInterface;
    amount: number;
    balance: number;
    concepts: Concept[];
    customDate: string;
    customDescription: string;
    date: string;
    dateCreated: string;
    description: string;
    duplicated: true;
    hasConcepts: boolean;
    id: string;
    lastUpdated: string;
    type: string;
}
