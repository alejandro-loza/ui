import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '@services/account/account.service';
import { AccountsBeanService } from '@services/account/accounts-bean.service';
import { AccountInterface } from '@app/interfaces/account.interfaces';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-user-manual-accounts',
	templateUrl: './user-manual-accounts.component.html',
	styleUrls: [ './user-manual-accounts.component.css' ]
})
export class UserManualAccountsComponent implements OnInit {
	userAccounts: AccountInterface[] = [];
	userManualAccounts: AccountInterface[] = [];
	namesForUi: string[] = [];

	@Output() manualAccount: EventEmitter<AccountInterface> = new EventEmitter();
	@Output() noManualAccounts: EventEmitter<boolean> = new EventEmitter();

	constructor(private accountService: AccountService, private accountsBeanService: AccountsBeanService) {}

	ngOnInit() {
		this.getUserAccounts();
	}

	manualAccountSelected(account: AccountInterface) {
		this.manualAccount.emit(account);
	}

	getUserAccounts() {
		this.userAccounts = this.accountsBeanService.getManualAccounts;
		if (isNullOrUndefined(this.userAccounts)) {
			this.accountService.getAccounts().subscribe((res) => {
				this.userAccounts = res.body.data;
				this.setOnlyManualAccounts();
			});
		} else {
			this.setOnlyManualAccounts();
		}
	}

	setOnlyManualAccounts() {
		this.userManualAccounts = [];
		this.userAccounts.forEach((account) => {
			if (!isNullOrUndefined(account.nature)) {
				if (account.nature.includes('ma_')) {
					this.userManualAccounts.push(account);
				}
			}
		});
		this.noManualAccounts.emit(this.userManualAccounts.length == 0);
		this.setNamesWoDefaults();
		this.getDefaultMa();
	}

	getDefaultMa() {
		let emitNullForNoDefaultMa: boolean = true;
		this.userManualAccounts.forEach((account) => {
			if (account.nature.includes('_csh_d')) {
				emitNullForNoDefaultMa = false;
				this.manualAccountSelected(account);
			}
		});
		emitNullForNoDefaultMa ? this.manualAccount.emit(null) : null;
	}

	setNamesWoDefaults() {
		this.namesForUi = [];
		this.userManualAccounts.forEach((account) => {
			this.namesForUi.push(this.accountService.getManualAccountNatureWithOutDefaults(account.nature));
		});
	}
}
