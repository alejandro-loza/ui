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
	assetsUrl: string = '../../../assets/media/img/categories/color';
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
		let indexToShow = this.dashboardStatesService.getIndexOfMonthToShow();
		this.PieChartOfCats(indexToShow);
		this.dataForTableOfCats(indexToShow);
		this.setMainMessage(this.dataFromServiceForBarChart.length - indexToShow - 1);
		this.setTitles(this.dataFromServiceForBarChart.length - indexToShow - 1);
		this.monthOnScreen = this.incomesData.length - indexToShow - 1;
		this.showBackButton = false;
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
			this.doughnutChart.destroy();
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

	clickOnCategory(element: TableData) {
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

	selectedMonthChart(event: MonthChartEvent) {
		this.setMainMessage(event.index);
		this.setTitles(event.index);
		this.doughnutChart.destroy();
		this.showBackButton = false;
		this.PieChartOfCats(this.correctIndex(event));
		this.dataForTableOfCats(this.correctIndex(event));
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
	}

	correctIndex(event: MonthChartEvent): number {
		let index: number = null;
		let months: string[] = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		];
		for (let i = 0; i < months.length; i++) {
			if (months[i] == event.label) {
				for (let j = 0; j < this.incomesData.length; j++) {
					if (this.incomesData[j].month == i) {
						index = j;
					}
				}
			}
		}
		return index;
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
