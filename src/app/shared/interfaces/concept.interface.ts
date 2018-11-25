import { Category } from '@interfaces/category.interface';

export interface Concept {
    id: string;
    amount: number;
    description: string;
    type: string;
    movement: {};
    category: Category;
}
