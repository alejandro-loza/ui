import { Component, OnInit, Input } from '@angular/core';
import { AccountsBeanService } from '@services/account/accounts-bean.service';
import { AccountInterface } from '@app/interfaces/account.interfaces';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-manual-account-item',
	templateUrl: './manual-account-item.component.html',
	styleUrls: [ './manual-account-item.component.css' ]
})
export class ManualAccountItemComponent implements OnInit {
	@Input() manualAccount: AccountInterface;
	iconName: string = 'ma_cash';

	constructor(private accountsBeanService: AccountsBeanService) {}

	ngOnInit() {
		this.getIconName();
	}

	getIconName() {
		let iconsName: string[] = [
			'ma_cash',
			'ma_creditCard',
			'ma_debitCard',
			'ma_debt',
			'ma_goods',
			'ma_investment',
			'ma_lifeInsurance',
			'ma_mortgage',
			'ma_personalCredit'
		];
		if (!isNullOrUndefined(this.manualAccount.nature)) {
			iconsName.forEach((iconName) => {
				if (this.manualAccount.nature.includes(iconName)) {
					this.iconName = iconName;
				}
			});
		}
	}

	clickOnManualAccount() {
		this.accountsBeanService.setManualAccountToEdit = this.manualAccount;
	}
}
