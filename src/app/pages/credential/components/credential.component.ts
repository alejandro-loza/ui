import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AccountInterface} from '@interfaces/account.interfaces';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';

import {InteractiveFieldService} from '@services/interactive-field/interactive-field.service';
import {MethodCredentialService} from '@services/credentials/method-credential/method-credential.service';
import {PollingCredentialService} from '@services/credentials/polling-credential/polling-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';
import {AccountService} from '@services/account/account.service';

import {Subscription} from 'rxjs';

import {CheckDataCredentialService} from '@services/credentials/check-data/check-data-credential.service';
import {CredentialUpdateResponse} from '@interfaces/credentials/credential-update-response';

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
    private checkDataCredentialService: CheckDataCredentialService,
    private interactiveService: InteractiveFieldService,
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
    this.credentials = this.statefulCredentialsService.credentials;
    this.accounts = this.statefulAccountsService.accounts;
    this.manualAccounts = this.statefulAccountsService.manualAccounts;

    this.checkDataCredentialService.checkData(this);
    this.emptyStateProcess();
    this.windowPosition();
    this.fillInformationForEmptyState();
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
    this.showEmptyState = this.credentials.length === 0 && this.accounts.length <= 1 && this.manualAccounts.length >= 0;
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

    setTimeout(() => this.checkDataCredentialService.checkData(this), 0);

  }

  windowPosition() {
    window.scrollTo(0, 0);
    const html = document.querySelector('html');
    html.style.overflowX = 'hidden';
  }
}
