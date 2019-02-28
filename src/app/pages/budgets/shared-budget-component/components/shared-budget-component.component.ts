import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { BudgetsService } from '@services/budgets/budgets.service';
import { Category } from '@app/interfaces/category.interface';
import { isNullOrUndefined } from 'util';
import { NewBudget, SubBudget } from '@interfaces/budgets/new-budget.interface';

@Component({
	selector: 'app-shared-budget-component',
	templateUrl: './shared-budget-component.component.html',
	styleUrls: [ './shared-budget-component.component.css' ]
})
export class SharedBudgetComponentComponent implements OnInit {
	setHeightToCol: string = '';
	categorySelected: Category = null;
	budgetToCreate: NewBudget = {
		amount: 0,
		category: null,
		subBudgets: [],
		user: { id: '' }
	};
	categoryInputModel: number = 0;
	subBudgets: SubBudget[] = [];

	constructor(
		private budgetsBeanService: BudgetsBeanService,
		private router: Router,
		private budgetsService: BudgetsService
	) {
		this.categorySelected = this.budgetsBeanService.getCategoryToCreateNewBudget();
		if (isNullOrUndefined(this.categorySelected)) {
			this.router.navigateByUrl('/app/budgets');
		}
	}

	ngOnInit() {
		setTimeout(() => {
			this.setHeightToCol = this.getHeightOfSubcatsContainer().toString() + 'px';
		}, 50);
	}

	submit(form: NgForm) {
		this.doDataProcessForPost(form);
	}

	doDataProcessForPost(form: NgForm) {
		const ARRAY_WITH_KEYS = Object.keys(form.value);
		ARRAY_WITH_KEYS.forEach((key) => {
			if (typeof form.value[key] === 'number' && key !== this.categorySelected.name) {
				this.fillSubBudgets(form, key);
			}
		});
		this.makeBudgetStructure();
		console.log(this.budgetToCreate);
		this.budgetsService.createBudget(this.budgetToCreate).subscribe(
			(res) => {
				if (res.status === 200) {
					this.budgetsBeanService.setLoadInformation(true);
					this.router.navigateByUrl('/app/budgets');
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}

	makeBudgetStructure() {
		this.budgetToCreate.amount = this.categoryInputModel;
		this.budgetToCreate.category = this.categorySelected;
		this.budgetToCreate.subBudgets = this.subBudgets;
		this.budgetToCreate.user.id = sessionStorage.getItem('id-user');
	}

	fillSubBudgets(form: NgForm, key: string) {
		this.subBudgets.push({
			amount: form.value[key],
			category: this.getSubcategory(key),
			name: key
		});
	}

	getTotalAmount(form: NgForm) {
		let totalAmount: number = 0;
		this.categoryInputModel = 0;

		const ARRAY_WITH_KEYS = Object.keys(form.value);
		ARRAY_WITH_KEYS.forEach((key) => {
			if (typeof form.value[key] === 'number' && key !== this.categorySelected.name) {
				totalAmount += form.value[key];
			}
		});
		this.categoryInputModel = totalAmount;
	}

	cleanSubcatsInput(form: NgForm) {
		const ARRAY_WITH_KEYS = Object.keys(form.value);
		ARRAY_WITH_KEYS.forEach((key) => {
			if (key !== this.categorySelected.name) {
				(<HTMLInputElement>document.getElementById(key)).value = '';
			}
		});
	}

	getSubcategory(name: string): Category {
		let subcategoryVar: Category = null;
		this.categorySelected.subCategories.forEach((subcategory) => {
			subcategory.name == name ? (subcategoryVar = subcategory) : null;
		});
		return subcategoryVar;
	}

	getHeightOfSubcatsContainer(): number {
		let height = 0;
		height = document.getElementById('divToGetHeight').clientHeight;
		return height;
	}
}
