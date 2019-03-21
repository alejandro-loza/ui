import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { MonthChartEvent } from '@interfaces/dashboard/monthChartEvent.interface';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { BalancePieChart } from '@app/interfaces/dashboard/BalancePieChart.interface';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-balance',
	templateUrl: './balance.component.html',
	styleUrls: [ './balance.component.css' ]
})
export class BalanceComponent implements OnInit {
	dataPieChart: BalancePieChart[] = [];
	dataForBarChart: StackedBar[] = [];
	doughnutChart: Chart;

	titleMonth: string;
	titleYear: string;
	typeOfAmount: string = '';
	totalAmount: number = 0;

	expensesAmount: number = 0;
	savingAmount: number = 0;
	assetsUrl: string = '../../../assets/media/img/dashboard/';

	constructor(private dashboardBeanService: DashboardBeanService) {}

	ngOnInit() {
		this.getDataStackedBar();
		this.getDataPieChart();
		this.firstData();
	}

	firstData() {
		if (!isNullOrUndefined(this.dataForBarChart[0])) {
			this.setTitles(this.dataForBarChart[0].labels.length - 1);
			this.setMainMessage(this.dataForBarChart[0].labels.length - 1);
			this.pieChartOptions(this.dataPieChart.length - 1);
		}
	}

	pieChartOptions(index: number) {
		let pieChart = document.querySelector('#balancePieChart');
		this.doughnutChart = new Chart(pieChart, {
			type: 'doughnut',
			data: {
				labels: [ 'Gastos', 'Ahorro' ],
				datasets: [
					{
						data: this.dataPieChart[index].data,
						backgroundColor: [ '#a02e36', '#7bba3a' ]
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
							return data.labels[indice] + ': ' + Math.round(data.datasets[0].data[indice]) + '';
						}
					}
				},
				animation: {
					animateScale: false
				},
				legend: { display: false }
			}
		});
	}

	setMainMessage(index: number) {
		if (this.dataForBarChart[0].saving[index] != 0) {
			this.totalAmount = this.dataForBarChart[0].saving[index];
			this.typeOfAmount = 'Ahorro';
		} else {
			this.totalAmount = this.dataForBarChart[0].expenses[index];
			this.typeOfAmount = 'Gasto';
		}
		this.expensesAmount = this.dataForBarChart[0].expenses[index];
		this.savingAmount = this.dataForBarChart[0].saving[index];
	}

	setTitles(index: number) {
		this.titleMonth = this.dataForBarChart[0].labels[index];
		this.titleYear = this.dataForBarChart[0].year[index].toString();

		let largeTitle = document.querySelector('#largeTitle');
		let medTitle = document.querySelector('#medTitle');
		largeTitle.innerHTML = 'Resumen ' + this.titleMonth + ' ' + this.titleYear;
		medTitle.innerHTML = 'Resumen ' + this.titleMonth + ' ' + this.titleYear;
	}

	getDataStackedBar() {
		this.dataForBarChart = this.dashboardBeanService.getDataStackedBar();
	}

	getDataPieChart() {
		this.dataPieChart = this.dashboardBeanService.getDataBalancePieChart();
	}

	// EVENTO PARA CAMBIO DE DATA EN EL PIE Y TABLA
	onClickMonth(event: MonthChartEvent) {
		this.doughnutChart.destroy();
		this.setTitles(event.index);
		this.setMainMessage(event.index);
		this.pieChartOptions(event.index);
	}
}
