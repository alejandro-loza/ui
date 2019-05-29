import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AccountInterface} from '@interfaces/account.interfaces';
import {AccountsBeanService} from '@services/account/accounts-bean.service';
import {AccountService} from '@services/account/account.service';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-manual-account-movement',
  templateUrl: './manual-account-movement.component.html',
  styleUrls: ['./manual-account-movement.component.css']
})
export class ManualAccountMovementComponent implements OnInit, AfterViewInit {
  @ViewChild('modal') modalElement: ElementRef;
  @Input() account: AccountInterface;

  @Input() hasManualAccount: boolean;
  @Output() hasManualAccountChange: EventEmitter<boolean>;

  public accounts: AccountInterface[];
  public accountsNatureDefault: string[];
  private modal: M.Modal;

  constructor(
    private accountsBeanService: AccountsBeanService,
    private accountService: AccountService
  ) {
    this.accountsNatureDefault = [];
    this.hasManualAccountChange = new EventEmitter();
  }

  ngOnInit() { this.getUserAccounts(); }

  ngAfterViewInit(): void {
    this.modal = new M.Modal(this.modalElement.nativeElement, {});
  }

  getUserAccounts() {
    if ( this.accountsBeanService.getAccounts ) {
     this.filterByManualAccounts();
    } else {
      this.accountService.getAccounts().subscribe(
        res => res,
        err => err,
        () => this.getUserAccounts()
      );
    }
  }

  filterByManualAccounts() {
    this.accounts = this.accountsBeanService.getAccounts;
    this.accounts = this.accounts.filter(account => account.nature);
    this.accounts = this.accounts.filter(account =>  account.nature.includes('ma_'));
    this.accounts.map( account => this.accountsNatureDefault.push(this.accountService.getManualAccountNatureWithOutDefaults(account.nature)));
  }

  selectManualAccount = (account: AccountInterface) => {
    account.institution = this.account.institution;
    this.accountsBeanService.setMaualAccountToMovementsEditer = account;
    this.hasManualAccountChange.next(true);
    this.modal.close();
  }
}
