import { Movement } from './movement.interface';
import { Category } from './category.interface';

export interface DataForCharts {
    referenceDate:Date;
    category: Category;
    totalValue:number;
    movementsPerCategory:Movement[];
    details:[
        {
            subCategory:Category;
            totalValue:number;
            movementsPerSubCategory:{ 
                movement:Movement[]; 
            }
        }
    ]
}