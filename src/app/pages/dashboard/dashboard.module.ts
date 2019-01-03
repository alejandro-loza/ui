import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '@shared/shared.module';

// Component
import { DashboardComponent } from   './component/dashboard.component';
import { TabsComponent } from        './component/tabs/tabs.component';

import { BalanceModule } from        './balance/balance.module';
import { DiagnosticModule } from     './diagnostic/diagnostic.module';
import { ExpensesModule } from       './expenses/expenses.module';
import { IncomesModule } from        './incomes/incomes.module';

// Routes
import { DashboardRoutes } from      './dashboard.route';
import { MonthChartComponent } from  './component/monthChart/month-chart.component';

import { MovementsService } from     '@services/movements/movements.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BalanceModule,
    DiagnosticModule,
    ExpensesModule,
    IncomesModule,
    SharedModule,
    NgxChartsModule,
    DashboardRoutes,
  ],
  declarations: [
    DashboardComponent,
    TabsComponent,
    MonthChartComponent,
  ],
  providers: [ MovementsService ]
})
export class DashboardModule { }
