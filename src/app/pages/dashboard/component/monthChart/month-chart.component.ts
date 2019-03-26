import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { MonthChartEvent } from '@interfaces/dashboard/monthChartEvent.interface';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-month-chart',
	templateUrl: './month-chart.component.html',
	styleUrls: [ './month-chart.component.css' ]
})
export class MonthChartComponent implements OnInit {
	@Output() onClickMonth: EventEmitter<MonthChartEvent>;
	dataForBarChart: StackedBar[] = [];

	constructor(private dashboardService: DashboardBeanService) {
		this.onClickMonth = new EventEmitter();
	}

	ngOnInit() {
		this.getDataStackedBar();
		this.chartOptions();
	}

	getDataStackedBar() {
		this.dataForBarChart = this.dashboardService.getDataStackedBar();
	}

	chartOptions() {
		let chart = document.querySelector('#stackedBarChart');
		let myChart = new Chart(chart, {
			type: 'bar',
			data: {
				labels: this.dataForBarChart[0].labels,
				datasets: [
					{
						label: 'Gastos',
						data: this.dataForBarChart[0].expenses,
						backgroundColor: '#a02e36'
					},
					{
						label: 'Ahorro',
						data: this.dataForBarChart[0].saving,
						backgroundColor: '#7bba3a'
					}
				]
			},
			options: {
				tooltips: {
					callbacks: {
						label: function(tooltipItem) {
							return '$' + Number(tooltipItem.yLabel);
						}
					}
				},
				scales: {
					yAxes: [
						{
							stacked: true,
							ticks: {
								beginAtZero: true,
								fontSize: 14,
								callback: function(label, index, labels) {
									return '$' + String(label).replace(/(.)(?=(\d{3})+$)/g, '$1,');
								}
							}
						}
					],
					xAxes: [
						{
							stacked: true,
							gridLines: {
								display: false
							}
						}
					]
				},
				tooltip: {
					enabled: true,
					mode: 'index',
					intersect: false
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				responsive: true,
				events: [ 'mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend' ],
				onClick: (evt, item) => {
					if (item.length != 0) {
						this.clickEvent(item);
					}
				}
			}
		});
	}

	clickEvent(item) {
		let auxEmit: MonthChartEvent;
		if (!isNullOrUndefined(item[0]._model)) {
			let label = item[0]._model.label;
			let index = item[0]._index;
			auxEmit = { label: label, index: index };
			this.onClickMonth.emit(auxEmit);
		}
	}
}
