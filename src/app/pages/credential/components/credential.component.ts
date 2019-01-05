import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountService } from '@services/account/account.service';
import { CredentialService } from '@services/credentials/credential.service';
import { InstitutionService } from '@services/institution/institution.service';
import { InteractiveFieldService } from '@services/interactive-field/interactive-field.service';

import { AccountInterface } from '@interfaces/account.interfaces';
import { CredentialInterface } from '@interfaces/credential.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { Credential } from '@shared/dto/credentials/credential';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css'],
  providers: [InstitutionService, InteractiveFieldService]
})
export class CredentialComponent implements OnInit, AfterViewInit {
  accounts: AccountInterface[];
  credentials: CredentialInterface[];

  creditBalance: number;
  debitBalance: number;
  interactiveFields = [];
  totalBalance: number;
  userId: string;

  // Aux properties
  processCompleteForSpinner: boolean;
  validateStatusFinished: boolean;
  loaderMessagge: string;
  credentialInProcess: Credential;

  @ViewChild('modal') interactiveModal: ElementRef;

  constructor(
    private accountService: AccountService,
    private credentialService: CredentialService,
    private institutionService: InstitutionService,
    private interactiveService: InteractiveFieldService
  ) {
    this.credentials = [];
    this.debitBalance = 0;
    this.creditBalance = 0;
    this.totalBalance = 0;
    this.userId = sessionStorage.getItem('id-user');
    this.processCompleteForSpinner = false;
    this.validateStatusFinished = true;
    this.loaderMessagge = '';
  }

  ngOnInit() {
    this.getAllCredentials();
    this.loadInstitutions();
  }

  ngAfterViewInit() {
    const initModal = new M.Modal(this.interactiveModal.nativeElement);
  }

  // Main methods for getting data

  getAllCredentials() {
    this.credentials = [];
    this.credentialService.getAllCredentials(this.userId).subscribe(res => {
      res.body.data.forEach((element: CredentialInterface) => {
        this.credentials.push(element);
        this.checkStatusOfCredential(element);
      });
      this.processCompleteForSpinner = true;
    });
    this.getAccounts();
  }

  getAccounts() {
    this.accounts = [];
    this.accountService.getAccounts(this.userId).subscribe(res => {
      res.body.data.forEach((element: AccountInterface) => {
        this.accounts.push(element);
      });
      this.getBalance(this.accounts);
    });
  }

  getBalance(accountsArray: AccountInterface[]) {
    this.debitBalance = 0;
    this.creditBalance = 0;
    this.totalBalance = 0;
    accountsArray.forEach(element => {
      if (element.nature !== 'Crédito') {
        this.debitBalance += element.balance;
      } else {
        this.creditBalance += element.balance;
      }
    });
    this.totalBalance = this.debitBalance + this.creditBalance;
  }

  // Checking status of credencials methods

  checkStatusOfCredential(credential: CredentialInterface) {
    if (credential.status === 'ACTIVE') {
      this.validateStatusFinished = true;
    } else if (credential.status === 'INVALID') {
      this.loaderMessagge = '¡Ha ocurrido algo con una de tus credenciales!';
    } else if (credential.status === 'VALIDATE') {
      this.loaderMessagge =
        'Finerio se está sincronizando con tu banca en línea. Esto puede durar unos minutos.';
      this.getNewInfoCredential(credential.id);
    } else if (credential.status === 'TOKEN') {
      this.loaderMessagge = 'Solicitando información adicional...';
      this.getNewInfoCredential(credential.id);
    }
  }

  getNewInfoCredential(credentialId) {
    this.credentialService.getCredential(credentialId).subscribe(res => {
      this.credentialInProcess = res.body;
      if (this.credentialInProcess.status === 'VALIDATE') {
        this.validateStatusFinished = false;
        setTimeout(() => {
          this.checkStatusOfCredential(res.body);
        }, 1000);
      } else if (this.credentialInProcess.status === 'ACTIVE') {
        this.loaderMessagge = '¡Tus datos han sido sincronizados!';
        this.getAllCredentials();
      } else if (this.credentialInProcess.status === 'TOKEN') {
        this.validateStatusFinished = false;
        //  Modal process
        this.modalProcessForInteractive(res);
      } else if (this.credentialInProcess.status === 'INVALID') {
        this.loaderMessagge = '¡Ha ocurrido algo con una de tus credenciales!';
        this.validateStatusFinished = false;
        this.getAllCredentials();
      }
    });
  }

  // InteractiveFields Process

  getInteractiveFields(credential: Credential) {
    this.interactiveService.findAllFields(credential).subscribe((data: any) => {
      data.forEach(element => {
        this.interactiveFields.push(element);
      });
    });
  }

  interactiveSubmit(form: NgForm) {
    this.interactiveService
      .sendToken(this.credentialInProcess, form.value)
      .subscribe(res => {
        this.checkStatusOfCredential(this.credentialInProcess);
      });
  }

  modalProcessForInteractive(credential: Credential) {
    const instanceModal = M.Modal.getInstance(
      this.interactiveModal.nativeElement
    );
    instanceModal.open();
    this.getInteractiveFields(credential);
  }

  // Loading Institutions in Session Storage

  loadInstitutions() {
    this.institutionService.getAllInstitutions().subscribe(res => {
      sessionStorage.setItem('institutions', JSON.stringify(res.body.data));
    });
  }
}
