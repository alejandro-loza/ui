import { Injectable } from '@angular/core';
import { AccountInterface } from '@app/interfaces/account.interfaces';

@Injectable({
	providedIn: 'root'
})
export class AccountsBeanService {
	private manualAccounts: AccountInterface[];
	private manualAccountToEdit: AccountInterface;

	constructor() {}

	set setManualAccountToEdit(data: AccountInterface) {
		this.manualAccountToEdit = data;
	}

	get getManualAccountToEdit(): AccountInterface {
		return this.manualAccountToEdit;
	}

	set setManualAccounts(data: AccountInterface[]) {
		this.manualAccounts = data;
	}

	get getManualAccounts(): AccountInterface[] {
		return this.manualAccounts;
	}
}
