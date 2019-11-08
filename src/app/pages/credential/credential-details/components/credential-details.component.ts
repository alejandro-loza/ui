import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
import { MixpanelService } from '@services/mixpanel/mixpanel.service';

import * as M from 'materialize-css/dist/js/materialize';
import { StatefulCredentialService } from '@stateful/credential/stateful-credential.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { StatefulAccountsService } from '@stateful/accounts/stateful-accounts.service';
import { MethodCredentialService } from '@services/credentials/method-credential/method-credential.service';
import {OauthService} from '@services/oauth/oauth.service';
import {isUndefined} from 'util';

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
    private activated: ActivatedRoute,
    private accountService: AccountService,
    private cleanerService: CleanerService,
    private credentialService: CredentialService,
    private dateApi: DateApiService,
    private fieldService: FieldService,
    private methodCredential: MethodCredentialService,
    private mixpanelService: MixpanelService,
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
    // Obtenemos los campos a mostrar de la institución mostrada y borramos el primer campo
    // que en todos los casos es el username.
    this.fieldService.findAllFieldsByInstitution(this.credential.institution.code).subscribe(
      (res) => {
        this.fields = res.body.filter((field) => field.name !== 'sec_code');
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

  updateCredential(credential: CredentialInterface, data: NgForm) {

    if ( credential.institution.code === 'BANREGIO' ) {

      this.updateCredentialOauth( credential );

    } else {

      this.updateCredentialProcess( credential, data );

    }

  }

  private updateCredentialProcess( credential: CredentialInterface, data: NgForm ) {
    this.dateApi.hasMoreThanEightHours(credential.lastUpdated) || credential.status === 'INVALID'
      ? credential.status === 'ACTIVE'
      ? this.activeCredential(credential)
      : this.invalidCredential(credential, data)
      : this.cantUpdateToast();
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
    const auxCredential = { ...credential, password: data.value.password };
    this.methodCredential.updateCredential(auxCredential);
    this.closeLoaderModal();
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
