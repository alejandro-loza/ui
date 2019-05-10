import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ManualAccountEditerComponent } from './components/manual-account-editer.component';
import { ModalMaccountsModule } from '@components/modal-maccounts/modal-maccounts.module';
import { ModalMaccountsComponent } from '@components/modal-maccounts/components/modal-maccounts.component';

@NgModule({
	declarations: [ ManualAccountEditerComponent ],
	imports: [ SharedModule, ModalMaccountsModule ],
	exports: [ ManualAccountEditerComponent ],
	entryComponents: [ ModalMaccountsComponent ]
})
export class ManualAccountEditerModule {}
