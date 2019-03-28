import { NgModule } from '@angular/core';
import { ExpensesComponent } from './component/expenses.component';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from '../sharedDashboard/sharedDashboard.module';
import { SeeMovementsButtonComponent } from '../see-movements-button/see-movements-button.component';

@NgModule({
	declarations: [ ExpensesComponent, SeeMovementsButtonComponent ],
	imports: [ SharedModule, SharedDashboardModule ],
	exports: [ ExpensesComponent ]
})
export class ExpensesModule {}
