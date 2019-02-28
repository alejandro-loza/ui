import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '@services/categories/categories.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { Category } from '@app/interfaces/category.interface';

@Component({
	selector: 'app-new-budget',
	templateUrl: './new-budget.component.html',
	styleUrls: [ './new-budget.component.css' ]
})
export class NewBudgetComponent implements OnInit {
	showSpinner: boolean = true;
	categoriesList: Category[] = [];
	categorySelectedToBudget: Category = null;

	constructor(
		private budgetsBeanService: BudgetsBeanService,
		private categoriesService: CategoriesService,
		private categoriesBeanService: CategoriesBeanService
	) {}

	ngOnInit() {
		this.getCategoriesInfo();
	}

	getCategoriesInfo() {
		if (this.categoriesBeanService.getCategories().length === 0) {
			this.categoriesService.getCategoriesInfo().subscribe((res) => {
				this.categoriesList = res.body.data;
				this.showSpinner = false;
			});
		} else {
			this.categoriesList = this.categoriesBeanService.getCategories();
			this.showSpinner = false;
		}
	}

	selectCategory(category: Category) {
		this.budgetsBeanService.setCategoryToCreateNewBudget(category);
	}
}
