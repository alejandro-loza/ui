import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service.ts';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { ResumeMainData } from '@app/interfaces/dashboard/resumeMainData.interface';
import { MonthChartEvent } from '@app/interfaces/dashboard/monthChartEvent.interface';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { TableData } from '@app/interfaces/dashboard/dataForTables.interface';
import { isNullOrUndefined } from 'util';
import { PieChart } from '@app/interfaces/dashboard/pieChart.interface';
import { Movement } from '@app/interfaces/movement.interface';

@Component({
	selector: 'app-expenses',
	templateUrl: './expenses.component.html',
	styleUrls: [ './expenses.component.css' ]
})
export class ExpensesComponent implements OnInit {
	stackedBarData: StackedBar[] = [];
	dataForPieChart: PieChart = { labels: [], amount: [], backgroundColor: [] };
	doughnutChart: Chart;
	expensesData: ResumeMainData[] = [];
	dataForTable: TableData[] = [];
	cdnUrl: string = 'https://cdn.finerio.mx/categories/web/color';
	totalAmount: number = 0;
	titleMonth: string = '';
	titleYear: string = '';
	showBackButton: boolean = false;
	monthOnScreen: number = 0;

	// V ariables to use movements implementation
	indexOfData: number = 0;
	categoryId: string = '';

	constructor(
		private dashboardBean: DashboardBeanService,
		private dashboardStatesService: DashboardStatesService,
		private router: Router
	) {}

	ngOnInit() {
		this.getStackedBarData();
		this.getMainData();
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
		if (this.dataForTable.length > 0) {
			this.indexOfData = element.index;
			this.categoryId = element.catId;
			this.pieChartOfSubcats();
			this.setMainMessage(element.index, element.amount);
			this.setTitles(this.expensesData.length - indexToShow - 1);
			this.monthOnScreen = element.index;
			this.showBackButton = true;
		} else {
			this.normalScreen();
		}
	}

	normalScreen() {
		let indexToShow = this.dashboardStatesService.getIndexOfMonthToShow();
		this.PieChartOfCats(indexToShow);
		this.dataForTableOfCats(indexToShow);
		this.setMainMessage(this.expensesData.length - indexToShow - 1);
		this.setTitles(this.expensesData.length - indexToShow - 1);
		this.monthOnScreen = this.expensesData.length - indexToShow - 1;
		this.showBackButton = false;
	}

	// EVENTO DE CLICK EN ALGUN MES
	selectedMonthChart(event: MonthChartEvent) {
		this.setMainMessage(event.index);
		this.setTitles(event.index);
		this.doughnutChart.destroy();
		this.showBackButton = false;
		this.PieChartOfCats(this.expensesData.length - event.index - 1);
		this.dataForTableOfCats(this.expensesData.length - event.index - 1);

		this.dashboardStatesService.setLoadClickedScreen(false);
		this.dashboardStatesService.setIndexOfMonthToShow(this.expensesData.length - event.index - 1);
	}

	// EVENTO DE CLICK EN UNA CATEGORIA
	clickOnCategory(element: TableData) {
		this.dashboardStatesService.setLoadClickedScreen(true);
		this.dashboardStatesService.setElementToShowOnClickedScreen(element);
		if (!element.isSubCat) {
			this.doughnutChart.destroy();
			this.showBackButton = true;
			this.indexOfData = element.index;
			this.categoryId = element.catId;
			this.dataForTableOfSubcats(element.index, element.catId);
			this.pieChartOfSubcats();
			this.setMainMessage(element.index, element.amount);
			this.monthOnScreen = element.index;
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
		this.expensesData[element.index].data.forEach((res) => {
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

	storageMovements(movements: Movement[]) {
		this.dashboardStatesService.setListOfMovementsFromDashboard(movements);
		this.dashboardStatesService.setLoadListFromDashboard(true);
		this.router.navigateByUrl('/app/movements');
	}

	returnButton(event: number) {
		let auxAmount: number = 0;
		this.doughnutChart.destroy();
		this.PieChartOfCats(event);
		this.dataForTableOfCats(event);
		this.showBackButton = false;
		this.expensesData[event].data.forEach((data) => {
			auxAmount += data.totalAmount;
		});
		this.setMainMessage(event, auxAmount);
		this.dashboardStatesService.setLoadClickedScreen(false);
	}

	setTitles(index: number) {
		this.titleMonth = this.stackedBarData[0].labels[index];
		this.titleYear = this.stackedBarData[0].year[index].toString();

		let largeTitle = document.querySelector('#largeTitle');
		let medTitle = document.querySelector('#medTitle');

		largeTitle.innerHTML = 'Resumen ' + this.titleMonth + ' ' + this.titleYear;
		medTitle.innerHTML = 'Resumen ' + this.titleMonth + ' ' + this.titleYear;
	}

	setMainMessage(index: number, amount?: number) {
		if (isNullOrUndefined(amount)) {
			this.totalAmount = this.stackedBarData[0].expenses[index];
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

	dataForTableOfSubcats(index: number, catId: string) {
		this.dataForTable = [];
		this.dataForPieChart.amount = [];
		this.dataForPieChart.labels = [];
		this.dataForPieChart.backgroundColor = [];
		this.expensesData[index].data.forEach((data) => {
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

	transformIncomesData(data: ResumeMainData) {
		this.dataForPieChart.amount = [];
		this.dataForPieChart.labels = [];
		this.dataForPieChart.backgroundColor = [];
		data.data.forEach((element) => {
			this.dataForPieChart.labels.push(element.label);
			this.dataForPieChart.amount.push(element.totalAmount);
			this.dataForPieChart.backgroundColor.push(element.backgroundColor);
		});
	}

	dataForTableOfCats(index: number) {
		this.dataForTable = [];
		this.expensesData[index].data.forEach((data) => {
			this.dataForTable.push({
				catId: data.categoryId,
				label: data.label,
				amount: data.totalAmount,
				isSubCat: false,
				index: index
			});
		});
	}

	getStackedBarData() {
		this.stackedBarData = this.dashboardBean.getDataStackedBar();
	}

	getMainData() {
		this.expensesData = this.dashboardBean.getDataExpensesTab();
	}

	dataForExpensesBarChart(): number[] {
		return this.stackedBarData[0].expenses;
	}

	labelsForExpensesChart(): string[] {
		return this.stackedBarData[0].labels;
	}

	PieChartOfCats(index: number) {
		if (!isNullOrUndefined(index)) {
			this.transformIncomesData(this.expensesData[index]);
			let pieChart = document.querySelector('#expensesPieChart');
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
					tooltips: {
						mode: 'label',
						callbacks: {
							label: function(tooltipItem, data) {
								var indice = tooltipItem.index;
								return data.labels[indice] + ': $' + Math.round(data.datasets[0].data[indice]) + '';
							}
						}
					},
					animation: {
						animateScale: false
					},
					legend: { display: false }
				}
			});
		} else {
			this.doughnutChart.destroy();
		}
	}

	pieChartOfSubcats() {
		let pieChart = document.querySelector('#expensesPieChart');
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
}
