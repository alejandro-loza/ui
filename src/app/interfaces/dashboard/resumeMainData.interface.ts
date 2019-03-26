import { Category } from '../category.interface';
import { Movement } from '../movement.interface';

export interface ResumeMainData{
    month:number,
    data:[{
        label:string;
        totalAmount:number;
        category:Category;
        categoryId:string;
        backgroundColor:string;
        details:Details[];
    }]
}

export interface Details{
    subCategory?:Category,
    backgroundColorSubCategory:string,
    totalAmount?:number,
    movements:Movement[]
}