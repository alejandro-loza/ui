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
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { AccountInterface } from '@interfaces/account.interfaces';
import { CredentialInterface } from '@interfaces/credential.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { ToastService } from '@services/toast/toast.service';
import { ToastInterface } from '@interfaces/toast.interface';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css'],
  providers: [InstitutionService, InteractiveFieldService]
})
export class CredentialComponent implements OnInit, AfterViewInit {
  accounts: AccountInterface[];
  credentials: CredentialInterface[];
  toast: ToastInterface;

  creditBalance: number;
  debitBalance: number;
  interactiveFields = [];
  totalBalance: number;
  userId: string;

  debitAccounts:AccountInterface[] = [];
  creditAccounts:AccountInterface[] = [];
  investmentsAccounts:AccountInterface[] = [];

  // Aux properties
  processCompleteForSpinner: boolean;
  validateStatusFinished: boolean;
  loaderMessagge: string;
  credentialInProcess: CredentialInterface;
  errorWithCredentials:boolean = false;

  @ViewChild('modal') interactiveModal: ElementRef;
  @ViewChild("collapsible") elementCollapsible: ElementRef;

  constructor(
    private accountService: AccountService,
    private credentialService: CredentialService,
    private institutionService: InstitutionService,
    private interactiveService: InteractiveFieldService,
    private dashboardBean: DashboardBeanService,
    private toastService: ToastService
  ) {
    this.credentials = [];
    this.debitBalance = 0;
    this.creditBalance = 0;
    this.totalBalance = 0;
    this.userId = sessionStorage.getItem('id-user');
    this.processCompleteForSpinner = false;
    this.validateStatusFinished = true;
    this.loaderMessagge = '';
    this.toast = { classes: null, code: null, message: null };
  }

  ngOnInit() {
    this.getAllCredentials();
    this.loadInstitutions();
  }

  ngAfterViewInit() {
    const initModal = new M.Modal(this.interactiveModal.nativeElement);
    const initCollapsible = new M.Collapsible(
      this.elementCollapsible.nativeElement,
      {}
    );
  }

  // Main methods for getting data

  getAllCredentials() {
    this.credentials = [];
    this.debitAccounts = [];
    this.creditAccounts = [];
    this.investmentsAccounts = [];
    this.credentialService.getAllCredentials().subscribe(res => {
      res.body.data.forEach((element: CredentialInterface) => {
        this.credentials.push(element);
        this.checkStatusOfCredential(element);
      });
      this.processCompleteForSpinner = true;
    }, error => {
      this.errorWithCredentials = true;
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
      this.accountsTable( this.accounts );
      this.automaticSync( this.credentials );
    });
  }

  automaticSync( credentials:CredentialInterface[] ){
    
    let currentMoment = new Date();
    credentials.forEach( credential => {
      let dateObj =  new Date(credential.lastUpdated);
      let diff = (currentMoment.getTime() - dateObj.getTime()) / (1000 *60 * 60);

      if( diff >= 8 ){
        this.credentialService.updateCredential( credential ).subscribe( res => {
          this.checkStatusOfCredential( credential );
        });
      }
    });
  }

  accountsTable( accounts:AccountInterface[] ){
    accounts.forEach( account => {
      if( account.type == "Crédito" ){
        this.creditAccounts.push( account );
      } else if( account.type == "DEBIT" || account.type == "Cheques" || account.type == "Débito"){
        if( account.institution.code != "DINERIO"){
          this.debitAccounts.push( account );
        }
      } else if( account.type == "Inversión"){
        this.investmentsAccounts.push( account );
      }
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
      this.loaderMessagge = '¡Ha ocurrido algo con tu credencial ' + credential.institution.name + "!";
    } else if (credential.status === 'VALIDATE') {
      this.loaderMessagge =
        'Finerio se está sincronizando con tu banca en línea. Esto puede durar unos minutos.';
      this.getNewInfoCredential(credential.id);
    } else if (credential.status === 'TOKEN') {
      this.loaderMessagge = 'Solicitando información adicional para ' + credential.institution.name + "...";
      this.getNewInfoCredential(credential.id);
    }
    this.toast.message = this.loaderMessagge;
  }

  getNewInfoCredential(credentialId) {
    this.credentialService.getCredential(credentialId).subscribe(res => {
      this.credentialInProcess = res.body;
      this.toast.code = res.status;
      if (this.credentialInProcess.status === 'VALIDATE') {
        this.validateStatusFinished = false;
        setTimeout(() => {
          this.checkStatusOfCredential(res.body);
        }, 1000);
      } else if (this.credentialInProcess.status === 'ACTIVE') {
        this.loaderMessagge = '¡Tus datos han sido sincronizados!';
        this.toast.message = this.loaderMessagge;
        this.getAllCredentials();
        this.dashboardBean.setLoadInformation( true );
      } else if (this.credentialInProcess.status === 'TOKEN') {
        this.validateStatusFinished = false;
        //  Modal process
        this.modalProcessForInteractive(res.body);
      } else if (this.credentialInProcess.status === 'INVALID') {
        this.loaderMessagge = '¡Ha ocurrido algo con una de tus credenciales!';
        this.validateStatusFinished = false;
        this.getAllCredentials();
      }
    });
  }

  // InteractiveFields Process

  getInteractiveFields(credential: CredentialInterface) {
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

  modalProcessForInteractive(credential: CredentialInterface) {
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
