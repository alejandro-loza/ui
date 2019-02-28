import { Injectable } from '@angular/core';
import { Budget } from '@app/interfaces/budgets/budget.interface';
import { Category } from '@app/interfaces/category.interface';

@Injectable({
	providedIn: 'root'
})
export class BudgetsBeanService {
	private budgets: Budget[] = [];
	private budgetToViewDetails: Budget = null;
	private categoryToCreateNewBudget: Category = null;
	private loadInformation: boolean = true;
	private showEmptyState: boolean = false;

	constructor() {}

	public setBudgets(data: Budget[]) {
		this.budgets = data;
	}

	public getBudgets(): Budget[] {
		return this.budgets;
	}

	public setBudgetToViewDetails(data: Budget) {
		this.budgetToViewDetails = data;
	}

	public getBudgetToViewDetails(): Budget {
		return this.budgetToViewDetails;
	}

	public setCategoryToCreateNewBudget(data: Category) {
		this.categoryToCreateNewBudget = data;
	}

	public getCategoryToCreateNewBudget(): Category {
		return this.categoryToCreateNewBudget;
	}

	public setLoadInformation(data: boolean) {
		this.loadInformation = data;
	}

	public getLoadInformation(): boolean {
		return this.loadInformation;
	}

	public setShowEmptyStates(data: boolean) {
		this.showEmptyState = data;
	}

	public getShowEmptyStates(): boolean {
		return this.showEmptyState;
	}
}
