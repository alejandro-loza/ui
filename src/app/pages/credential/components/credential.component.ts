import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AccountInterface} from '@interfaces/account.interfaces';
import {CredentialInterface} from '@interfaces/credential.interface';

import {InteractiveFieldService} from '@services/interactive-field/interactive-field.service';
import {MethodCredentialService} from '@services/credentials/method-credential/method-credential.service';
import {PollingCredentialService} from '@services/credentials/polling-credential/polling-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';
import {AccountService} from '@services/account/account.service';

import {Subscription} from 'rxjs';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: [ './credential.component.css' ]
})

export class CredentialComponent implements OnInit, AfterViewInit {
  accounts: AccountInterface[];
  manualAccounts: AccountInterface[];
  credentials: CredentialInterface[];
  interactiveFields = [];

  // Aux properties
  showSpinner: boolean;
  credentialInProcess: CredentialInterface;
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

  @ViewChild('modal', {static: false}) interactiveModal: ElementRef;

  constructor(
    private accountService: AccountService,
    private interactiveService: InteractiveFieldService,
    private methodCredential: MethodCredentialService,
    private pollingCredentialService: PollingCredentialService,
    private statefulAccounts: StatefulAccountsService,
    private statefulCredentials: StatefulCredentialsService,
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
    this.checkData();
    this.emptyStateProcess();
    this.windowPosition();
    this.fillInformationForEmptyState();
  }

  ngAfterViewInit(): void {
    const initModal = new M.Modal(this.interactiveModal.nativeElement);
    initModal.options = { dismissible: false };
  }

  checkData() {

    if (this.statefulCredentials.credentials) {

      this.credentials = this.statefulCredentials.credentials;

      this.credentials.forEach( credential => {

        if (credential.status === 'VALIDATE') {
          this.checkSubscription(credential);
        }

      });

    }

    if (this.statefulAccounts.accounts) {

      this.accounts = this.statefulAccounts.accounts;

    }

    if (this.statefulAccounts.manualAccounts) {

      this.manualAccounts = this.statefulAccounts.manualAccounts;

    }

  }

  checkSubscription(credential: CredentialInterface) {
    const unpolledCredential = this.pollingCredentialService.checkCredentialStatus(credential).subscribe(
      res => this.checkCredentialSyncing(res.body, unpolledCredential)
    );
  }

  checkCredentialSyncing ( credential: CredentialInterface, subscription: Subscription ) {

    if ( this.pollingCredentialService.unsubscribeFromProcessing( credential, subscription) ) {

      this.statefulCredentials.credentials = this.statefulCredentials.credentials.map( auxCredential => {

        if ( credential.id === auxCredential.id ) {
          auxCredential = {...credential};
        }

        this.accountService.getAccounts().subscribe();
        return auxCredential;

      });

      this.validateStatusFinished = true;

      this.showGoMovementsButton = true;

    } else {

      this.validateStatusFinished = false;


    }

    this.credentials = this.statefulCredentials.credentials;

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
    this.methodCredential.updateCredential(credential);
    this.checkData();
    this.validateStatusFinished = false;
  }

  // InteractiveFields Process
  getInteractiveFields(credential: CredentialInterface) {
    this.interactiveFields = [];
    this.interactiveService.findAllFields(credential).subscribe((data: any) => {
      data.forEach((element) => {
        this.interactiveFields.push(element);
      });
    });
  }

  interactiveSubmit(form: NgForm) {
    this.interactiveService.sendToken(this.credentialInProcess, form.value).subscribe((res) => {
      /*
       * toDO Recrear la sincronización de una cuenta con Token y ver como será para el polling con el uso del nuevo servicio
       */
      // this.checkStatusOfCredential(this.credentialInProcess);
    });
  }

  modalProcessForInteractive(credential: CredentialInterface) {
    const instanceModal = M.Modal.getInstance(this.interactiveModal.nativeElement, {
      dismissible: false
    });
    instanceModal.open();
    this.getInteractiveFields(credential);
  }

  windowPosition() {
    window.scrollTo(0, 0);
    const html = document.querySelector('html');
    html.style.overflowX = 'hidden';
  }
}
