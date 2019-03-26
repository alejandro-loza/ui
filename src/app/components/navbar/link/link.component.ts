import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { CleanerService } from '@services/cleaner/cleaner.service';

@Component({
	selector: 'app-link',
	templateUrl: './link.component.html',
	styleUrls: [ './link.component.css' ]
})
export class LinkComponent implements OnInit, AfterViewInit {
	@Input() route: string;
	@Input() nombre: string;
	@Input() icon: string;
	@Input() show: boolean;

	@Output() showValue: EventEmitter<boolean>;

	@ViewChild('tooltip') elementTooltip: ElementRef;

	constructor(private cleanerService: CleanerService) {
		this.show = false;
		this.showValue = new EventEmitter();
	}

	ngOnInit() {}

	cleanMemory() {
		if (this.icon === 'logout') {
			this.cleanerService.cleanAllVariables();
		}
	}

	ngAfterViewInit() {
		const initTooltip = new M.Tooltip(this.elementTooltip.nativeElement, {
			enterDelay: 300,
			outDuration: 150,
			transitionMovement: 0
		});
	}
	showValueEmit() {
		this.showValue.emit(this.show);
	}
}
