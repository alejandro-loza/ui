import { Injectable } from '@angular/core';
import {AccountInterface} from '@interfaces/account.interfaces';
import {StatefulAccountService} from '@stateful/account/stateful-account.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';

@Injectable({
  providedIn: 'root'
})
export class EditManualAccountListService {

  private manualAccounts: AccountInterface[];
  private manualAccount: AccountInterface;

  constructor(
    private statefulAccount: StatefulAccountService,
    private statefulAccounts: StatefulAccountsService,
  ) { }

  deleteManualAccount() {

    this.manualAccount = this.statefulAccount.manualAccount;

    this.manualAccounts = this.statefulAccounts.manualAccounts;

    this.manualAccounts = this.manualAccounts.filter(account => account.id !== this.manualAccount.id);

    this.statefulAccounts.manualAccounts = this.manualAccounts;

  }
}
