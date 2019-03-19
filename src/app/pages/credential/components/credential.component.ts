import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountService } from '@services/account/account.service';
import { CredentialService } from '@services/credentials/credential.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { InstitutionService } from '@services/institution/institution.service';
import { InteractiveFieldService } from '@services/interactive-field/interactive-field.service';
import { ToastService } from '@services/toast/toast.service';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { AccountInterface } from '@interfaces/account.interfaces';
import { CredentialInterface } from '@interfaces/credential.interface';
import * as M from 'materialize-css/dist/js/materialize';
import { InstitutionInterface } from '@app/interfaces/institution.interface';

@Component({
	selector: 'app-credential',
	templateUrl: './credential.component.html',
	styleUrls: [ './credential.component.css' ],
	providers: [ InstitutionService, InteractiveFieldService ]
})
export class CredentialComponent implements OnInit, AfterViewInit {
	accounts: AccountInterface[];
	credentials: CredentialInterface[];
	institutions: InstitutionInterface[] = [];

	creditBalance: number;
	debitBalance: number;
	interactiveFields = [];
	totalBalance: number;
	userId: string;

	debitAccounts: AccountInterface[] = [];
	creditAccounts: AccountInterface[] = [];

	// Aux properties
	processCompleteForSpinner: boolean;
	validateStatusFinished: boolean;
	loaderMessagge: string;
	successMessage: string;
	failMessage: string;
	credentialInProcess: CredentialInterface;
	errorWithCredentials: boolean = false;

	// EMPTY STATE
	imgName: string;
	title: string;
	description: string;
	buttonText: string;
	buttonUrl: string;
	showEmptyState: boolean = false;

	@ViewChild('modal') interactiveModal: ElementRef;
	@ViewChild('collapsible') elementCollapsible: ElementRef;

	constructor(
		private accountService: AccountService,
		private credentialService: CredentialService,
		private institutionService: InstitutionService,
		private interactiveService: InteractiveFieldService,
		private cleanerService: CleanerService,
		private toastService: ToastService,
		private credentialBean: CredentialBeanService
	) {
		this.credentials = [];
		this.debitBalance = 0;
		this.creditBalance = 0;
		this.totalBalance = 0;
		this.userId = sessionStorage.getItem('id-user');
		this.processCompleteForSpinner = false;
		this.validateStatusFinished = true;
		this.loaderMessagge = '';
		this.fillInformationForEmptyState();
	}

	ngOnInit() {
		if (this.credentialBean.getLoadInformation()) {
			this.getAllCredentials();
			this.loadInstitutions();
		} else {
			this.loadInformationFromRam();
		}
	}

	ngAfterViewInit() {}

	loadInformationFromRam() {
		this.credentials = this.credentialBean.getCredentials();
		this.accounts = this.credentialBean.getAccounts();
		this.institutions = this.credentialBean.getInstitutions();
		this.credentials.forEach((credential) => {
			this.checkStatusOfCredential(credential);
			this.automaticSync(credential);
		});
		this.getBalance(this.accounts);
		this.accountsTable(this.accounts);
		this.emptyStateProcess();
		this.processCompleteForSpinner = true;
		this.initMaterialize();
	}

	// Main methods for getting data

	getAllCredentials() {
		this.credentials = [];
		this.debitAccounts = [];
		this.creditAccounts = [];
		this.credentialBean.setCredentials([]);

		this.credentialService.getAllCredentials().subscribe(
			(res) => {
				res.body.data.forEach((element: CredentialInterface) => {
					this.credentials.push(element);
					console.log('dentro del sub', this.credentials.length);
					this.checkStatusOfCredential(element);
					this.automaticSync(element);
				});
				this.emptyStateProcess();
				this.processCompleteForSpinner = true;
			},
			(error) => {
				this.errorWithCredentials = true;
			}
		);
		console.log('terminado', this.credentials.length);
		this.credentialBean.setCredentials(this.credentials);
		this.getAccounts();
	}

	getAccounts() {
		this.accounts = [];
		this.credentialBean.setAccounts([]);
		this.accountService.getAccounts().subscribe((res) => {
			res.body.data.forEach((element: AccountInterface) => {
				this.accounts.push(element);
			});
			this.credentialBean.setAccounts(this.accounts);
			this.getBalance(this.accounts);
			this.accountsTable(this.accounts);
			this.credentialBean.setLoadInformation(false);
			this.initMaterialize();
		});
	}

	automaticSync(credential: CredentialInterface) {
		let currentMoment = new Date();
		if (credential.institution.code != 'BBVA') {
			if (credential.status == 'ACTIVE') {
				let dateObj = new Date(credential.lastUpdated);
				let diff = (currentMoment.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
				if (diff >= 8) {
					this.validateStatusFinished = false;
					this.credentialService.updateCredential(credential).subscribe((res) => {
						this.checkStatusOfCredential(res.body);
					});
				}
			}
		}
	}

	// Checking status of credencials methods

	checkStatusOfCredential(credential: CredentialInterface) {
		if (credential.status === 'ACTIVE') {
			this.validateStatusFinished = true;
		} else if (credential.status === 'INVALID') {
			this.loaderMessagge = '¡Hubo un problema con alguna de tus credenciales!';
		} else if (credential.status === 'VALIDATE') {
			this.loaderMessagge = 'Finerio se está sincronizando con tu banca en línea, esto puede durar unos minutos.';
			this.cleanerService.cleanDashboardVariables();
			this.cleanerService.cleanBudgetsVariables();
			this.getNewInfoCredential(credential.id);
		} else if (credential.status === 'TOKEN') {
			this.loaderMessagge = 'Solicitando información adicional...';
			this.getNewInfoCredential(credential.id);
		}
	}

	getNewInfoCredential(credentialId: string) {
		this.credentialService.getCredential(credentialId).subscribe((res) => {
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
				this.modalProcessForInteractive(res.body);
			} else if (this.credentialInProcess.status === 'INVALID') {
				this.loaderMessagge = '¡Hubo un problema con alguna de tus credenciales!';
				this.validateStatusFinished = false;
				this.getAllCredentials();
			}
		});
	}

	accountsTable(accounts: AccountInterface[]) {
		accounts.forEach((account) => {
			if (account.type == 'Crédito') {
				this.creditAccounts.push(account);
			} else {
				if (account.institution.code != 'DINERIO') {
					this.debitAccounts.push(account);
				}
			}
		});
		this.debitAccounts.sort((a, b) => {
			return b.balance - a.balance;
		});
		this.creditAccounts.sort((a, b) => {
			return a.balance - b.balance;
		});
	}

	getBalance(accountsArray: AccountInterface[]) {
		this.debitBalance = 0;
		this.creditBalance = 0;
		this.totalBalance = 0;
		accountsArray.forEach((element) => {
			if (element.nature !== 'Crédito') {
				this.debitBalance += element.balance;
			} else {
				this.creditBalance += element.balance;
			}
		});
		this.totalBalance = this.debitBalance + this.creditBalance;
	}

	emptyStateProcess() {
		if (this.credentials.length == 0) {
			this.credentialBean.setShowEmptyState(true);
		} else {
			this.credentialBean.setShowEmptyState(false);
		}
		this.showEmptyState = this.credentialBean.getShowEmptyState();
	}

	fillInformationForEmptyState() {
		this.imgName = 'credentials';
		this.title = 'No tienes cuentas bancarias';
		this.description = "Pulsa el botón de 'Agregar Credencial' para dar de alta tus cuentas bancarias.";
		this.buttonText = 'Agregar Credencial';
		this.buttonUrl = '/app/banks';
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
			this.checkStatusOfCredential(this.credentialInProcess);
		});
	}

	modalProcessForInteractive(credential: CredentialInterface) {
		const instanceModal = M.Modal.getInstance(this.interactiveModal.nativeElement);
		instanceModal.open();
		this.getInteractiveFields(credential);
	}

	initMaterialize() {
		setTimeout(() => {
			const initModal = new M.Modal(this.interactiveModal.nativeElement);
			const initCollapsible = new M.Collapsible(this.elementCollapsible.nativeElement);
		}, 100);
	}

	// Loading Institutions in Session Storage

	loadInstitutions() {
		this.institutionService.getAllInstitutions().subscribe((res) => {
			res.body.data.forEach((institution) => {
				if (institution.code !== 'DINERIO') {
					this.institutions.push(institution);
				}
			});
			this.credentialBean.setInstitutions(this.institutions);
		});
	}
}
