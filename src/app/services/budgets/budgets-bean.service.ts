import { Injectable } from '@angular/core';
import { Budget } from '@app/interfaces/budgets/budget.interface';
import { Category } from '@app/interfaces/category.interface';

@Injectable({
	providedIn: 'root'
})
export class BudgetsBeanService {
	private budgets: Budget[] = [];
	private budgetToViewDetails: Budget = null;
	private budgetToEdit: Budget = null;
	private categoryToSharedComponent: Category = null;
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

	public setBudgetToEdit(data: Budget) {
		this.budgetToEdit = data;
	}

	public getBudgetToEdit(): Budget {
		return this.budgetToEdit;
	}

	public setCategoryToSharedComponent(data: Category) {
		this.categoryToSharedComponent = data;
	}

	public getCategoryToSharedComponent(): Category {
		return this.categoryToSharedComponent;
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
