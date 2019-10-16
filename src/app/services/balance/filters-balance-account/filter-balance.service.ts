import { Injectable } from '@angular/core';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';
import {StatefulBalanceAccountService} from '@stateful/balance/account/stateful-balance-account.service';

@Injectable({
  providedIn: 'root'
})

export class FilterBalanceService {

  constructor(

    private statefulBalanceAccount: StatefulBalanceAccountService,
    private statefulAccount: StatefulAccountsService,

  ) { }

  filterBalance() {

    this.statefulBalanceAccount.active = 0;
    this.statefulBalanceAccount.passive = 0;
    this.statefulBalanceAccount.credit = 0;
    this.statefulBalanceAccount.investments = 0;

    this.filterActive();

    this.filterPassive();

    this.filterInvestments();

    this.filterCredit();

    this.statefulBalanceAccount.shortTerm = this.statefulBalanceAccount.passive + this.statefulBalanceAccount.active;

    this.statefulBalanceAccount.longTerm = this.statefulBalanceAccount.credit + this.statefulBalanceAccount.investments;

    this.statefulBalanceAccount.balance = this.statefulBalanceAccount.shortTerm + this.statefulBalanceAccount.longTerm;


  }

  filterActive() {

    const accountFilter = this.statefulAccount.accounts
      .filter(account => account.nature.includes('Cheques') || account.nature.includes('Débito'));

    const manualAccountFilter = this.statefulAccount.manualAccounts
      .filter(account =>
        account.nature.includes('ma_cash') ||
        account.nature.includes('ma_debitCard'));

    this.statefulBalanceAccount.activeList = [...accountFilter, ...manualAccountFilter];

    this.statefulBalanceAccount.activeList.forEach(account => this.statefulBalanceAccount.active += account.balance);

    this.statefulBalanceAccount.activeList.sort((a, b) => b.balance - a.balance);

  }

  filterPassive() {

    const accountFilter = this.statefulAccount.accounts
      .filter( account => account.nature.includes('Crédito'));

    const manualAccountFilter = this.statefulAccount.manualAccounts
      .filter( account =>
        account.nature.includes('ma_debt') ||
        account.nature.includes('ma_creditCard'));

    this.statefulBalanceAccount.passiveList = [...accountFilter, ...manualAccountFilter];

    this.statefulBalanceAccount.passiveList.forEach( account => this.statefulBalanceAccount.passive += account.balance);

    this.statefulBalanceAccount.passiveList.sort(((a, b) => a.balance - b.balance));

  }

  filterInvestments () {

    const accountFilter = this.statefulAccount.accounts
      .filter(account => account.nature.includes('Inversión'));

    const manualAccountFilter = this.statefulAccount.manualAccounts
      .filter(account =>
        account.nature.includes('ma_investment') ||
        account.nature.includes('ma_lifeInsurance') ||
        account.nature.includes('ma_goods'));

    this.statefulBalanceAccount.investmentList = [...accountFilter, ...manualAccountFilter];

    this.statefulBalanceAccount.investmentList.forEach( account => this.statefulBalanceAccount.investments += account.balance );

    this.statefulBalanceAccount.investmentList.sort(((a, b) => b.balance - a.balance));

  }

  filterCredit() {

    const manualAccountFilter = this.statefulAccount.manualAccounts
      .filter(account =>
        account.nature.includes('ma_mortgage') ||
        account.nature.includes('ma_personalCredit'));

    this.statefulBalanceAccount.creditList = [...manualAccountFilter];

    this.statefulBalanceAccount.creditList.forEach( account => this.statefulBalanceAccount.credit += account.balance );

    this.statefulBalanceAccount.creditList.sort(((a, b) => a.balance - b.balance));

  }

}
