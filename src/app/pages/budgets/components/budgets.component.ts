import { Component, OnInit } from '@angular/core';
import { BudgetsService } from '@services/budgets/budgets.service';
import { Budget } from '@app/interfaces/budgets/budget.interface';

@Component({
	selector: 'app-budgets',
	templateUrl: './budgets.component.html',
	styleUrls: [ './budgets.component.css' ]
})
export class BudgetsComponent implements OnInit {
	budgets: Budget[] = [];
	showSpinner: boolean = true;
	constructor(private budgetsService: BudgetsService) {}

	ngOnInit() {
		this.getAllBudgets();
	}

	getAllBudgets() {
		this.budgetsService.getAllBudgets().subscribe(
			(res) => {
				res.body.data.forEach((budget) => {
					this.budgets.push(budget);
				});
				this.showSpinner = false;
				console.log(this.budgets);
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
