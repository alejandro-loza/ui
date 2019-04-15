import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { ToastService } from '@services/toast/toast.service';
import { BudgetsService } from '@services/budgets/budgets.service';
import { Budget } from '@app/interfaces/budgets/budget.interface';
import * as M from 'materialize-css/dist/js/materialize';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-budget-detail',
	templateUrl: './budget-detail.component.html',
	styleUrls: [ './budget-detail.component.css' ]
})
export class BudgetDetailComponent implements OnInit {
	categoryName: string = '';
	budget: Budget = null;
	subBudgets: Budget[] = [];
	percentageAmountTotal: number = 0;
	percentageBudgets: number = 0;
	porEjecutarAmountTotal: number = 0;
	showScreen: boolean = false;
	showSpinner: boolean = false;
	@ViewChild('deleteModal') elModal: ElementRef;

	constructor(
		private activatedRoute: ActivatedRoute,
		private budgetsBeanService: BudgetsBeanService,
		private budgetsService: BudgetsService,
		private categoriesBeanService: CategoriesBeanService,
		private router: Router,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.getCategoryName();
		if (!isNullOrUndefined(this.budgetsBeanService.getBudgetToViewDetails())) {
			this.budget = this.budgetsBeanService.getBudgetToViewDetails();
			this.budgetsBeanService.setBudgetToEdit(this.budget);
			this.budgetsBeanService.setCategoryToSharedComponent(this.budget.category);
			this.getSubBudgets();
			this.showScreen = true;
		} else {
			this.router.navigateByUrl('/app/budgets');
		}
	}

	ngAfterViewInit() {
		const ELMODAL = new M.Modal(this.elModal.nativeElement);
	}

	getSubBudgets() {
		if (!isNullOrUndefined(this.budget.subBudgets)) {
			this.subBudgets = this.budget.subBudgets;
			this.sortingSubbudgets();
		}
		this.doPercentage();
	}

	doPercentage() {
		this.percentageAmountTotal = this.budget.spentAmount * 100 / this.budget.amount;
		if (this.budget.amount - this.budget.spentAmount >= 0) {
			this.porEjecutarAmountTotal = this.budget.amount - this.budget.spentAmount;
		} else {
			this.porEjecutarAmountTotal = 0;
		}
	}

	getCategoryName() {
		this.activatedRoute.params.subscribe((param) => {
			this.categoryName = param['name'];
		});
	}

	getpercentage(spent: number, total: number): Number {
		let percentage: number = 0;
		percentage = spent * 100 / total;
		return percentage;
	}

	getPorEjecutar(budget: Budget): number {
		let amount: number = 0;
		budget.amount - budget.spentAmount > 0 ? (amount = budget.amount - budget.spentAmount) : (amount = 0);
		return amount;
	}

	getTotalProgressBarWidth() {
		let percentage: number = this.budget.spentAmount * 100 / this.budget.amount;
		return `${percentage}%`;
	}

	sortingSubbudgets() {
		this.budget.subBudgets.sort((a, b) => {
			return b.amount - a.amount;
		});
	}

	getColorOfBar(percentage: number) {
		let budget_green: string = '#008e33';
		let budget_yellow: string = '#fcb100';
		let budget_red: string = '#f12a2b';

		if (percentage < 70) {
			return budget_green;
		} else if (percentage >= 70 && percentage <= 100) {
			return budget_yellow;
		} else {
			return budget_red;
		}
	}

	getIconImage(): String {
		let url: string = 'https://cdn.finerio.mx/categories/web/color/';
		if (isNullOrUndefined(this.budget.category.user)) {
			let id = this.budget.category.id;
			url = url + id + '.svg';
		} else {
			url = '/assets/media/img/categories/color/userCategory.svg';
		}
		return url;
	}

	getWidthPercentage(subBudget: Budget): string {
		let percentage: number = subBudget.spentAmount * 100 / subBudget.amount;
		this.percentageBudgets = percentage;
		return `${percentage}%`;
	}

	openDeleteModal() {
		const INSTANCEMODAL = M.Modal.getInstance(this.elModal.nativeElement);
		INSTANCEMODAL.open();
	}

	deleteButton() {
		this.showSpinner = true;
		setTimeout(() => {
			this.budgetsService.deleteBudget(this.budget).subscribe(
				(res) => {
					this.toastService.setCode = res.status;
				},
				(error) => {
					this.toastService.setCode = error.status;
					this.toastService.setMessage = 'Ocurrió un error, vuelve a intentarlo';
					this.toastService.toastGeneral();
				},
				() => {
					this.categoriesBeanService.setCategories([]);
					this.budgetsBeanService.setLoadInformation(true);
					this.toastService.setMessage = 'Presupuesto eliminado con éxito';
					this.toastService.toastGeneral();
					return this.router.navigateByUrl('/app/budgets');
				}
			);
		}, 1000);
	}
}
