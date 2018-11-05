import { Movement } from '@interfaces/movement.interface';

export interface Movements {
    data: {
        [index: number]:  Movement
    };
    size: number;
}
