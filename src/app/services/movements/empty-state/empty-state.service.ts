import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class EmptyStateService {
	private showEmptyState: boolean = false;

	constructor() {}

	public setShowEmptyState(data: boolean) {
		this.showEmptyState = data;
	}

	public getShowEmptyState(): boolean {
		return this.showEmptyState;
	}
}
