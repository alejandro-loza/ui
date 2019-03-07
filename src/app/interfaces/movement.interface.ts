import { AccountInterface } from './account.interfaces';
import { Concept } from './concept.interface';

export interface Movement {
  account: AccountInterface;
  amount: number;
  balance: number;
  concepts: Concept[];
  customAmount?: number;
  customDate: Date;
  customDescription: string;
  date: Date;
  dateCreated: Date;
  dateDeleted?: Date;
  description: string;
  duplicated: true;
  editAvailable?: boolean;
  formatDate?: string;
  hasConcepts: boolean;
  readonly id: string;
  lastUpdated: string;
  type: string;
}
