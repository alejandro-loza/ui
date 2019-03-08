import { Category } from '../category.interface';

export interface Budget {
	amount: number;
	category: Category;
	id: string;
	name: string;
	spentAmount: number;
	spentPercentage: number;
	subBudgets?: Budget[];
	parent?: string;
	user: {
		id: string;
	};
}
