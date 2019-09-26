import {Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit} from '@angular/core';

import { AccountInterface } from '@app/interfaces/account.interfaces';

import {StatefulBalanceAccountService} from '@stateful/balance/account/stateful-balance-account.service';

import * as M from 'materialize-css/dist/js/materialize';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {PollingCredentialService} from '@services/credentials/polling-credential/polling-credential.service';
import {Subscription} from 'rxjs';
import {CredentialUpdateResponse} from '@interfaces/credentials/credential-update-response';
import {CheckDataCredentialService} from '@services/credentials/check-data/check-data-credential.service';
import {CredentialService} from '@services/credentials/credential.service';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: [ './accounts-table.component.css' ]
})
export class AccountsTableComponent implements OnInit, AfterViewInit, CredentialUpdateResponse {
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

  credentials: CredentialInterface[];

  @ViewChild('collapsible', {static: false}) elementCollapsible: ElementRef;

  constructor(
    private statefulBalanceAccountService: StatefulBalanceAccountService,
    private statefulCredentialsService: StatefulCredentialsService,
    private pollingCredentialService: PollingCredentialService,
    private checkDataCredentialService: CheckDataCredentialService,
    private credentialService: CredentialService
  ) {}

  ngOnInit() {

    this.getCredentials();

  }

  ngAfterViewInit(): void {
    const initCollapsible = new M.Collapsible(this.elementCollapsible.nativeElement);
  }

  getNumbers() {

    this.actives = this.statefulBalanceAccountService.active;

    this.passives = this.statefulBalanceAccountService.passive;

    this.investments = this.statefulBalanceAccountService.investments;

    this.credits = this.statefulBalanceAccountService.credit;

    this.shortTerm = this.statefulBalanceAccountService.shortTerm;

    this.longTerm = this.statefulBalanceAccountService.longTerm;

    this.balance = this.statefulBalanceAccountService.balance;

  }

 getLists() {

    this.activeList = this.statefulBalanceAccountService.activeList;

    this.passiveList = this.statefulBalanceAccountService.passiveList;

    this.investmentList = this.statefulBalanceAccountService.investmentList;

    this.creditList = this.statefulBalanceAccountService.creditList;

  }

  checkCredentialSyncing(credential: CredentialInterface, subscription: Subscription) {

    if ( this.pollingCredentialService.unsubscribeFromProcessing( credential, subscription) ) {

      this.getLists();

      this.getNumbers();

    }

  }

  getCredentials() {
    if ( this.statefulCredentialsService.credentials ) {

      this.credentials = this.statefulCredentialsService.credentials;

      this.credentials.forEach( credential => this.checkDataCredentialService.checkData(credential, this));

      this.getNumbers();

      this.getLists();

    } else {
      this.credentialService.getAllCredentials().subscribe( () => this.getCredentials());
    }
  }
}
