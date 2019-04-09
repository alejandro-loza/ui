import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AccountService } from '@services/account/account.service';
import { CredentialService } from '@services/credentials/credential.service';
import { FieldService } from '@services/field/field.service';
import { ToastService } from '@services/toast/toast.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { InstitutionService } from '@services/institution/institution.service';
import { CleanerService } from '@services/cleaner/cleaner.service';

import { InstitutionFieldInterface } from '@interfaces/institutionField';
import { CredentialInterface } from '@interfaces/credential.interface';
import { AccountInterface } from '@interfaces/account.interfaces';
import { InstitutionInterface } from '@app/interfaces/institution.interface';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
	selector: 'app-credential-details',
	templateUrl: './credential-details.component.html',
	styleUrls: [ './credential-details.component.css' ],
	providers: [ FieldService, InstitutionService ]
})
export class CredentialDetailsComponent implements OnInit, AfterViewInit {
	showSpinner: boolean = false;
	fields: InstitutionFieldInterface[];
	accounts: AccountInterface[];
	institutionDetails: CredentialInterface;
	accountAuxForDelete: AccountInterface;
	institutions: InstitutionInterface[] = [];
	credentialId: string;

	@ViewChild('modal') elModal: ElementRef;
	@ViewChild('modal2') elModal2: ElementRef;
	@ViewChild('modal3') elModal3: ElementRef;

	constructor(
		private activated: ActivatedRoute,
		private router: Router,
		private credentialService: CredentialService,
		private fieldService: FieldService,
		private accountService: AccountService,
		private toastService: ToastService,
		private credentialBeanService: CredentialBeanService,
		private cleanerService: CleanerService,
		private institutionService: InstitutionService
	) {
		this.fields = [];
		this.accounts = [];
	}

	ngOnInit() {
		this.showSpinner = true;
		this.activated.params.subscribe((params: Params) => {
			this.credentialId = params['credencialId'];
		});
		if (this.credentialBeanService.getInstitutions().length == 0) {
			this.loadInstitutions();
		} else {
			this.getDetails();
		}
	}

	ngAfterViewInit() {
		const modal = new M.Modal(this.elModal.nativeElement);
		const modal2 = new M.Modal(this.elModal2.nativeElement);
		const modal3 = new M.Modal(this.elModal3.nativeElement);
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
		});
	}

	getAccounts() {
		// Obtenemos las cuentas del usuario pero sólo gurdamos las de la institución mostrada.
		this.accountService.getAccounts().subscribe((res) => {
			res.body.data.forEach((element) => {
				if (element.institution.code === this.institutionDetails.institution.code) {
					this.accounts.push(element);
				}
			});
			this.showSpinner = false;
		});
	}

	getFields(code: string) {
		// Obtenemos los campos a mostrar de la institución mostrada y borramos el primer campo
		// que en todos los casos es el username.
		this.fieldService.findAllFieldsByInstitution(code).subscribe(
			(res) => {
				res.body.forEach((fieldBank) => {
					if (fieldBank.name !== 'sec_code') {
						this.fields.push(fieldBank);
					}
				});
				this.fields.shift();
				this.getAccounts();
			},
			(err) => {
				this.toastService.setCode = err.status;
				this.toastService.setMessage = 'Ocurrió un error, intentalo de nuevo';
				this.toastService.toastGeneral();
				this.credentialBeanService.setLoadInformation(true);
				this.router.navigateByUrl('/app/credentials');
			}
		);
	}

	updateCredential(credential: CredentialInterface, data: NgForm) {
		if (this.syncPossible(credential)) {
			credential.status == 'ACTIVE'
				? this.activeCredential(credential)
				: this.invalidCredential(credential, data);
		} else {
			this.toastService.setCode = 200;
			this.toastService.setMessage = 'Debes esperar 8 horas antes de volver a sincronizar tu credencial';
			this.toastService.toastGeneral();
		}
	}

	invalidCredential(credential: CredentialInterface, data: NgForm) {
		this.openLoaderModal();
		credential.password = data.value.password;
		this.credentialService.updateCredential(credential).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
			},
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Ocurrió un error al actualizar tu credencial';
				this.toastService.toastGeneral();
			},
			() => {
				this.toastService.setMessage = 'Sincronización en proceso...';
				this.toastService.toastGeneral();
				this.credentialBeanService.setLoadInformation(true);
				this.cleanerService.cleanDashboardVariables();
				this.cleanerService.cleanBudgetsVariables();
				return this.router.navigateByUrl('/app/credentials');
			}
		);
	}

	activeCredential(credential: CredentialInterface) {
		this.openLoaderModal();
		this.credentialService.updateCredential(credential).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
			},
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Ocurrió un error al actualizar tu credencial';
				this.toastService.toastGeneral();
			},
			() => {
				this.toastService.setMessage = 'Sincronización en proceso...';
				this.toastService.toastGeneral();
				this.credentialBeanService.setLoadInformation(true);
				this.cleanerService.cleanDashboardVariables();
				this.cleanerService.cleanBudgetsVariables();
				return this.router.navigateByUrl('/app/credentials');
			}
		);
	}

	syncPossible(credential: CredentialInterface): boolean {
		let isPossible: boolean = false;
		let currentMoment = new Date();
		let dateObj = new Date(credential.lastUpdated);
		let diff = (currentMoment.getTime() - dateObj.getTime()) / (1000 * 60 * 60);

		if (credential.status == 'ACTIVE') {
			isPossible = diff >= 8 ? true : false;
		} else {
			isPossible = true;
		}

		return isPossible;
	}

	deleteCredential() {
		this.openLoaderModal();
		this.credentialService.deleteCredential(this.credentialId).subscribe(
			(res) => {
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
				this.credentialBeanService.setLoadInformation(true);
				this.cleanerService.cleanDashboardVariables();
				this.cleanerService.cleanBudgetsVariables();
				this.closeLoaderModal();
				return this.router.navigateByUrl('/app/credentials');
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
	}

	// Delete Account's process
	deleteAccount(account) {
		this.accountAuxForDelete = account;
		const instanceModal = M.Modal.getInstance(this.elModal2.nativeElement);
		instanceModal.open();
	}

	deleteAccountConfirmed() {
		this.openLoaderModal();
		this.accountService.deleteAccount(this.accountAuxForDelete.id).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
			},
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Ocurrió un error al elminar la cuenta, inténtalo mas tarde';
				this.toastService.toastGeneral();
			},
			() => {
				this.toastService.setMessage = 'Cuenta elminada correctamente';
				this.toastService.toastGeneral();
				this.credentialBeanService.setLoadInformation(true);
				this.closeLoaderModal();
				return this.router.navigateByUrl('/app/credentials');
			}
		);
	}
}
