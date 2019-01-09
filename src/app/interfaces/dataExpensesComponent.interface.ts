import { Movement } from './movement.interface';
import { Category } from './category.interface';

export interface ExpensesData {
    month:number
    year:number
    category: Category
    amount:number
    details:[
        {
            subCategory:string,
            amount:number,
            movements:{
                movement:Movement[]
            }
        }
    ]
}