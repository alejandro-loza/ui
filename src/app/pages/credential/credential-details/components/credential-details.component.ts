import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AccountService } from '@services/account/account.service';
import { CredentialService } from '@services/credentials/credential.service';
import { FieldService } from '@services/field/field.service';
import { ToastService } from '@services/toast/toast.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { InstitutionService } from '@services/institution/institution.service';

import { InstitutionFieldInterface } from '@interfaces/institutionField';
import { CredentialInterface } from '@interfaces/credential.interface';
import { AccountInterface } from '@interfaces/account.interfaces';
import { ToastInterface } from '@interfaces/toast.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { isNullOrUndefined } from 'util';
import { InstitutionInterface } from '@app/interfaces/institution.interface';

@Component({
	selector: 'app-credential-details',
	templateUrl: './credential-details.component.html',
	styleUrls: [ './credential-details.component.css' ],
	providers: [ FieldService, InstitutionService ]
})
export class CredentialDetailsComponent implements OnInit, AfterViewInit {
	fields: InstitutionFieldInterface[];
	accounts: AccountInterface[];
	institutionDetails: CredentialInterface;
	accountAuxForDelete: AccountInterface;
	institutions: InstitutionInterface[] = [];
	toast: ToastInterface;
	credentialId: string;
	userId = sessionStorage.getItem('id-user');
	accountId: string;

	@ViewChild('modal') elModal: ElementRef;
	@ViewChild('modal2') elModal2: ElementRef;

	constructor(
		private activated: ActivatedRoute,
		private router: Router,
		private credentialService: CredentialService,
		private fieldService: FieldService,
		private accountService: AccountService,
		private toastService: ToastService,
		private credentialBeanService: CredentialBeanService,
		private institutionService: InstitutionService
	) {
		this.fields = [];
		this.accounts = [];
		this.toast = { classes: null, code: null, message: null };
	}

	ngOnInit() {
		this.activated.params.subscribe((params: Params) => {
			this.credentialId = params['credencialId'];
		});
		if (isNullOrUndefined(this.credentialBeanService.getInstitutions())) {
			this.loadInstitutions();
		} else {
			this.getDetails();
		}
	}

	ngAfterViewInit() {
		const modal = new M.Modal(this.elModal.nativeElement);
		const modal2 = new M.Modal(this.elModal2.nativeElement);
	}

	loadInstitutions() {
		this.institutionService.getAllInstitutions().subscribe((res) => {
			res.body.data.forEach((institution) => {
				if (institution.code !== 'DINERIO') {
					this.institutions.push(institution);
				}
			});
			this.credentialBeanService.setInstitutions(this.institutions);
			this.getDetails();
		});
	}

	getDetails() {
		// Obtenemos un JSON con los detalles de la institution mostrada.
		this.credentialService.getCredential(this.credentialId).subscribe((res) => {
			this.institutionDetails = res.body;
			this.getFields(res.body.institution.code);
			this.getAccounts();
		});
	}

	getAccounts() {
		// Obtenemos las cuentas del usuario pero sólo gurdamos las de la institución mostrada.
		this.accountService.getAccounts(this.userId).subscribe((res) => {
			res.body.data.forEach((element) => {
				if (element.institution.code === this.institutionDetails.institution.code) {
					this.accounts.push(element);
				}
			});
		});
	}

	getFields(code: string) {
		// Obtenemos los campos a mostrar de la institución mostrada y borramos el primer campo
		// que en todos los casos es el username.
		this.fieldService.findAllFieldsByInstitution(code).subscribe(
			(res) => {
				res.body.forEach((fieldBank) => {
					this.fields.push(fieldBank);
				});
				this.fields.shift();
			},
			(err) => {
				this.toast.message = 'Ocurrió un error, intentalo de nuevo';
				this.toastService.toastGeneral(this.toast);
				this.credentialBeanService.setLoadInformation(true);
				this.router.navigateByUrl('/app/credentials');
			}
		);
	}

	updateCredential(credential) {
		this.credentialService.updateCredential(credential).subscribe(
			(res) => {
				this.toast.code = res.status;
			},
			(error) => {
				this.toast.code = error.status;
				this.toast.message = 'Ocurrió un error al actualizar tu credencial';
				this.toastService.toastGeneral(this.toast);
			},
			() => {
				this.toast.message = 'Sincronización en proceso...';
				this.toastService.toastGeneral(this.toast);
				this.credentialBeanService.setLoadInformation(true);
				this.router.navigateByUrl('/app/credentials');
			}
		);
	}

	deleteCredential() {
		this.credentialService.deleteCredential(this.credentialId).subscribe(
			(res) => {
				this.toast.code = res.status;
			},
			(error) => {
				this.toast.code = error.status;
				this.toast.message = 'Ocurrió un error al elminar la credencial, inténtalo mas tarde';
				this.toastService.toastGeneral(this.toast);
			},
			() => {
				this.toast.message = 'Credencial elminada correctamente';
				this.toastService.toastGeneral(this.toast);
				this.credentialBeanService.setLoadInformation(true);
				this.router.navigateByUrl('/app/credentials');
			}
		);
	} // Delete Account's process

	deleteAccount(account) {
		this.accountAuxForDelete = account;
		const instanceModal = M.Modal.getInstance(this.elModal2.nativeElement);
		instanceModal.open();
	}

	deleteAccountConfirmed() {
		this.accountService.deleteAccount(this.accountAuxForDelete.id).subscribe(
			(res) => {
				this.toast.code = res.status;
			},
			(error) => {
				this.toast.code = error.status;
				this.toast.message = 'Ocurrió un error al elminar la cuenta, inténtalo mas tarde';
				this.toastService.toastGeneral(this.toast);
			},
			() => {
				this.toast.message = 'Cuenta elminada correctamente';
				this.toastService.toastGeneral(this.toast);
				this.credentialBeanService.setLoadInformation(true);
				this.router.navigateByUrl('/app/credentials');
			}
		);
	}
}
