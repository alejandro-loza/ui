import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetsService } from '@services/budgets/budgets.service';
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
	showSpinner: boolean;
	currentAmountTotal: number = 0;
	totalAmountTotal: number = 0;
	percentageAmountTotal: number = 0;
	porEjecutarAmountTotal: number = 0;
	percentageBudgets: number = 0;
	showEmptyState: boolean = false;

	// EMPTY STATE
	imgName: string;
	title: string;
	description: string;
	buttonText: string;
	buttonUrl: string;

	constructor(
		private budgetsService: BudgetsService,
		private budgetsBeanService: BudgetsBeanService,
		private router: Router
	) {
		this.fillInformationForEmptyState();
		this.showSpinner = true;
	}

	ngOnInit() {
		if (this.budgetsBeanService.getLoadInformation()) {
			this.getAllBudgets();
		} else {
			this.budgets = this.budgetsBeanService.getBudgets();
			this.doTotalBudget();
			this.emptyStateProcess();
			this.showSpinner = false;
		}
		this.windowPosition();
	}

	getAllBudgets() {
		this.budgetsService.getAllBudgets().subscribe(
			(res) => {
				this.budgetsBeanService.setLoadInformation(false);
				this.budgets = res.body.data;
				console.log(this.budgets);
				this.sortingBudgets();
				this.doTotalBudget();
				this.budgetsBeanService.setBudgets(this.budgets);
				this.emptyStateProcess();
			},
			(error) => {
				console.log(error);
			},
			() => {
				this.showSpinner = false;
			}
		);
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
		this.budgets.forEach((budget) => {
			this.currentAmountTotal += budget.spentAmount;
			this.totalAmountTotal += budget.amount;
			if (this.totalAmountTotal - this.currentAmountTotal >= 0) {
				this.porEjecutarAmountTotal = this.totalAmountTotal - this.currentAmountTotal;
			} else {
				this.porEjecutarAmountTotal = 0;
			}
			this.percentageAmountTotal = this.currentAmountTotal * 100 / this.totalAmountTotal;
		});
	}

	getTotalProgressBarWidth(): string {
		let percentage: number = this.currentAmountTotal * 100 / this.totalAmountTotal;
		return `${percentage}%`;
	}

	getIconImage(budget: Budget): string {
		let url: string = 'https://cdn.finerio.mx/categories/web/color/';
		if (isNullOrUndefined(budget.category.user)) {
			let id = budget.category.id;
			url = url + id + '.svg';
		} else {
			url = url + '/000000.svg';
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

	windowPosition() {
		window.scrollTo(0, 0);
		let html = document.querySelector('html');
		html.style.overflowX = 'hidden';
	}
}
