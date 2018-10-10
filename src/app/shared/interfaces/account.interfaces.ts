import { Institution } from  './institution.interface';
import { InfoUser } from     '@interfaces/infoUser.interface';

export interface Account {
    id: string;
    balance: number;
    dateCreated: Date;
    deleted: boolean;
    lastUpdated: Date;
    name: string;
    nature: string;
    number: number;
    type: string;
    availableBalance?: number;
    user: {
        id: InfoUser['id'];
    };
    institution: Institution;
}
