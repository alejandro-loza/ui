import { Injectable, Output, EventEmitter } from '@angular/core';
import { AccountInterface } from '@app/interfaces/account.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountsBeanService {
  @Output() changeManualAccountOnMovements: EventEmitter<boolean>;
  private accounts: AccountInterface[];
  private manualAccount: AccountInterface;
  private manualAccounts: AccountInterface[];
  private manualAccountToEdit: AccountInterface;

  constructor() {
    this.changeManualAccountOnMovements = new EventEmitter();
  }

  set setMaualAccountToMovementsEditer(data: AccountInterface) {
    this.manualAccount = data;
  }

  get getMaualAccountToMovementsEditer(): AccountInterface {
    return this.manualAccount;
  }

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

  set setAccounts(data: AccountInterface[]) {
    this.accounts = data;
  }

  get getAccounts(): AccountInterface[] {
    return this.accounts;
  }
}
