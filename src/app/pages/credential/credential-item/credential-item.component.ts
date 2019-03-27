import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CredentialInterface } from '@app/interfaces/credential.interface';

@Component({
	selector: 'app-credential-item',
	templateUrl: './credential-item.component.html',
	styleUrls: [ './credential-item.component.css' ]
})
export class CredentialItemComponent implements OnInit {
	@Input() credential: CredentialInterface;
	@Output() syncButtonClicked: EventEmitter<CredentialInterface> = new EventEmitter();

	iconText: string = '';
	showButton: boolean = false;
	constructor() {}

	ngOnInit() {
		this.selectIconToShow();
		this.showSyncButton();
	}

	showSyncButton() {
		if (this.credential.status == 'INVALID' || this.moreThanEightHours(this.credential)) {
			this.showButton = true;
		}
	}

	syncButton() {
		this.showButton = false;
		this.syncButtonClicked.emit(this.credential);
	}

	moreThanEightHours(credential: CredentialInterface): boolean {
		let currentMoment = new Date();
		let dateObj = new Date(credential.lastUpdated);
		let diff = (currentMoment.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
		if (diff >= 8) {
			return true;
		} else {
			return false;
		}
	}

	selectIconToShow() {
		if (this.credential.status == 'ACTIVE') {
			this.iconText = 'verified_user';
		} else if (this.credential.status == 'INVALID') {
			this.iconText = 'report_problem';
		} else {
			this.iconText = 'sync';
		}
	}
}
