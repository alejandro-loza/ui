import { NgModule } from '@angular/core';
import { ExpensesComponent } from './component/expenses.component';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from '../sharedDashboard/sharedDashboard.module';
import { SeeMovementsButtonModule } from '../see-movements-button/see-movements-button.module';

@NgModule({
	declarations: [ ExpensesComponent ],
	imports: [ SharedModule, SharedDashboardModule, SeeMovementsButtonModule ],
	exports: [ ExpensesComponent ]
})
export class ExpensesModule {}
