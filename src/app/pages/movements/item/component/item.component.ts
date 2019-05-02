import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '@services/account/account.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { Movement } from '@interfaces/movement.interface';
import { Category } from '@interfaces/category.interface';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit {
	@Input() movement: Movement;
	@Input() categoryList: Category[];

	@Output() movementEdited: EventEmitter<Movement>;
	@Output() valueCategoryColor: EventEmitter<string>;

	traditionalImg: boolean;
	accountWithOutDefaults: string;

	constructor(private dateApi: DateApiService, private accountService: AccountService) {
		this.movementEdited = new EventEmitter();
		this.valueCategoryColor = new EventEmitter();
	}

	ngOnInit() {
		this.traditionalImg = this.movement.account.nature.includes('ma_') ? false : true;
		this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults(
			this.movement.account.nature
		);
		this.formatMovementDate();
	}

	formatMovementDate() {
		this.movement.customDate = this.dateApi.formatDateForAllBrowsers(this.movement.customDate.toString());
	}
}
