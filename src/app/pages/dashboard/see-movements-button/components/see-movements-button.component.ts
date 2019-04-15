import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { ResumeMainData, Details } from '@app/interfaces/dashboard/resumeMainData.interface';
import { Movement } from '@app/interfaces/movement.interface';

@Component({
	selector: 'app-see-movements-button',
	templateUrl: './see-movements-button.component.html',
	styleUrls: [ './see-movements-button.component.css' ]
})
export class SeeMovementsButtonComponent implements OnInit {
	@Input() indexOfData: number;
	@Input() categoryId: string;
	@Input() linkFromExpenses: boolean;

	allData: ResumeMainData[] = [];
	detailsOfData: Details[] = [];
	movementsForComponent: Movement[] = [];

	constructor(
		private dashboardStatesService: DashboardStatesService,
		private dashboardBeanService: DashboardBeanService,
		private router: Router
	) {}

	ngOnInit() {
		this.getDetailsOfAllData();
		this.setMovementsList();
		this.settingIndexForSaveState();
	}

	goToMovementsClick() {
		this.dashboardStatesService.setLoadListFromDashboard(true);
		this.dashboardStatesService.setListOfMovementsFromDashboard(this.movementsForComponent);
		this.router.navigateByUrl('/app/movements');
	}

	setMovementsList() {
		this.detailsOfData.forEach((detail: Details) => {
			detail.movements.forEach((movement) => {
				this.movementsForComponent.push(movement);
			});
		});
	}

	getDetailsOfAllData() {
		this.linkFromExpenses ? this.processForExpenses() : this.processForIncomes();
	}

	processForIncomes() {
		let preliminarData: ResumeMainData;
		this.allData = this.dashboardBeanService.getDataIncomesTab();
		preliminarData = this.allData[this.indexOfData];
		preliminarData.data.forEach((element) => {
			if (element.categoryId == this.categoryId) {
				this.detailsOfData = element.details;
			}
		});
	}

	processForExpenses() {
		let preliminarData: ResumeMainData;
		this.allData = this.dashboardBeanService.getDataExpensesTab();
		preliminarData = this.allData[this.indexOfData];
		preliminarData.data.forEach((element) => {
			if (element.categoryId == this.categoryId) {
				this.detailsOfData = element.details;
			}
		});
	}

	settingIndexForSaveState() {
		this.dashboardStatesService.setIndexOfMonthToShow(this.indexOfData);
	}
}
