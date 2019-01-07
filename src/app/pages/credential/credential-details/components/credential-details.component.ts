import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from                                         '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AccountService } from                 '@services/account/account.service';
import { CredentialService } from              '@services/credentials/credential.service';
import { FieldService } from                   '@services/field/field.service';
import { ToastService } from                   '@services/toast/toast.service';

import { AccountInterface } from               '@interfaces/account.interfaces';
import { CredentialInterface } from            '@interfaces/credential.interface';
import { InstitutionFieldInterface } from      '@interfaces/institutionField';
import { ToastInterface } from                 '@interfaces/toast.interface';

import * as M from                             'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-credential-details',
  templateUrl: './credential-details.component.html',
  styleUrls: ['./credential-details.component.css'],
  providers: [FieldService]
})
export class CredentialDetailsComponent implements OnInit, AfterViewInit {
  credentialId: string;

  accounts: AccountInterface[];
  fields: InstitutionFieldInterface[];
  institutionDetails: CredentialInterface;
  toast: ToastInterface;

  userId = sessionStorage.getItem('id-user');
  accountId: string;
  accountAuxForDelete: AccountInterface;

  @ViewChild('modal') elModal: ElementRef;
  @ViewChild('modal2') elModal2: ElementRef;

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private credentialService: CredentialService,
    private fieldService: FieldService,
    private accountService: AccountService,
    private toastService: ToastService,
  ) {
    this.fields = [];
    this.accounts = [];
    this.toast = { code: null, classes: null, message: null };
  }

  ngOnInit() {
    this.activated.params.subscribe((params: Params) => {
      this.credentialId = params['credencialId'];
    });
    this.getDetails();
  }

  ngAfterViewInit() {
    const modal = new M.Modal(this.elModal.nativeElement);
    const modal2 = new M.Modal(this.elModal2.nativeElement);
  }

  getDetails() {
    // Obtenemos un JSON con los detalles de la institution mostrada.
    this.credentialService.getCredential(this.credentialId).subscribe(res => {
      this.institutionDetails = res.body;
      this.getFields(this.institutionDetails.institution.code);
      this.getAccounts();
    });
  }

  getAccounts() {
    // Obtenemos las cuentas del usuario pero sólo gurdamos las de la institución mostrada.
    this.accountService.getAccounts(this.userId).subscribe(res => {
      res.body.data.forEach( (element: AccountInterface) => {
        if (
          element.institution.code === this.institutionDetails.institution.code
        ) {
          this.accounts.push(element);
        }
      });
    });
  }

  getFields(code: string) {
    // Obtenemos los campos a mostrar de la institución mostrada y borramos el primer campo
    // que en todos los casos es el username.
    this.fieldService
      .findAllFieldsByInstitution(code)
      .subscribe(res => {
        res.body.forEach((fieldBank: InstitutionFieldInterface) => {
          this.fields.push(fieldBank);
        });
        this.fields.shift();
      });
  }

  updateCredential(credential ) {
    this.credentialService.updateCredential(credential).subscribe(
      res => {
        this.toast.code = res.status;
        this.toast.message = 'Sincronización en proceso...';
        this.toastService.toastGeneral(this.toast);
        this.router.navigateByUrl('/app/credentials');
      },
      error => {
        this.toast.code = error.status;
        this.toast.message = 'Ocurrió un error al actualizar tu credencial';
        this.toastService.toastGeneral(this.toast);
      },
      () => {}
    );
  }

  deleteCredential() {
    this.credentialService.deleteCredential(this.credentialId).subscribe(
      res => {
        this.toast.code = res.status;
        this.toast.message = 'Se borró correctamente tu credencial';
        this.router.navigateByUrl('/app/credentials');
        this.toastService.toastGeneral(this.toast);
      },
      error => {
        this.toast.code = error.status;
        this.toast.message = 'Ocurrió un error al actualizar tu credencial';
        this.toastService.toastGeneral(this.toast);
      }
    );
  }

  // Delete Account's process
  deleteAccount(account: AccountInterface) {
    this.accountAuxForDelete = account;
    const instanceModal = M.Modal.getInstance(this.elModal2.nativeElement);
    instanceModal.open();
  }

  deleteAccountConfirmed() {
    this.accountService.deleteAccount(this.accountAuxForDelete.id).subscribe(
      res => {
        this.toast.code = res.status;
        this.toast.message = 'Se borró correctamente tu cuenta';
        this.toastService.toastGeneral(this.toast);
        this.accounts = [];
        this.getAccounts();
      },
      error => {
        this.toast.code = error.status;
        this.toast.message = 'Ocurrió un error al elminar la cuenta, inténtalo mas tarde';
        this.toastService.toastGeneral(this.toast);
      }
    );
  }
}
