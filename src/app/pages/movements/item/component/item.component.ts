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

	iconImg: string;

	constructor(private dateApi: DateApiService, private accountService: AccountService) {
		this.movementEdited = new EventEmitter();
		this.valueCategoryColor = new EventEmitter();
	}

	ngOnInit() {
		this.formatMovementDate();
		this.iconImg = this.createIconSrc();
	}

	// cdn : https://cdn.finerio.mx/banks/{{movement.account.institution.code}}_shield.png
	// assets: assets/media/img/movements/' + movement.account.institution.code + '.png

	createIconSrc(): string {
		let src: string;
		if (this.movement.account.institution.code != 'DINERIO') {
			src = `https://cdn.finerio.mx/banks/${this.movement.account.institution.code}_shield.png`;
		} else {
			if (this.movement.account.nature.includes('ma_')) {
				switch (this.accountService.getManualAccountNatureWithOutDefaults(this.movement.account.nature)) {
					case 'ma_cash':
						src = `assets/media/img/manual_account/ma_cash.svg`;
						break;
					case 'ma_creditCard':
						src = `assets/media/img/manual_account/ma_creditCard.svg`;
						break;
					case 'ma_debitCard':
						src = `assets/media/img/manual_account/ma_debitCard.svg`;
						break;
					case 'ma_debt':
						src = `assets/media/img/manual_account/ma_debt.svg`;
						break;
					case 'ma_goods':
						src = `assets/media/img/manual_account/ma_goods.svg`;
						break;
					case 'ma_investment':
						src = `assets/media/img/manual_account/ma_investment.svg`;
						break;
					case 'ma_lifeInsurance':
						src = `assets/media/img/manual_account/ma_lifeInsurance.svg`;
						break;
					case 'ma_mortgage':
						src = `assets/media/img/manual_account/ma_mortgage.svg`;
						break;
					case 'ma_personalCredit':
						src = `assets/media/img/manual_account/ma_personalCredit.svg`;
						break;
					default:
						src = `assets/media/img/manual_account/ma_cash.svg`;
				}
			} else {
				src = `assets/media/img/movements/${this.movement.account.institution.code}.png`;
			}
		}
		return src;
	}

	formatMovementDate() {
		this.movement.customDate = this.dateApi.formatDateForAllBrowsers(this.movement.customDate.toString());
	}
}
