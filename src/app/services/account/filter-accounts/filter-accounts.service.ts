import { Injectable } from '@angular/core';
import {AccountInterface} from '@interfaces/account.interfaces';
import {isUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class FilterAccountsService {

  private _manualAccounts: AccountInterface[];
  private _accounts: AccountInterface[];

  constructor() { }

  filterAccounts(accounts: AccountInterface[]) {
    const auxAccounts = accounts.filter(account => !isUndefined(account.nature));
    this._manualAccounts = auxAccounts.filter(account => account.nature.includes('ma_'));
    this._accounts = auxAccounts.filter(account => !account.nature.includes('ma_'));
  }

  get manualAccounts(): AccountInterface[] {
    return  this._manualAccounts;
  }

  get accounts(): AccountInterface[] {
    return  this._accounts;
  }
}
