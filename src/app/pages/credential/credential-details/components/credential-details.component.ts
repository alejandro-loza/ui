import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AccountService } from '@services/account/account.service';
import { CredentialService } from '@services/credentials/credential.service';
import { FieldService } from '@services/field/field.service';
import { ToastService } from '@services/toast/toast.service';
import { InstitutionService } from '@services/institution/institution.service';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { StatefulInstitutionsService } from '@stateful/institutions/stateful-institutions.service';

import { InstitutionFieldInterface } from '@interfaces/institutionField';
import { CredentialInterface } from '@interfaces/credentials/credential.interface';
import { AccountInterface } from '@interfaces/account.interfaces';
import { InstitutionInterface } from '@app/interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { StatefulCredentialService } from '@stateful/credential/stateful-credential.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { StatefulAccountsService } from '@stateful/accounts/stateful-accounts.service';
import { MethodCredentialService } from '@services/credentials/method-credential/method-credential.service';
import {OauthService} from '@services/oauth/oauth.service';
import {isUndefined, isNullOrUndefined} from 'util';
import { UpdateCredential } from '@app/interfaces/credentials/updateCredential.interface';

@Component({
  selector: 'app-credential-details',
  templateUrl: './credential-details.component.html',
  styleUrls: [ './credential-details.component.css' ],
  providers: [ FieldService, InstitutionService ]
})
export class CredentialDetailsComponent implements OnInit, AfterViewInit {
  showSpinner: boolean;
  fields: InstitutionFieldInterface[];
  accounts: AccountInterface[];
  account: AccountInterface;
  institutions: InstitutionInterface[];
  credential: CredentialInterface;

  @ViewChild('modal', { static: false })
  elModal: ElementRef;
  @ViewChild('modal2', { static: false })
  elModal2: ElementRef;
  @ViewChild('modal3', { static: false })
  elModal3: ElementRef;

  constructor(
    private accountService: AccountService,
    private cleanerService: CleanerService,
    private credentialService: CredentialService,
    private dateApi: DateApiService,
    private fieldService: FieldService,
    private methodCredential: MethodCredentialService,
    private oAuthService: OauthService,
    private router: Router,
    private statefulAccounts: StatefulAccountsService,
    private statefulCredential: StatefulCredentialService,
    private statefulInstitutions: StatefulInstitutionsService,
    private toastService: ToastService
  ) {
    this.showSpinner = true;
  }

  ngOnInit() {
    this.getData();
    this.showSpinner = false;
  }

  ngAfterViewInit() {
    const modal = new M.Modal(this.elModal.nativeElement);
    const modal2 = new M.Modal(this.elModal2.nativeElement);
    const modal3 = new M.Modal(this.elModal3.nativeElement, { dismissible: false });
  }

  getData() {
    this.institutions = this.statefulInstitutions.institutions;
    this.getCredentials();
    this.getAccounts();
  }

  getFields() {
    this.fieldService.findAllFieldsByInstitution(this.credential.institution.code).subscribe(
      (res) => {
        this.fields = res.body
        this.fields.shift();
      },
      (err) => {
        this.toastService.setCode = err.status;
        this.toastService.setMessage = 'Ocurrió un error, intentalo de nuevo';
        this.toastService.toastGeneral();

        return this.router.navigate([ '/app', 'credentials' ]);
      }
    );
  }

  submit( data: NgForm ) {
    if ( this.credential.institution.code === 'BANREGIO' ) {
      this.updateCredentialOauth( this.credential );
    } else {
      this.updateCredentialProcess( this.credential, data );
    }
  }

  private updateCredentialProcess( credential: CredentialInterface, data: NgForm ) {
    if (this.dateApi.hasMoreThanEightHours(credential.lastUpdated) || credential.status === 'INVALID') {

      if ( credential.status === 'ACTIVE' ) {
        this.activeCredential(credential)
      } else {
        this.invalidCredential(credential, data)
      }

    } else {
      this.cantUpdateToast();
    }
  }

  private updateCredentialOauth( credentialInterface: CredentialInterface ) {

    this.oAuthService.updateCredential( credentialInterface ).subscribe(
      res => {
        this.oAuthService.createPopUp( res );
      },
      () => {},
      () => this.cleanerService.cleanAllVariables()
    );
  }

  invalidCredential(credential: CredentialInterface, data: NgForm) {
    this.openLoaderModal();
    let auxCredential: UpdateCredential = {
      id : this.credential.id,
      password: data.value.password,
      securityCode: this.getFormattedDate( data.value.sec_code )
    };

    this.methodCredential.updateCredential(credential, auxCredential);
    this.closeLoaderModal();
  }

  getFormattedDate( date: string ): string { 

    if ( isNullOrUndefined( date ) ) { return }  

    let newDate = new Date( new Date( date ).getTime() + 
                            new Date( date ).getTimezoneOffset() * 
                            60 * 
                            1000 );
    
    let year = newDate.getFullYear().toString();
    let month = ( newDate.getMonth() + 1 ).toString();
    let day = newDate.getDate().toString();
   
    if ( newDate.getDate() < 10 ) {
      day = "0" + day
    }

    return year + month + day;
  }

  activeCredential(credential: CredentialInterface) {
    this.openLoaderModal();
    this.cleanerService.cleanAllVariables();
    this.methodCredential.updateCredential(credential);
  }

  deleteCredential() {
    this.openLoaderModal();
    this.credentialService.deleteCredential(this.credential.id).subscribe(
      (res) => {
        this.cleanerService.cleanAllVariables();
        this.toastService.setCode = res.status;
      },
      (error) => {
        this.toastService.setCode = error.status;
        this.toastService.setMessage = 'Ocurrió un error al elminar la credencial, inténtalo mas tarde';
        this.toastService.toastGeneral();
      },
      () => {
        this.toastService.setMessage = 'Credencial elminada correctamente';
        this.toastService.toastGeneral();
        this.closeLoaderModal();
      }
    );
  }

  openLoaderModal() {
    const instanceModal = M.Modal.getInstance(this.elModal3.nativeElement);
    instanceModal.open();
  }

  closeLoaderModal() {
    const instanceModal = M.Modal.getInstance(this.elModal3.nativeElement);
    instanceModal.close();
    this.cleanerService.cleanAllVariables();
    this.router.navigateByUrl('/app/credentials');
  }

  // Delete Account's process
  deleteAccount(account) {
    this.account = JSON.parse(JSON.stringify(account));
    const instanceModal = M.Modal.getInstance(this.elModal2.nativeElement);
    instanceModal.open();
  }

  getAccounts() {

    if ( !isUndefined( this.statefulAccounts.accounts ) && this.statefulAccounts.accounts.length > 0 ) {

      this.accounts = this.statefulAccounts.accounts.filter( account => account.institution.code === this.credential.institution.code );

    } else {

      this.accountService.getAccounts().subscribe( res => {

        this.accounts = res.body.data.filter( account => account.institution.code === this.credential.institution.code );

      });

    }
  }

  cantUpdateToast() {
    this.toastService.setCode = 200;
    this.toastService.setMessage = 'Debes esperar 8 horas antes de volver a sincronizar tu credencial';
    this.toastService.toastGeneral();
  }

  deleteAccountConfirmed() {
    this.openLoaderModal();
    this.accountService.deleteAccount(this.account).subscribe(
      (res) => {

        this.cleanerService.cleanAllVariables();

        this.toastService.setCode = res.status;

        this.accountService.getAccounts().subscribe(() => this.router.navigate([ '/app', 'credentials' ]));
      },
      (error) => {
        this.toastService.setCode = error.status;
        this.toastService.setMessage = 'Ocurrió un error al elminar la cuenta, inténtalo mas tarde';
        this.toastService.toastGeneral();
      },
      () => {
        this.toastService.setMessage = 'Cuenta elminada correctamente';
        this.toastService.toastGeneral();
        this.closeLoaderModal();
      }
    );
  }

  private getCredentials() {

    if ( !isUndefined( this.statefulCredential.credential ) ) {

      this.credential = this.statefulCredential.credential;

      if ( this.credential.institution.id !== 17 ) {
        this.getFields();
      }

    } else {
      this.credentialService.getAllCredentials().subscribe(
        () => this.getCredentials()
      );
    }
  }

}
