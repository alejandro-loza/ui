import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from "@angular/router";

// Component
import { DashboardComponent } from   './component/dashboard.component';
import { TabsComponent } from        './component/tabs/tabs.component';

import { BalanceComponent } from     './balance/component/balance.component';
import { ExpensesComponent } from    './expenses/component/expenses.component';
import { IncomesComponent } from     './incomes/component/incomes.component';
import { DiagnosticComponent } from  './diagnostic/component/diagnostic.component';

// Routes
import { DashboardRoutes } from      './dashboard.route';
import { MonthChartComponent } from './component/monthChart/month-chart.component';

import { MovementsService } from "@services/movements/movements.service";

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    SharedModule,
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
    MonthChartComponent,
  ],
  providers: [ MovementsService ]
})
export class DashboardModule { }
