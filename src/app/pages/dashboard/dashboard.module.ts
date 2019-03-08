import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from './sharedDashboard/sharedDashboard.module';
import { EmptyStateModule } from '@components/empty-states/empty-states.module';

// Component
import { DashboardComponent } from './component/dashboard.component';
import { TabsComponent } from './component/tabs/tabs.component';

// Routes
import { DashboardRoutes } from './dashboard.route';

import { MovementsService } from '@services/movements/movements.service';

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
		SharedDashboardModule,
		EmptyStateModule
	],
	declarations: [ DashboardComponent, TabsComponent ],
	providers: [ MovementsService ]
})
export class DashboardModule {}
