import { NgModule } from         '@angular/core';
import { CommonModule } from     '@angular/common';

import { BalanceComponent } from './component/balance.component';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from "../sharedDashboard/sharedDashboard.module";

import { BalanceRoutes } from    './balance.routes';
import { NgxChartsModule } from  '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    BalanceComponent  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    SharedDashboardModule,
    SharedModule
    // BalanceRoutes
  ],
  exports: [ BalanceComponent ]
})
export class BalanceModule { }
