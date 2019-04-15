import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from './sharedDashboard/sharedDashboard.module';
import { EmptyStateModule } from '@components/empty-states/empty-states.module';
import { SeeMovementsButtonModule } from './see-movements-button/see-movements-button.module';

// Component
import { DashboardComponent } from './component/dashboard.component';
import { TabsComponent } from './component/tabs/tabs.component';

// Routes
import { DashboardRoutes } from './dashboard.route';

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
		EmptyStateModule,
		SeeMovementsButtonModule
	],
	declarations: [ DashboardComponent, TabsComponent ],
	providers: [],
	exports: []
})
export class DashboardModule {}
