import { NgModule } from '@angular/core';
import { ModalMaccountsComponent } from './components/modal-maccounts.component';
import { SharedModule } from '@shared/shared.module';
import { UserManualAccountsModule } from '@components/user-manual-accounts/user-manual-accounts.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
	declarations: [ ModalMaccountsComponent ],
	imports: [ SharedModule, UserManualAccountsModule, MatDialogModule ],
	exports: [ ModalMaccountsComponent ]
})
export class ModalMaccountsModule {}
