import { AccountInterface } from './account.interfaces';
import { Concept } from './concept.interface';

export interface Movement {
    account: AccountInterface;
    amount: number;
    balance: number;
    concepts: Concept[];
    customDate: Date;
    customDescription: string;
    formatDate?: string;
    date: Date;
    dateCreated: Date;
    dateDeleted?: Date;
    description: string;
    duplicated: true;
    hasConcepts: boolean;
    id: string;
    lastUpdated: string;
    type: string;
}
