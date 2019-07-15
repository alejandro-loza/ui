import { Injectable } from '@angular/core';
import {AccountInterface} from '@interfaces/account.interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatefulAccountsService {

  private _manualAccounts: AccountInterface[];
  private _accounts: AccountInterface[];

  constructor() { }

  set manualAccounts(manualAccounts: AccountInterface[]) {
    this._manualAccounts = manualAccounts;
  }

  get manualAccounts(): AccountInterface[] {
    return this._manualAccounts;
  }

  set accounts(accounts: AccountInterface[]) {
    this._accounts = accounts;
  }

  get accounts(): AccountInterface[] {
    return this._accounts;
  }
}
