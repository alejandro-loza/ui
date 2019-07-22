import { SubBudget } from './new-budget.interface';

export interface Budget {
	id: string;
	amount: number;
	name: string;
	userId: string;
	spentAmount: number;
	spentPercentage: number;
	categoryId: string;
	subBudgets?: SubBudget[];
}
