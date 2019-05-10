import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { AccountInterface } from '@app/interfaces/account.interfaces';

@Component({
	selector: 'app-modal-maccounts',
	templateUrl: './modal-maccounts.component.html',
	styleUrls: [ './modal-maccounts.component.css' ]
})
export class ModalMaccountsComponent implements OnInit {
	manualAccount: AccountInterface;
	showEmptyState: boolean;

	constructor(private matDialogRef: MatDialogRef<ModalMaccountsComponent>, private router: Router) {
		this.showEmptyState = false;
	}

	ngOnInit() {}

	close(event: Event) {
		event.stopPropagation();
		this.matDialogRef.close(this.manualAccount);
	}

	modalManualaccountsTrigger(event) {
		this.showEmptyState = event;
	}

	manualAccountSelected(event) {
		this.manualAccount = event;
	}

	createManualAccount() {
		this.matDialogRef.close();
		this.router.navigateByUrl('/app/manual-account/new');
	}
}
