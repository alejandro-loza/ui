import { Category } from '@interfaces/category.interface';

export interface Concept {
    [ index: number ]: {
        id: string;
        amount: number;
        description: string;
        type: string;
        movement: {};
        category: Category;
    }
}
