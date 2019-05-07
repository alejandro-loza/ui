import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AccountService } from '@services/account/account.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { Movement } from '@interfaces/movement.interface';
import { Category } from '@interfaces/category.interface';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit, OnDestroy {
	@Input() movement: Movement;
	@Input() categoryList: Category[];

	@Output() movementEdited: EventEmitter<Movement>;
	@Output() valueCategoryColor: EventEmitter<string>;

	traditionalImg: boolean;
	accountWithOutDefaults: string;
	amountEdit: boolean;

	constructor(private dateApi: DateApiService, private accountService: AccountService) {
		this.traditionalImg = true;
		this.accountWithOutDefaults = '';
		this.movementEdited = new EventEmitter();
		this.valueCategoryColor = new EventEmitter();
		this.amountEdit = true;
	}

	ngOnInit() {
		this.traditionalImg = this.traditionalImgProcess();
		this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults(
			this.movement.account.nature
		);
		this.formatMovementDate();
		this.editAmountAvailable();
	}

	ngOnDestroy() {
		this.traditionalImg = true;
		this.accountWithOutDefaults = '';
	}

	editAmountAvailable() {
		this.amountEdit = this.movement.account.institution.code == 'DINERIO' ? true : false;
	}

	traditionalImgProcess(): boolean {
		if (!isNullOrUndefined(this.movement.account.nature)) {
			return this.movement.account.nature.includes('ma_') ? false : true;
		} else {
			return true;
		}
	}

	formatMovementDate() {
		this.movement.customDate = this.dateApi.formatDateForAllBrowsers(this.movement.customDate.toString());
	}
}
