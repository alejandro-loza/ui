import {Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit} from '@angular/core';

import { AccountInterface } from '@app/interfaces/account.interfaces';

import {StatefulBalanceAccountService} from '@stateful/balance/account/stateful-balance-account.service';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: [ './accounts-table.component.css' ]
})
export class AccountsTableComponent implements OnInit, AfterViewInit {
  actives: number;
  passives: number;
  investments: number;
  credits: number;

  shortTerm: number;
  longTerm: number;
  balance: number;

  activeList: AccountInterface[];
  passiveList: AccountInterface[];
  investmentList: AccountInterface[];
  creditList: AccountInterface[];

  @ViewChild('collapsible', {static: false}) elementCollapsible: ElementRef;

  constructor(
    private statefulBalanceAccount: StatefulBalanceAccountService
  ) {}

  ngOnInit() {
    this.getNumbers();
    this.getLists();
  }

  ngAfterViewInit(): void {
    const initCollapsible = new M.Collapsible(this.elementCollapsible.nativeElement);
  }

  getNumbers() {

    this.actives = this.statefulBalanceAccount.active;

    this.passives = this.statefulBalanceAccount.passive;

    this.investments = this.statefulBalanceAccount.investments;

    this.credits = this.statefulBalanceAccount.credit;

    this.shortTerm = this.statefulBalanceAccount.shortTerm;

    this.longTerm = this.statefulBalanceAccount.longTerm;

    this.balance = this.statefulBalanceAccount.balance;

  }

 getLists() {

    this.activeList = this.statefulBalanceAccount.activeList;

    this.passiveList = this.statefulBalanceAccount.passiveList;

    this.investmentList = this.statefulBalanceAccount.investmentList;

    this.creditList = this.statefulBalanceAccount.creditList;

  }

}
