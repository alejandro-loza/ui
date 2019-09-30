import { NgModule } from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';

import {BankSyncingAnimationModule} from '@animations/bank-syncing-animation/bank-syncing-animation.module';
import { ModalAccountSyncComponent } from './component/modal-account-sync.component';
import {SpinnerBankSyncAnimationModule} from '@animations/spinner-bank-sync-animation/spinner-bank-sync-animation.module';
import {SpinnerBankFinishedAnimationModule} from '@animations/spinner-bank-finished-animation/spinner-bank-finished-animation.module';
import {BankFinishedAnimationModule} from '@animations/bank-finished-animation/bank-finished-animation.module';

@NgModule({
  declarations: [
    ModalAccountSyncComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    BankSyncingAnimationModule,
    BankFinishedAnimationModule,
    SpinnerBankSyncAnimationModule,
    SpinnerBankFinishedAnimationModule,
  ],
  exports: [
    ModalAccountSyncComponent
  ],
  entryComponents: [ ModalAccountSyncComponent ]
})
export class ModalAccountSyncModule { }
