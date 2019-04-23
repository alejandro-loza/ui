import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'materialize-css/dist/js/materialize';
import { NgForm } from '@angular/forms';
import { ManualAccountList } from '@app/interfaces/manual-accounts/manual-account-list.interface';
import { ManualAccountHttp } from '@interfaces/manual-accounts/manual-account-http.interface';
import { AccountService } from '@services/account/account.service';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { ToastService } from '@services/toast/toast.service';

@Component({
	selector: 'app-manual-account',
	templateUrl: './manual-account.component.html',
	styleUrls: [ './manual-account.component.css' ]
})
export class ManualAccountComponent implements OnInit {
	backButtonRoute: string;
	editModeOfTheComponent: boolean;
	manualAccountPick: ManualAccountList = {};
	manualAccount: ManualAccountHttp = {};
	manualAccountBalance: string = 'positive';
	showSpinner: boolean = false;

	@ViewChild('modal') elModal: ElementRef;

	constructor(
		private activatedRoute: ActivatedRoute,
		private accountService: AccountService,
		private router: Router,
		private cleanerService: CleanerService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.setModeOfTheComponent();
		this.setBackButtonRoute();
		this.setManualAccountDefaultSettings();
	}

	ngAfterViewInit() {
		const modal = new M.Modal(this.elModal.nativeElement);
	}

	setManualAccountDefaultSettings() {
		this.manualAccountPick.accountKey = 'cash';
		this.manualAccountPick.accountName = 'Efectivo';
		this.manualAccountPick.iconName = 'DINERIO';

		document.querySelector('#positive').classList.add('active');
	}

	createManualAccount() {
		this.accountService.createManualAccount(this.manualAccount).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
			},
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Ocurrió un error, vuelve a intentarlo';
				this.toastService.toastGeneral();
			},
			() => {
				this.toastService.setMessage = '¡Cuenta creada con éxito!';
				this.toastService.toastGeneral();
				this.cleanerService.cleanAllVariables();
				this.router.navigateByUrl('/app/credentials');
			}
		);
	}

	balanceBtnClick(balance: string) {
		this.manualAccountBalance = balance;
		if (balance == 'negative') {
			document.querySelector('#positive').classList.remove('active');
			document.querySelector('#' + balance).classList.add('active');
		} else {
			document.querySelector('#negative').classList.remove('active');
			document.querySelector('#' + balance).classList.add('active');
		}
	}

	submitForm(form: NgForm) {
		this.showSpinner = true;
		(<HTMLButtonElement>document.querySelector('#submitButton')).disabled = true;

		this.setBalanceToManualAccount(form.value.accountAmount);
		this.setDefaultToManualAccount(form.value.cashDefault);
		this.setNatureToManualAccount(form.value.atmDefault, form.value.cashDefault);
		this.manualAccount.name = form.value.accountName;

		this.createManualAccount();
	}

	setNatureToManualAccount(atm: any, cash: any) {
		let nature = this.manualAccountPick.accountKey;
		if (cash === true) {
			nature += '_csh_d';
		}
		if (atm === true) {
			nature += '_atm_d';
		}
		this.manualAccount.nature = nature;
	}

	setDefaultToManualAccount(value: any) {
		this.manualAccount.default = value === true ? value : false;
	}

	setBalanceToManualAccount(value: number) {
		this.manualAccount.balance = this.manualAccountBalance == 'positive' ? value : value * -1;
	}

	manualAccountSelected(event: ManualAccountList) {
		this.manualAccountPick = event;
	}

	setBackButtonRoute() {
		this.backButtonRoute = this.editModeOfTheComponent ? `/app/credentials` : '/app/banks';
	}

	setModeOfTheComponent() {
		this.activatedRoute.params.subscribe((params) => {
			this.editModeOfTheComponent = params['mode'] === 'edit' ? true : false;
		});
	}
}
