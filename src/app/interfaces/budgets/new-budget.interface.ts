import { Category } from '../category.interface';
import { Budget } from './budget.interface';

export interface NewBudget {
	amount: number;
	category: Category;
	subBudgets: SubBudget[];
	user: {
		id?: string;
	};
}

export interface SubBudget {
	amount: number;
	category: Category;
	name: string;
	id: string;
	spentAmount: number;
	spentPercentage: number;
	user: {
		id: string;
	};
}
