import { NgModule } from             '@angular/core';
import { ExpensesComponent } from    './component/expenses.component';
import { ExpensesRoutes } from       './expenses.routes';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from "../sharedDashboard/sharedDashboard.module";

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
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
