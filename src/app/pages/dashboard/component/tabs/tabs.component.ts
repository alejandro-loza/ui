import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: [ './tabs.component.css' ]
})
export class TabsComponent implements OnInit, AfterViewInit {
	@Output() tabClicked: EventEmitter<number> = new EventEmitter();
	@ViewChild('tabs') elementTabs: ElementRef;
	titlePage: String;

	constructor(private dashboardStatesService: DashboardStatesService) {}

	ngOnInit() {
		this.presentTab();
	}

	ngAfterViewInit() {
		const instanceTabs = new M.Tabs(this.elementTabs.nativeElement, {});
	}

	presentTab() {
		let tab = this.dashboardStatesService.getNumberOfTabToReturn();
		switch (tab) {
			case 0:
				document.querySelector('#incomesTab').classList.add('active');
				break;
			case 1:
				document.querySelector('#expensesTab').classList.add('active');
				break;
			case 2:
				document.querySelector('#balanceTab').classList.add('active');
				break;
			default:
				document.querySelector('#expensesTab').classList.add('active');
		}
	}

	onClick(tab: number) {
		this.tabClicked.emit(tab);
	}
}
