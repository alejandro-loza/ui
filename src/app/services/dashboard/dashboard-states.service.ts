import { Injectable } from '@angular/core';
import { Movement } from '@app/interfaces/movement.interface';

@Injectable({
	providedIn: 'root'
})
export class DashboardStatesService {
	// For Movements implementation
	private loadListFromDashboard: boolean = false;
	private listOfMovementsFromDashboard: Movement[] = [];
	// To save return data from movements
	private indexOfMonthToShow: number = 0;

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
}
