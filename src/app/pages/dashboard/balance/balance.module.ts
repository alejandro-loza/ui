import { NgModule } from         '@angular/core';

import { BalanceComponent } from './component/balance.component';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from "../sharedDashboard/sharedDashboard.module";

import { BalanceRoutes } from    './balance.routes';

@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    SharedModule,
    SharedDashboardModule,
    // BalanceRoutes
  ],
  exports: [ BalanceComponent ]
})
export class BalanceModule { }
