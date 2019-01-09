import { NgModule } from         '@angular/core';
import { CommonModule } from     '@angular/common';

import { IncomesComponent } from './component/incomes.component';
import { IncomesRoutes } from    './incomes.routes';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedDashboardModule } from "../sharedDashboard/sharedDashboard.module";

@NgModule({
  declarations: [IncomesComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    SharedDashboardModule
    // IncomesRoutes
  ],
  exports: [ IncomesComponent ]
})
export class IncomesModule { }
