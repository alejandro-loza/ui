import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AccountInterface} from '@interfaces/account.interfaces';
import {AccountsBeanService} from '@services/account/accounts-bean.service';
import {AccountService} from '@services/account/account.service';

import * as M from 'materialize-css/dist/js/materialize';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';

@Component({
  selector: 'app-manual-account-movement',
  templateUrl: './manual-account-movement.component.html',
  styleUrls: ['./manual-account-movement.component.css']
})
export class ManualAccountMovementComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {static: false}) modalElement: ElementRef;
  @Input() account: AccountInterface;

  @Input() hasManualAccount: boolean;
  @Output() hasManualAccountChange: EventEmitter<boolean>;

  public accounts: AccountInterface[];
  public accountsNatureDefault: string[];
  private modal: M.Modal;

  constructor(
    private accountsBeanService: AccountsBeanService,
    private accountService: AccountService,
    private statefulAccountsService: StatefulAccountsService,
  ) {
    this.accountsNatureDefault = [];
    this.hasManualAccountChange = new EventEmitter();
  }

  ngOnInit() {
    this.account.nature = this.accountService.getManualAccountNatureWithOutDefaults(this.account.nature);
    this.getUserAccounts();
  }

  ngAfterViewInit(): void {
    this.modal = new M.Modal(this.modalElement.nativeElement, {});
  }

  getUserAccounts() {
    this.accounts = this.statefulAccountsService.manualAccounts;
    this.accounts = this.accounts.map( account => {
      account.nature = this.accountService.getManualAccountNatureWithOutDefaults(account.nature);
      return account;
    });
  }

  selectManualAccount = (account: AccountInterface) => {
    account.institution = this.account.institution;
    this.accountsBeanService.setMaualAccountToMovementsEditer = account;
    this.hasManualAccountChange.next(true);
    this.modal.close();
  }
}
