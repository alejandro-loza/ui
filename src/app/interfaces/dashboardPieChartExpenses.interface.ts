import { Category } from './category.interface';
import { Movement } from './movement.interface';

export interface ExpensesPieChart{
    category:Category;
    categoryName:string;
    value:number;
    movements:Movement[];
}