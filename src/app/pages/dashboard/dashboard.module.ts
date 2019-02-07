import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { SharedDashboardModule } from "./sharedDashboard/sharedDashboard.module";

// Component
import { DashboardComponent } from   './component/dashboard.component';
import { TabsComponent } from        './component/tabs/tabs.component';

/*import { BalanceComponent } from     './balance/component/balance.component';
import { ExpensesComponent } from    './expenses/component/expenses.component';
import { IncomesComponent } from     './incomes/component/incomes.component';
import { DiagnosticComponent } from  './diagnostic/component/diagnostic.component';*/

// Routes
import { DashboardRoutes } from      './dashboard.route';

import { MovementsService } from "@services/movements/movements.service";

import { BalanceModule } from './balance/balance.module';
import { ExpensesModule } from './expenses/expenses.module';
import { DiagnosticModule } from './diagnostic/diagnostic.module';
import { IncomesModule } from './incomes/incomes.module';

@NgModule({
  imports: [
    SharedModule,
    BalanceModule,
    ExpensesModule,
    DiagnosticModule,
    IncomesModule,
    DashboardRoutes,
    SharedDashboardModule
  ],
  declarations: [
    DashboardComponent,
    TabsComponent
  ],
  providers: [ MovementsService ]
})
export class DashboardModule { }
