import { Injectable } from '@angular/core';

import {AccountInterface} from '@interfaces/account.interfaces';

import {StatefulAccountService} from '@stateful/account/stateful-account.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';

@Injectable({
  providedIn: 'root'
})
export class EditAccountListService {

  private accounts: AccountInterface[];
  private account: AccountInterface;

  constructor(
    private statefulAccount: StatefulAccountService,
    private statefulAccounts: StatefulAccountsService,
  ) { }

  deleteAccount() {

    this.account = this.statefulAccount.account;

    this.accounts = this.statefulAccounts.accounts;

    this.accounts = this.accounts.filter(account => account.id !== this.account.id);

    this.statefulAccounts.accounts = this.accounts;

  }
}
