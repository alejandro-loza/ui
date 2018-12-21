import { NgModule } from         '@angular/core';
import { CommonModule } from     '@angular/common';
import { RouterModule } from     '@angular/router';

// Component
import { DashboardComponent } from   './component/dashboard.component';
import { TabsComponent } from        './component/tabs/tabs.component';

import { BalanceComponent } from     './balance/component/balance.component';
import { ExpensesComponent } from    './expenses/component/expenses.component';
import { IncomesComponent } from     './incomes/component/incomes.component';
import { DiagnosticComponent } from  './diagnostic/component/diagnostic.component';

// Routes
import { DashboardRoutes } from      './dashboard.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutes,
  ],
  declarations: [
    BalanceComponent,
    DashboardComponent,
    DiagnosticComponent,
    ExpensesComponent,
    IncomesComponent,
    TabsComponent,
  ]
})
export class DashboardModule { }
