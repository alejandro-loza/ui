import {AfterViewInit, Component, OnInit } from '@angular/core';

import {AccountInterface} from '@interfaces/account.interfaces';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';

import {MethodCredentialService} from '@services/credentials/method-credential/method-credential.service';
import {PollingCredentialService} from '@services/credentials/polling-credential/polling-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';
import {AccountService} from '@services/account/account.service';

import {Subscription} from 'rxjs';

import {CheckDataCredentialService} from '@services/credentials/check-data/check-data-credential.service';
import {CredentialUpdateResponse} from '@interfaces/credentials/credential-update-response';
import {CredentialService} from '@services/credentials/credential.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: [ './credential.component.css' ]
})

export class CredentialComponent implements OnInit, AfterViewInit, CredentialUpdateResponse {
  accounts: AccountInterface[];
  manualAccounts: AccountInterface[];
  credentials: CredentialInterface[];

  // Aux properties
  showSpinner: boolean;
  errorWithCredentials: boolean;
  showGoMovementsButton: boolean;

  // USER MESSAGES
  loaderMessagge: string;
  successMessage: string;
  failMessage: string;
  validateStatusFinished: boolean;

  // EMPTY STATE
  imgName: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  showEmptyState: boolean;

  constructor(
    private accountService: AccountService,
    private credentialService: CredentialService,
    private checkDataCredentialService: CheckDataCredentialService,
    public matDialog:                       MatDialog,
    private methodCredentialService: MethodCredentialService,
    private pollingCredentialService: PollingCredentialService,
    private statefulAccountsService: StatefulAccountsService,
    private statefulCredentialsService: StatefulCredentialsService,
  ) {
    this.credentials = [];
    this.showSpinner = true;
    this.validateStatusFinished = true;
    this.errorWithCredentials = false;
    this.showGoMovementsButton = false;
    this.loaderMessagge = 'Finerio se está sincronizando con tu banca en línea, esto puede tardar unos minutos.';
    this.successMessage = '';
    this.failMessage = '';
  }

  ngOnInit() {

    this.getAccounts();

    this.getCredentials();

  }

  ngAfterViewInit(): void { }

  checkCredentialSyncing ( credential: CredentialInterface, subscription: Subscription ) {

    if ( this.pollingCredentialService.unsubscribeFromProcessing( credential, subscription) ) {

      this.statefulCredentialsService.credentials = this.statefulCredentialsService.credentials.map( auxCredential => {

        if ( credential.id === auxCredential.id ) {

          auxCredential = {...credential};

        }

        return auxCredential;

      });

      this.validateStatusFinished = true;

      this.showGoMovementsButton = true;

    } else {

      this.validateStatusFinished = false;

    }

    this.credentials = this.statefulCredentialsService.credentials;

  }

  emptyStateProcess() {

    if ( this.accounts && this.manualAccounts ) {
      this.showEmptyState = this.credentials.length === 0 && ( this.accounts.length === 0 && this.manualAccounts.length === 0 );
    } else if ( this.accounts || this.manualAccounts ) {
      this.showEmptyState = this.credentials.length === 0 && ( this.accounts.length === 0 || this.manualAccounts.length === 0 );
    } else {
      this.showEmptyState = this.credentials.length === 0;
    }

    this.showSpinner = false;

  }

  fillInformationForEmptyState() {
    this.imgName = 'credentials';
    this.title = 'No tienes cuentas bancarias';
    this.description = 'Pulsa el botón de \'Agregar Credencial\' para dar de alta tus cuentas bancarias.';
    this.buttonText = 'Agregar Credencial';
    this.buttonUrl = '/app/banks';
  }

  // SyncButton process
  syncButton(credential: CredentialInterface) {

    this.methodCredentialService.updateCredential(credential);

    this.validateStatusFinished = false;

    setTimeout(() => this.checkDataCredentialService.checkData(credential, this), 0);

  }

  getCredentials() {
    if (this.statefulCredentialsService.credentials) {
      this.credentials = this.statefulCredentialsService.credentials;

      this.credentials.forEach( credential => this.checkDataCredentialService.checkData( credential, this ));

      this.emptyStateProcess();

      this.windowPosition();

      this.fillInformationForEmptyState();

    } else {
      this.credentialService.getAllCredentials().subscribe( res => {
        this.getCredentials();
      });
    }
  }

  getAccounts() {

    if ( this.statefulAccountsService.accounts && this.statefulAccountsService.manualAccounts ) {

      this.accounts = this.statefulAccountsService.accounts;
      this.manualAccounts = this.statefulAccountsService.manualAccounts;

    } else {
      this.accountService.getAccounts().subscribe( () => this.getAccounts());
    }
  }

  windowPosition() {
    window.scrollTo(0, 0);
    const html = document.querySelector('html');
    html.style.overflowX = 'hidden';
  }
}
