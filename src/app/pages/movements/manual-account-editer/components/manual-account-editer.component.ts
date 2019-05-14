import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '@services/account/account.service';
import { ToastService } from '@services/toast/toast.service';
import { AccountsBeanService } from '@services/account/accounts-bean.service';
import { ModalMaccountsComponent } from '@components/modal-maccounts/components/modal-maccounts.component';
import { Movement } from '@app/interfaces/movement.interface';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AccountInterface } from '@app/interfaces/account.interfaces';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-manual-account-editer',
	templateUrl: './manual-account-editer.component.html',
	styleUrls: [ './manual-account-editer.component.css' ]
})
export class ManualAccountEditerComponent implements OnInit {
	accountWithOutDefaults: string;
	manualAccount: AccountInterface;

	@Input() imgSrc: string;
	@Input() movement: Movement;

	constructor(
		private accountService: AccountService,
		private matDialog: MatDialog,
		private toastService: ToastService,
		private accountsBeanService: AccountsBeanService
	) {}

	ngOnInit() {}

	onErrorFunc(type: string) {
		this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults(type);
		this.imgSrc = `assets/media/img/manual_account/${this.accountWithOutDefaults}.svg`;
	}

	openDialog(event: Event) {
		if (this.movement.account.institution.code == 'DINERIO') {
			event.stopPropagation();
			let matDialogConfig: MatDialogConfig<any>;
			matDialogConfig = {
				autoFocus: true,
				disableClose: true,
				closeOnNavigation: true,
				restoreFocus: true,
				width: '80%'
			};
			const matDialogRef = this.matDialog.open(ModalMaccountsComponent, matDialogConfig);
			matDialogRef.afterClosed().subscribe(
				(res) => {
					this.manualAccount = res;
				},
				(err) => {
					this.toastService.setCode = err.code;
					if (err.code === 500) {
						const message = 'Ocurrío un error al cambiar la cuenta';
						this.toastService.setMessage = message;
					}
					this.toastService.toastGeneral();
				},
				() => {
					if (!isNullOrUndefined(this.manualAccount)) {
						this.movement.account = this.manualAccount;
						this.accountsBeanService.setMaualAccountToMovementsEditer = this.manualAccount;
						this.accountsBeanService.changeManualAccountOnMovements.emit(true);
					}
				}
			);
		}
	}
}
