import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { BanksComponent } from './component/banks.component';
import { BankItemComponent } from './bank-item/bank-item.component';

import { BanksRoutes } from './banks.routes';
import { BackButtonModule } from '@components/back-button/back-button.module';
import {ModalAccountSyncModule} from '@components/modal-account-sync/modal-account-sync.module';

@NgModule({
  imports: [
    SharedModule,
    BackButtonModule,
    ModalAccountSyncModule,
    BanksRoutes
  ],
  declarations: [
    BanksComponent,
    BankItemComponent
  ],
  providers: []
})
export class BanksModule {}
