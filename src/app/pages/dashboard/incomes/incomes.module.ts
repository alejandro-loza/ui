import { NgModule } from         '@angular/core';

import { IncomesComponent } from './component/incomes.component';
import { IncomesRoutes } from    './incomes.routes';
import { SharedDashboardModule } from "../sharedDashboard/sharedDashboard.module";
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [IncomesComponent],
  imports: [
    SharedModule,
    SharedDashboardModule
    // IncomesRoutes
  ],
  exports: [ IncomesComponent ]
})
export class IncomesModule { }
