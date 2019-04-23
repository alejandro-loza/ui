import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ManualAccountList } from '@app/interfaces/manual-accounts/manual-account-list.interface';

@Component({
	selector: 'app-accounts-list',
	templateUrl: './accounts-list.component.html',
	styleUrls: [ './accounts-list.component.css' ]
})
export class AccountsListComponent implements OnInit {
	iconsShortTerm: string[] = [ 'DINERIO', 'tdd', 'deuda', 'tdc' ];
	namesShortTerm: string[] = [ 'Efectivo', 'Tarjeta de débito', 'Deuda', 'Tarjeta de crédito' ];
	shortNatureKeys: string[] = [ 'cash', 'debitCard', 'debt', 'creditCard' ];

	iconsLargeTerms: string[] = [ 'inversion', 'seguro_de_vida', 'bienes', 'hipoteca', 'credito_personal' ];
	namesLargeTerms: string[] = [ 'Inversión', 'Seguro de vida', 'Bienes', 'Hipoteca', 'Crédito personal' ];
	largeNatureKeys: string[] = [ 'investment', 'lifeInsurance', 'goods', 'mortgage', 'personalCredit' ];

	@Output() manualAccountSelected: EventEmitter<ManualAccountList> = new EventEmitter();

	constructor() {}

	ngOnInit() {
		this.preSelectCashAccount();
	}

	selectedAccount(index: number, type: string) {
		this.borderProcess(index, type);
		this.emitNatureProcess(index, type);
	}

	emitNatureProcess(index: number, type: String) {
		let manualAccountStructure: ManualAccountList = {};
		let nature: string;
		let name: string;
		let iconName: string;

		if (type == 'short') {
			nature = this.shortNatureKeys[index];
			name = this.namesShortTerm[index];
			iconName = this.iconsShortTerm[index];
		} else {
			nature = this.largeNatureKeys[index];
			name = this.namesLargeTerms[index];
			iconName = this.iconsLargeTerms[index];
		}

		manualAccountStructure.accountKey = nature;
		manualAccountStructure.accountName = name;
		manualAccountStructure.iconName = iconName;
		this.manualAccountSelected.emit(manualAccountStructure);
	}

	borderProcess(index: number, type: string) {
		let buttonsList = document.getElementsByTagName('button');
		for (let index = 0; index < buttonsList.length; index++) {
			buttonsList[index].classList.contains('selectedAccount');
			buttonsList[index].classList.remove('selectedAccount');
		}
		document.querySelector('#' + type + index).classList.add('selectedAccount');
	}

	preSelectCashAccount() {
		// TimeOut to make time for rendering process and dont get null
		setTimeout(() => {
			document.querySelector('#short0').classList.add('selectedAccount');
		}, 100);
	}
}
