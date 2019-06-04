import { Category } from '@interfaces/category.interface';

export interface Concept {
    amount?: number;
    description?: string;
    id?: string;
    movement?: {};
    type?: string;
    category?: Category;
}
