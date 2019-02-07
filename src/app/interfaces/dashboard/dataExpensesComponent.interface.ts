import { Movement } from '../movement.interface';
import { Category } from '../category.interface';
import { monthMovement } from './monthMovement.interface';

export interface ExpensesMainData {
   firstScreen:ExpensesFirstScreen,
   secondScreen:ExpensesSecondScreen[]
}

export interface PreDetails{
    Category:Category,
    Movements: monthMovement[]
}

export interface ExpensesFirstScreen{
    labels:string[];
    totalAmount:number[];
    category:Category[];
    categoryId:string[];
    backgroundColor:string[];
}

export interface ExpensesSecondScreen{
    parentCategory:string,
    details:[{
        subCategory?:Category,
        backgroundColorSubCategory:string,
        totalAmount?:number,
        movements:Movement[]
    }]
}