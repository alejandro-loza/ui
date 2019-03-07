import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '@services/categories/categories.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { Category } from '@app/interfaces/category.interface';
import { Budget } from '@app/interfaces/budgets/budget.interface';

@Component({
	selector: 'app-new-budget',
	templateUrl: './new-budget.component.html',
	styleUrls: [ './new-budget.component.css' ]
})
export class NewBudgetComponent implements OnInit {
	showSpinner: boolean = true;
	categoriesList: any[] = [];
	categorySelectedToBudget: Category = null;
	budgets: Budget[] = null;

	constructor(
		private budgetsBeanService: BudgetsBeanService,
		private categoriesService: CategoriesService,
		private categoriesBeanService: CategoriesBeanService
	) {}

	ngOnInit() {
		this.budgets = this.budgetsBeanService.getBudgets();
		this.getCategoriesInfo();
	}

	getCategoriesInfo() {
		if (this.categoriesBeanService.getCategories().length === 0) {
			this.categoriesService.getCategoriesInfo().subscribe((res) => {
				this.categoriesList = res.body.data;
				this.cleanCategoriesWithExistingBudgets();
				this.showSpinner = false;
			});
		} else {
			this.categoriesList = this.categoriesBeanService.getCategories();
			this.cleanCategoriesWithExistingBudgets();
			this.showSpinner = false;
		}
	}

	cleanCategoriesWithExistingBudgets() {
		this.budgets.forEach((budget) => {
			for (let i = 0; i < this.categoriesList.length; i++) {
				if (budget.name == this.categoriesList[i].name || this.categoriesList[i].name == 'Ingresos') {
					this.categoriesList.splice(i, 1);
				}
			}
		});
	}

	selectCategory(category: Category) {
		this.budgetsBeanService.setCategoryToSharedComponent(category);
	}
}
