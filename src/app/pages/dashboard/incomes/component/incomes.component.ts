import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { MonthChartEvent } from '@app/interfaces/dashboard/monthChartEvent.interface';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service.ts';
import { BarChart } from '@app/interfaces/dashboard/BarChart.interface';
import { isNullOrUndefined } from 'util';
import { ResumeMainData } from '@app/interfaces/dashboard/resumeMainData.interface';
import { PieChart } from '@app/interfaces/dashboard/pieChart.interface';
import { TableData } from '@app/interfaces/dashboard/dataForTables.interface';
import { Movement } from '@app/interfaces/movement.interface';

@Component({
	selector: 'app-incomes',
	templateUrl: './incomes.component.html',
	styleUrls: [ './incomes.component.css' ]
})
export class IncomesComponent implements OnInit {
	incomesData: ResumeMainData[] = [];
	dataForPieChart: PieChart = { labels: [], amount: [], backgroundColor: [] };
	dataForTable: TableData[] = [];
	monthOfCategorySelected: MonthChartEvent = {
		label: null,
		index: null
	};

	amountsBarChart: number[] = [];
	labelsBarChart: string[] = [];
	dataFromServiceForBarChart: BarChart[] = [];
	titleMonth: string = '';
	titleYear: string = '';
	showBackButton: boolean = false;

	doughnutChart: Chart = [];
	totalAmount: number = 0;
	cdnUrl: string = 'https://cdn.finerio.mx/categories/web/color';
	monthOnScreen: number = 0;

	// V ariables to use movements implementation
	indexOfData: number = 0;
	categoryId: string = '';

	constructor(
		private dashboardBeanService: DashboardBeanService,
		private dashboardStatesService: DashboardStatesService,
		private router: Router
	) {}

	ngOnInit() {
		this.getDataForIncomes();
		this.getDataForBarChart();
		this.dataForIncomesBarChart();
		this.loadScreen();
	}

	loadScreen() {
		this.dashboardStatesService.getLoadClickedScreen()
			? this.clickedScreen(this.dashboardStatesService.getElementToShowOnClickedScreen())
			: this.normalScreen();
	}

	clickedScreen(element: TableData) {
		let indexToShow = this.dashboardStatesService.getIndexOfMonthToShow();
		this.dataForTableOfSubcats(element.index, element.catId);
		let amount = this.getTotalAmountForClickedScreen();
		if (this.dataForTable.length > 0) {
			this.pieChartOfSubcats();
			this.setMainMessage(element.index, amount);
			this.setTitles(this.dataFromServiceForBarChart.length - indexToShow - 1);
			this.indexOfData = element.index;
			this.categoryId = element.catId;
			this.monthOnScreen = element.index;
			this.showBackButton = true;
		} else {
			this.normalScreen();
		}
	}

	getTotalAmountForClickedScreen(): number {
		let aux: number = 0;
		this.dataForTable.forEach((data) => {
			aux += data.amount;
		});
		return aux;
	}

	monitorOfData(index: number) {
		let showPieBarAndTable: Boolean = false;
		let monthElement = this.dataFromServiceForBarChart[this.dataFromServiceForBarChart.length - index - 1];
		let correctIndex: number = 0;
		for (let i = 0; i < this.incomesData.length; i++) {
			if (this.incomesData[i].month == monthElement.monthNumber) {
				showPieBarAndTable = true;
				correctIndex = i;
			}
		}

		if (showPieBarAndTable) {
			this.PieChartOfCats(correctIndex);
			this.dataForTableOfCats(correctIndex);
		} else {
			this.PieChartOfCats(null);
			this.dataForTableOfCats(null);
		}
	}

	normalScreen() {
		let indexToShow = this.dashboardStatesService.getIndexOfMonthToShow();
		this.monitorOfData(indexToShow);
		this.setMainMessage(this.dataFromServiceForBarChart.length - indexToShow - 1);
		this.setTitles(this.dataFromServiceForBarChart.length - indexToShow - 1);
		this.monthOnScreen = this.incomesData.length - indexToShow - 1;
		this.showBackButton = false;
	}

	clickOnCategory(element: TableData) {
		this.dashboardStatesService.setLoadClickedScreen(true);
		this.dashboardStatesService.setElementToShowOnClickedScreen(element);
		if (!element.isSubCat) {
			this.dataForTableOfSubcats(element.index, element.catId);
			this.setMainMessage(element.index, element.amount);
			this.indexOfData = element.index;
			this.categoryId = element.catId;
			this.monthOnScreen = element.index;
			this.showBackButton = true;
			this.doughnutChart.destroy();
			this.pieChartOfSubcats();
		} else {
			// Click en una subcategoría
			this.clickOnSubcategory(element);
			this.settingIndexForSaveState();
		}
	}

	settingIndexForSaveState() {
		this.dashboardStatesService.setIndexOfMonthToShow(this.indexOfData);
	}

	clickOnSubcategory(element: TableData) {
		let movements: Movement[] = [];
		this.incomesData[element.index].data.forEach((res) => {
			if (res.categoryId == element.catId) {
				res.details.forEach((detail) => {
					if (detail.subCategory.name == element.label) {
						movements = detail.movements;
					}
				});
			}
		});
		this.storageMovements(movements);
	}

	transformIncomesData(data: ResumeMainData) {
		this.dataForPieChart.amount = [];
		this.dataForPieChart.labels = [];
		this.dataForPieChart.backgroundColor = [];
		if (!isNullOrUndefined(data)) {
			data.data.forEach((element) => {
				this.dataForPieChart.labels.push(element.label);
				this.dataForPieChart.amount.push(element.totalAmount);
				this.dataForPieChart.backgroundColor.push(element.backgroundColor);
			});
		}
	}

	storageMovements(movements: Movement[]) {
		this.dashboardStatesService.setListOfMovementsFromDashboard(movements);
		this.dashboardStatesService.setLoadListFromDashboard(true);
		this.router.navigateByUrl('/app/movements');
	}

	dataForTableOfCats(index: number) {
		this.dataForTable = [];
		this.dataForPieChart.amount = [];
		this.dataForPieChart.labels = [];
		if (!isNullOrUndefined(this.incomesData[index])) {
			this.incomesData[index].data.forEach((data) => {
				this.dataForTable.push({
					catId: data.categoryId,
					label: data.label,
					amount: data.totalAmount,
					isSubCat: false,
					index: index
				});
			});
		}
	}

	selectedMonthChart(event: MonthChartEvent) {
		this.setMainMessage(event.index);
		this.setTitles(event.index);
		this.monitorOfData(this.dataFromServiceForBarChart.length - event.index - 1);
		this.showBackButton = false;
		if (this.doughnutChart.length > 0) this.doughnutChart.destroy();

		this.dashboardStatesService.setLoadClickedScreen(false);
		this.dashboardStatesService.setIndexOfMonthToShow(this.dataFromServiceForBarChart.length - event.index - 1);
	}

	returnButton(event: number) {
		let auxAmount: number = 0;
		this.doughnutChart.destroy();
		this.PieChartOfCats(event);
		this.dataForTableOfCats(event);
		this.showBackButton = false;
		this.incomesData[event].data.forEach((data) => {
			auxAmount += data.totalAmount;
		});
		this.setMainMessage(event, auxAmount);
		this.dashboardStatesService.setLoadClickedScreen(false);
	}

	dataForTableOfSubcats(index: number, catId: string) {
		this.dataForTable = [];
		this.dataForPieChart.amount = [];
		this.dataForPieChart.labels = [];
		this.dataForPieChart.backgroundColor = [];
		this.incomesData[index].data.forEach((data) => {
			if (data.categoryId == catId) {
				data.details.forEach((details) => {
					if (!isNullOrUndefined(details.subCategory.parent)) {
						this.dataForTable.push({
							catId: details.subCategory.parent.id,
							label: details.subCategory.name,
							amount: details.totalAmount,
							isSubCat: true,
							index: index
						});
					} else {
						this.dataForTable.push({
							catId: details.subCategory.id,
							label: details.subCategory.name,
							amount: details.totalAmount,
							isSubCat: true,
							index: index
						});
					}
					this.dataForPieChart.labels.push(details.subCategory.name);
					this.dataForPieChart.amount.push(details.totalAmount);
					this.dataForPieChart.backgroundColor.push(details.subCategory.color);
				});
			}
		});
	}

	PieChartOfCats(index: number) {
		if (!isNullOrUndefined(index)) {
			this.transformIncomesData(this.incomesData[index]);
			let pieChart = document.querySelector('#incomesPieChart');
			this.doughnutChart = new Chart(pieChart, {
				type: 'doughnut',
				data: {
					labels: this.dataForPieChart.labels,
					datasets: [
						{
							data: this.dataForPieChart.amount,
							backgroundColor: this.dataForPieChart.backgroundColor
						}
					]
				},
				options: {
					responsive: true,
					animation: {
						animateScale: false
					},
					/*onClick: (evt, item) => {
						this.dataForTable.forEach((data) => {
							if (data.label == item[0]._model.label) {
								this.clickOnCategory(data);
							}
						});
					},*/
					legend: { display: false }
				}
			});
		} else {
			if (this.doughnutChart.id) this.doughnutChart.destroy();
		}
	}

	pieChartOfSubcats() {
		let pieChart = document.querySelector('#incomesPieChart');
		this.doughnutChart = new Chart(pieChart, {
			type: 'doughnut',
			data: {
				labels: this.dataForPieChart.labels,
				datasets: [
					{
						data: this.dataForPieChart.amount,
						backgroundColor: this.dataForPieChart.backgroundColor
					}
				]
			},
			options: {
				responsive: true,
				animation: {
					animateScale: false
				},
				legend: { display: false }
			}
		});
	}

	setTitles(index: number) {
		this.titleMonth = this.dataFromServiceForBarChart[index].label;
		this.titleYear = this.dataFromServiceForBarChart[index].year.toString();

		let largeTitle = document.querySelector('#largeTitle');
		let medTitle = document.querySelector('#medTitle');
		largeTitle.innerHTML = 'Resumen ' + this.titleMonth + ' ' + this.titleYear;
		medTitle.innerHTML = 'Resumen ' + this.titleMonth + ' ' + this.titleYear;
	}

	setMainMessage(index: number, amount?: number) {
		if (isNullOrUndefined(amount)) {
			this.totalAmount = this.dataFromServiceForBarChart[index].amount;
		} else {
			this.totalAmount = amount;
		}
	}

	getImageForElement(element: TableData): String {
		let url: string;
		if (element.catId.indexOf('000000') > -1) {
			url = `${this.cdnUrl}/${element.catId}.svg`;
		} else {
			if (element.catId !== '000000') {
				url = '/assets/media/img/categories/color/userCategory.svg';
			} else {
				url = '/assets/media/img/categories/color/000000.svg';
			}
		}
		return url;
	}

	getDataForBarChart() {
		this.dataFromServiceForBarChart = this.dashboardBeanService.getDataIncomesBarChart();
	}

	getDataForIncomes() {
		this.incomesData = this.dashboardBeanService.getDataIncomesTab();
	}

	dataForIncomesBarChart() {
		this.dataFromServiceForBarChart.forEach((element) => {
			this.amountsBarChart.push(element.amount);
			this.labelsBarChart.push(element.label);
		});
	}
}
