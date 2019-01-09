import { InstitutionInterface } from  './institution.interface';
import { UserInterface } from     '@interfaces/user.interface';

export interface AccountInterface {

    availableBalance?: number;
    balance: number;
    dateCreated: string;
    deleted: boolean;
    id: string;
    institution: InstitutionInterface;
    lastUpdated: string;
    name: string;
    nature: string;
    number: string;
    type: string;
    user: UserInterface;
}
