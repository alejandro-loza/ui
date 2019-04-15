import { Injectable } from '@angular/core';
import { Movement } from '@app/interfaces/movement.interface';
import { TableData } from '@app/interfaces/dashboard/dataForTables.interface';

@Injectable({
	providedIn: 'root'
})
export class DashboardStatesService {
	// For Movements implementation
	private loadListFromDashboard: boolean = false;
	private listOfMovementsFromDashboard: Movement[] = [];
	// To save return data from movements
	private indexOfMonthToShow: number = 0;
	private loadClickedScreen: boolean = false;
	private elementToShowOnClickedScreen: TableData = {};
	// To Know wich tab to return
	private numberOfTabToReturn: number = 1;

	constructor() {}

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

	public setIndexOfMonthToShow(data: number) {
		this.indexOfMonthToShow = data;
	}

	public getIndexOfMonthToShow(): number {
		return this.indexOfMonthToShow;
	}

	public setLoadClickedScreen(data: boolean) {
		this.loadClickedScreen = data;
	}

	public getLoadClickedScreen(): boolean {
		return this.loadClickedScreen;
	}

	public setElementToShowOnClickedScreen(data: TableData) {
		this.elementToShowOnClickedScreen = data;
	}

	public getElementToShowOnClickedScreen(): TableData {
		return this.elementToShowOnClickedScreen;
	}

	public setNumberOfTabToReturn(data: number) {
		this.numberOfTabToReturn = data;
	}

	public getNumberOfTabToReturn(): number {
		return this.numberOfTabToReturn;
	}
}
