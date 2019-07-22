import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetsResponse } from '@interfaces/budgets/budgetsResponse.interface';
import { BudgetsService } from '@services/budgets/budgets.service';
import { CategoriesService } from '@services/categories/categories.service';
import { CategoriesHelperService } from '@services/categories/categories-helper.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { ToastService } from '@services/toast/toast.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { Budget } from '@app/interfaces/budgets/budget.interface';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-budgets',
	templateUrl: './budgets.component.html',
	styleUrls: [ './budgets.component.css' ]
})
export class BudgetsComponent implements OnInit {
	budgets: Budget[] = [];
	budgetsResponse: BudgetsResponse;
	showSpinner: boolean;
	currentAmountTotal: number = 0;
	totalAmountTotal: number = 0;
	percentageAmountTotal: number = 0;
	porEjecutarAmountTotal: number = 0;
	percentageBudgets: number = 0;
	showEmptyState: boolean = false;
	fromDate: string;
	toDate: string;

	// EMPTY STATE
	imgName: string;
	title: string;
	description: string;
	buttonText: string;
	buttonUrl: string;

	constructor(
		private budgetsService: BudgetsService,
		private budgetsBeanService: BudgetsBeanService,
		private router: Router,
		private toastService: ToastService,
		private dateApiService: DateApiService,
		private categoriesService: CategoriesService,
		private categoriesHelperService: CategoriesHelperService,
		private categoriesBeanService: CategoriesBeanService
	) {
		this.fillInformationForEmptyState();
		this.showSpinner = true;
		this.fromDate = '';
		this.toDate = '';
		this.budgetsResponse = null;
	}

	ngOnInit() {
		this.loadCategories();
		this.windowPosition();
	}

	getAllBudgets() {
		this.getDatesForRequest();
		this.budgetsService.getAllBudgets(this.fromDate, this.toDate).subscribe(
			(res) => {
				this.budgetsBeanService.setLoadInformation(false);
				this.budgetsResponse = res.body;
				this.budgets = res.body.data;
				this.sortingBudgets();
				this.doTotalBudget();
				this.budgetsBeanService.setBudgets(this.budgets);
				this.budgetsBeanService.setBudgetResponse(this.budgetsResponse);
				this.emptyStateProcess();
			},
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Ocurrio un error al cargar tus presupuestos, intenta más tarde';
				this.toastService.toastGeneral();
			},
			() => {
				this.showSpinner = false;
			}
		);
	}

	getDatesForRequest() {
		this.toDate = this.dateApiService.dateWithFormat(new Date());

		let startDateAux = new Date();
		startDateAux.setMonth(startDateAux.getMonth());
		startDateAux.setDate(1);
		startDateAux.setHours(0);
		startDateAux.setMinutes(0);
		startDateAux.setMilliseconds(0);

		this.fromDate = this.dateApiService.dateWithFormat(startDateAux);
	}

	clickEvent(budget: Budget) {
		this.budgetsBeanService.setBudgetToViewDetails(budget);
		this.router.navigateByUrl('/app/budgets/' + budget.name);
	}

	sortingBudgets() {
		this.budgets.sort((a, b) => {
			return b.amount - a.amount;
		});
	}

	doTotalBudget() {
		this.currentAmountTotal = this.budgetsResponse.spentAmountTotal;
		this.totalAmountTotal = this.budgetsResponse.amountTotal;
		this.percentageAmountTotal = this.budgetsResponse.spentPercentageTotal;

		if (this.totalAmountTotal - this.currentAmountTotal >= 0) {
			this.porEjecutarAmountTotal = this.totalAmountTotal - this.currentAmountTotal;
		} else {
			this.porEjecutarAmountTotal = 0;
		}
	}

	getTotalProgressBarWidth(): string {
		let percentage: number = this.currentAmountTotal * 100 / this.totalAmountTotal;
		return `${percentage}%`;
	}

	getIconImage(budget: Budget): string {
		let url: string = 'https://cdn.finerio.mx/categories/web/color/';
		let categories = this.categoriesBeanService.getCategories();
		if (categories.length > 0) {
			let category = this.categoriesHelperService.getCategoryById(budget.categoryId, categories);
			if (isNullOrUndefined(category.userId)) {
				let id = category.id;
				url = url + id + '.svg';
			} else {
				url = '/assets/media/img/categories/color/userCategory.svg';
			}
		}
		return url;
	}

	getColorOfBar(percentage: number): string {
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

	getWidthPercentage(budget: Budget): string {
		let percentage: number = budget.spentAmount * 100 / budget.amount;
		this.percentageBudgets = percentage;
		return `${percentage}%`;
	}

	emptyStateProcess() {
		if (this.budgetsBeanService.getBudgets().length == 0) {
			this.budgetsBeanService.setShowEmptyStates(true);
		} else {
			this.budgetsBeanService.setShowEmptyStates(false);
		}
		this.showEmptyState = this.budgetsBeanService.getShowEmptyStates();
	}

	fillInformationForEmptyState() {
		this.imgName = 'budgets';
		this.title = 'No tienes presupuestos';
		this.description = "Pulsa el botón de 'Nuevo Presupuesto' para crear tus presupuestos de este mes.";
		this.buttonText = 'Nuevo Presupuesto';
		this.buttonUrl = '/app/budgets/new-budget';
	}

	loadCategories() {
		this.categoriesService.getCategoriesInfo().subscribe((res) => {
			if (this.budgetsBeanService.getLoadInformation()) {
				this.getAllBudgets();
			} else {
				this.budgets = this.budgetsBeanService.getBudgets();
				this.budgetsResponse = this.budgetsBeanService.getBudgetResponse();
				this.doTotalBudget();
				this.emptyStateProcess();
				this.showSpinner = false;
			}
		});
	}

	windowPosition() {
		window.scrollTo(0, 0);
		let html = document.querySelector('html');
		html.style.overflowX = 'hidden';
	}
}
