import { NgModule } from             '@angular/core';
import { CommonModule } from         '@angular/common';
import { ExpensesComponent } from    './component/expenses.component';
import { ExpensesRoutes } from       './expenses.routes';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from "../sharedDashboard/sharedDashboard.module";

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxChartsModule,
    SharedDashboardModule
    // ExpensesRoutes
  ],
  exports: [
    ExpensesComponent
  ]
})
export class ExpensesModule { }
