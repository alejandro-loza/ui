//@ts-ignore
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { AccountInterface } from '@app/interfaces/account.interfaces';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-accounts-table',
	templateUrl: './accounts-table.component.html',
	styleUrls: [ './accounts-table.component.css' ]
})
export class AccountsTableComponent implements OnInit {
	debitAndCashBalance: number = 0;
	creditAndDebtBalance: number = 0;
	totalShortTerm: number = 0;
	investmentsBalance: number = 0;
	creditBalance: number = 0;
	totalLargeTerms: number = 0;
	totalBalance: number = 0;

	debitAndCashAccounts: AccountInterface[] = [];
	creditAndDebtAccounts: AccountInterface[] = [];
	investmentsAccounts: AccountInterface[] = [];
	creditAccounts: AccountInterface[] = [];

	@Input() accounts: AccountInterface[] = [];
	@ViewChild('collapsible', {static: false}) elementCollapsible: ElementRef;

	constructor() {}

	ngOnInit() {
		this.reloadDataOnChanges();
		this.balanceForFirstSection();
		this.balanceForSecondSection();
		this.getTotalBalance();
		this.sortAccounts();
	}

	ngAfterViewInit(): void {
		const initCollapsible = new M.Collapsible(this.elementCollapsible.nativeElement);
	}

	ngOnChanges(): void {
		this.reloadDataOnChanges();
		this.balanceForFirstSection();
		this.balanceForSecondSection();
		this.getTotalBalance();
		this.sortAccounts();
	}

	balanceForSecondSection() {
		this.accounts.forEach((element) => {
			if (!isNullOrUndefined(element.nature)) {
				if (
					element.nature.includes('Inversión') ||
					element.nature.includes('ma_investment') ||
					element.nature.includes('ma_lifeInsurance') ||
					element.nature.includes('ma_goods')
				) {
					this.investmentsBalance += element.balance;
					this.fillAccountsArray(element, 'investment');
				} else if (element.nature.includes('ma_mortgage') || element.nature.includes('ma_personalCredit')) {
					this.creditBalance += element.balance;
					this.fillAccountsArray(element, 'credit');
				}
			}
		});
		this.totalLargeTerms = this.investmentsBalance + this.creditBalance;
	}

	// Amount for each type of credential
	balanceForFirstSection() {
		this.accounts.forEach((element) => {
			if (!isNullOrUndefined(element.nature)) {
				if (
					element.nature.includes('Cheques') ||
					element.nature.includes('ma_cash') ||
					element.nature.includes('ma_debitCard')
				) {
					this.debitAndCashBalance += element.balance;
					this.fillAccountsArray(element, 'debitAndCash');
				} else if (
					element.nature.includes('Crédito') ||
					element.nature.includes('ma_debt') ||
					element.nature.includes('ma_creditCard')
				) {
					this.creditAndDebtBalance += element.balance;
					this.fillAccountsArray(element, 'creditAndDebt');
				}
			}
		});
		this.totalShortTerm = this.debitAndCashBalance + this.creditAndDebtBalance;
	}

	getTotalBalance() {
		this.totalBalance = this.totalShortTerm + this.totalLargeTerms;
	}

	fillAccountsArray(account: AccountInterface, nature: string) {
		if (nature == 'debitAndCash') {
			this.debitAndCashAccounts.push(account);
		} else if (nature == 'creditAndDebt') {
			this.creditAndDebtAccounts.push(account);
		} else if (nature == 'investment') {
			this.investmentsAccounts.push(account);
		} else if (nature == 'credit') {
			this.creditAccounts.push(account);
		}
	}

	// Information for the accounts collapsible
	sortAccounts() {
		this.debitAndCashAccounts.sort((a, b) => {
			return b.balance - a.balance;
		});
		this.creditAndDebtAccounts.sort((a, b) => {
			return a.balance - b.balance;
		});
		this.investmentsAccounts.sort((a, b) => {
			return b.balance - a.balance;
		});
		this.creditAccounts.sort((a, b) => {
			return a.balance - b.balance;
		});
	}

	reloadDataOnChanges() {
		this.debitAndCashBalance = 0;
		this.creditAndDebtBalance = 0;
		this.totalShortTerm = 0;
		this.investmentsBalance = 0;
		this.creditBalance = 0;
		this.totalLargeTerms = 0;
		this.totalBalance = 0;
		this.debitAndCashAccounts = [];
		this.creditAndDebtAccounts = [];
		this.investmentsAccounts = [];
		this.creditAccounts = [];
	}
}
