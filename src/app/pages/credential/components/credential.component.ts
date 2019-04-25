import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

// SERVICES
import { AccountService } from '@services/account/account.service';
import { CredentialService } from '@services/credentials/credential.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { InstitutionService } from '@services/institution/institution.service';
import { InteractiveFieldService } from '@services/interactive-field/interactive-field.service';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { ToastService } from '@services/toast/toast.service';

// Interfaces
import { AccountInterface } from '@interfaces/account.interfaces';
import { CredentialInterface } from '@interfaces/credential.interface';
import { InstitutionInterface } from '@app/interfaces/institution.interface';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
	selector: 'app-credential',
	templateUrl: './credential.component.html',
	styleUrls: [ './credential.component.css' ],
	providers: [ InstitutionService, InteractiveFieldService ]
})
export class CredentialComponent implements OnInit {
	accounts: AccountInterface[];
	manualAccounts: AccountInterface[];
	credentials: CredentialInterface[];
	institutions: InstitutionInterface[] = [];
	interactiveFields = [];

	// Aux properties
	showSpinner: boolean;
	credentialInProcess: CredentialInterface;
	errorWithCredentials: boolean = false;
	showGoMovementsButton: boolean = false;

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
	showEmptyState: boolean = false;

	@ViewChild('modal') interactiveModal: ElementRef;
	constructor(
		private accountService: AccountService,
		private credentialService: CredentialService,
		private institutionService: InstitutionService,
		private interactiveService: InteractiveFieldService,
		private cleanerService: CleanerService,
		private credentialBean: CredentialBeanService,
		private dateApiService: DateApiService,
		private toastService: ToastService
	) {
		this.credentials = [];
		this.showSpinner = true;
		this.validateStatusFinished = true;
		this.loaderMessagge = 'Finerio se está sincronizando con tu banca en línea, esto puede tardar unos minutos.';
		this.successMessage = '';
		this.failMessage = '';
	}

	ngOnInit() {
		if (this.credentialBean.getLoadInformation()) {
			this.getAllCredentials();
			this.loadInstitutions();
			this.getAccounts();
		} else {
			this.loadInformationFromRam();
		}
		this.windowPosition();
		this.fillInformationForEmptyState();
	}

	loadInformationFromRam() {
		this.credentials = this.credentialBean.getCredentials();
		this.accounts = this.credentialBean.getAccounts();
		this.institutions = this.credentialBean.getInstitutions();
		this.manualAccounts = this.accountService.getManualAccounts;
		this.credentials.forEach((credential) => {
			this.checkStatusOfCredential(credential);
			this.automaticSync(credential);
		});
		this.emptyStateProcess();
		this.showSpinner = false;
	}

	// Main method for getting data
	getAllCredentials() {
		this.clearMemory();
		this.credentialService.getAllCredentials().subscribe(
			(res) => {
				this.credentials = res.body.data;
			},
			(error) => {
				this.errorWithCredentials = true;
				this.showSpinner = false;
			},
			() => {
				this.credentials.forEach((element: CredentialInterface) => {
					this.checkStatusOfCredential(element);
					this.automaticSync(element);
				});
				this.credentialBean.setCredentials(this.credentials);
				this.emptyStateProcess();
			}
		);
	}

	// Checking status of credencials methods

	checkStatusOfCredential(credential: CredentialInterface) {
		if (credential.status === 'ACTIVE') {
			this.validateStatusFinished = true;
		} else if (credential.status === 'INVALID') {
			this.failMessage = '¡Hubo un problema con alguna(s) de tus cuentas bancarias!';
		} else if (credential.status === 'VALIDATE') {
			this.cleanerService.cleanDashboardVariables();
			this.cleanerService.cleanBudgetsVariables();
			this.getNewInfoCredential(credential.id);
		} else if (credential.status === 'TOKEN') {
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
				}, 4000);
			} else if (this.credentialInProcess.status === 'ACTIVE') {
				this.loadNewCredentials();
			} else if (this.credentialInProcess.status === 'TOKEN') {
				this.validateStatusFinished = false;
				this.modalProcessForInteractive(res.body);
			} else if (this.credentialInProcess.status === 'INVALID') {
				this.loadNewCredentials();
			}
		});
	}

	messageForNewInvalidStatus() {
		this.toastService.setMessage = '¡Revisa tu cuenta de  ' + this.credentialInProcess.institution.name + '!';
		this.toastService.setCode = 200;
		this.toastService.setDisplayLength = 3000;
		this.validateStatusFinished = true;
		this.toastService.toastGeneral();
	}

	messageForNewActiveStatus() {
		this.toastService.setMessage =
			'Tu cuenta de ' + this.credentialInProcess.institution.name + ' ha sido sincronizada';
		this.toastService.setCode = 200;
		this.toastService.setDisplayLength = 3000;
		this.toastService.toastGeneral();

		this.successMessage = '¡Tus datos han sido sincronizados';
		this.validateStatusFinished = true;
		this.showGoMovementsButton = true;
	}

	toastController() {
		this.credentialInProcess.status === 'ACTIVE'
			? this.messageForNewActiveStatus()
			: this.messageForNewInvalidStatus();
	}

	// Method for each conclusion of sync
	loadNewCredentials() {
		this.clearMemory();
		this.toastController();
		this.credentialService.getAllCredentials().subscribe(
			(res) => {
				this.credentials = res.body.data;
			},
			(error) => {
				this.errorWithCredentials = true;
			},
			() => {
				this.credentialBean.setCredentials(this.credentials);
				this.getAccounts();
			}
		);
		this.cleanerService.cleanDashboardVariables();
		this.cleanerService.cleanBudgetsVariables();
	}

	// AUTOMATIC SYNC PROCESS FOR EACH CREDENTIAL
	automaticSync(credential: CredentialInterface) {
		if (credential.institution.code != 'BBVA') {
			if (credential.status == 'ACTIVE') {
				if (this.moreThanEightHours(credential)) {
					this.validateStatusFinished = false;
					this.credentialService.updateCredential(credential).subscribe((res) => {
						this.checkStatusOfCredential(res.body);
					});
				}
			}
		}
	}

	getAccounts() {
		this.credentialBean.setAccounts([]);
		this.accountService.getAccounts().subscribe((res) => {
			this.accounts = res.body.data;
			this.credentialBean.setAccounts(this.accounts);
			this.credentialBean.setLoadInformation(false);
			this.manualAccountsFilter();
		});
	}

	manualAccountsFilter() {
		this.manualAccounts = [];
		this.accounts.forEach((account) => {
			if (account.nature.includes('ma_')) {
				this.manualAccounts.push(account);
			}
		});
		this.accountService.setManualAccounts = this.manualAccounts;
		this.showSpinner = false;
	}

	emptyStateProcess() {
		if (this.credentialBean.getCredentials().length == 0) {
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

	moreThanEightHours(credential: CredentialInterface): boolean {
		let currentMoment: Date = new Date();
		let dateObj: Date = this.dateApiService.formatDateForAllBrowsers(credential.lastUpdated);
		let diff: number = (currentMoment.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
		if (diff >= 8) {
			return true;
		} else {
			return false;
		}
	}

	// SyncButton process
	syncButton(credential: CredentialInterface) {
		this.validateStatusFinished = false;
		this.credentialService.updateCredential(credential).subscribe((res) => {
			this.checkStatusOfCredential(res.body);
		});
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

	ngAfterViewInit(): void {
		const initModal = new M.Modal(this.interactiveModal.nativeElement);
	}

	clearMemory() {
		this.credentials = [];
		this.accounts = [];
	}

	windowPosition() {
		window.scrollTo(0, 0);
		let html = document.querySelector('html');
		html.style.overflowX = 'hidden';
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
