import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Movement } from '@interfaces/movement.interface';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-item-detail',
	templateUrl: './item-detail.component.html',
	styleUrls: [ './item-detail.component.css' ]
})
export class ItemDetailComponent implements OnInit {
	@Input() movement: Movement;
	@Input() auxMovement: Movement;
	@Input() statusUpdate: boolean;
	@Input() keyEnter: boolean;

	showDeleteButton: boolean;
	showInBalance: boolean;
	inBalanceCheckBox: boolean;

	@Output() status: EventEmitter<boolean>;
	@Output() statusCancel: EventEmitter<boolean>;
	@Output() statusDelete: EventEmitter<boolean>;
	@Output() keyEnterPressed: EventEmitter<boolean>;

	constructor() {
		this.status = new EventEmitter();
		this.statusCancel = new EventEmitter();
		this.statusDelete = new EventEmitter();
		this.keyEnterPressed = new EventEmitter();
		this.showDeleteButton = true;
		this.showInBalance = false;
	}

	ngOnInit() {
		this.showInBalanceProcess();
		this.funcShowDeleteButton();
	}

	inBalanceChange() {
		this.movement.inBalance = this.inBalanceCheckBox;
	}

	showInBalanceProcess() {
		if (!isNullOrUndefined(this.movement.inBalance)) {
			this.showInBalance = true;
			this.inBalanceCheckBox = this.movement.inBalance;
		}
	}

	funcShowDeleteButton() {
		this.showDeleteButton = this.movement.account.institution.code == 'DINERIO' ? true : false;
	}
}
