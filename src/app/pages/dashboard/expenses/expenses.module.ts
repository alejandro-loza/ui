import { NgModule } from '@angular/core';
import { ExpensesComponent } from './component/expenses.component';
import { SharedModule } from '@shared/shared.module';
import { SharedDashboardModule } from '../sharedDashboard/sharedDashboard.module';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [SharedModule, SharedDashboardModule],
  exports: [ExpensesComponent]
})
export class ExpensesModule {}
