import { Budget } from '@interfaces/budgets/budget.interface';

export interface BudgetsResponse {
	amountTotal: number;
	spentAmountTotal: number;
	spentPercentageTotal: number;
	data: Budget[];
}
