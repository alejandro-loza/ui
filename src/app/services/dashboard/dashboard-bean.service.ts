import { Injectable } from '@angular/core';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { BalancePieChart } from '@app/interfaces/dashboard/BalancePieChart.interface';
import { ResumeMainData } from '@app/interfaces/dashboard/resumeMainData.interface';
import { BarChart } from '@app/interfaces/dashboard/BarChart.interface';
import { Movement } from '@app/interfaces/movement.interface';

@Injectable({
	providedIn: 'root'
})
export class DashboardBeanService {
	private dataStackedBar: StackedBar[] = [];
	private dataBalancePieChart: BalancePieChart[] = [];
	private loadInformation: boolean = true;
	private dataReady: boolean = false;
	private dataExpensesTab: ResumeMainData[] = [];
	private dataIncomesBarChart: BarChart[] = [];
	private dataIncomesTab: ResumeMainData[] = [];
	private showEmptyState: boolean = false;
	// For Movements implementation
	private loadListFromDashboard: boolean = false;
	private listOfMovementsFromDashboard: Movement[] = [];

	constructor() {}

	public setShowEmptyState(data: boolean) {
		this.showEmptyState = data;
	}

	public getShowEmptyState(): boolean {
		return this.showEmptyState;
	}

	public setDataIncomesTab(data: ResumeMainData[]) {
		this.dataIncomesTab = data;
	}

	public getDataIncomesTab(): ResumeMainData[] {
		return this.dataIncomesTab;
	}

	public setDataIsReady(data: boolean) {
		this.dataReady = data;
	}

	public getDataIsReady(): boolean {
		return this.dataReady;
	}

	public setDataIncomesBarChart(data: BarChart[]) {
		this.dataIncomesBarChart = data;
	}

	public getDataIncomesBarChart(): BarChart[] {
		return this.dataIncomesBarChart;
	}

	public setDataExpensesTab(data: ResumeMainData[]) {
		this.dataExpensesTab = data;
	}

	public getDataExpensesTab(): ResumeMainData[] {
		return this.dataExpensesTab;
	}

	public setDataStackedBar(data: StackedBar[]) {
		this.dataStackedBar = data;
	}

	public getDataStackedBar(): StackedBar[] {
		return this.dataStackedBar;
	}

	public setDataBalancePieChart(data: BalancePieChart[]) {
		this.dataBalancePieChart = data;
	}

	public getDataBalancePieChart(): BalancePieChart[] {
		return this.dataBalancePieChart;
	}

	public setLoadInformation(flag: boolean) {
		this.loadInformation = flag;
	}

	public getLoadInformation(): Boolean {
		return this.loadInformation;
	}

	public setLoadListFromDashboard(data: boolean) {
		this.loadListFromDashboard = data;
	}

	public getLoadListFromDashboard(): boolean {
		return this.loadListFromDashboard;
	}

	public setListOfMovementsFromDashboard(data: Movement[]) {
		this.listOfMovementsFromDashboard = data;
	}

	public getListOfMovementsFromDashboard(): Movement[] {
		return this.listOfMovementsFromDashboard;
	}
}
