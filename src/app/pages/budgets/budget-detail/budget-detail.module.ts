import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { SharedModule } from '@shared/shared.module';

// Component
import { BudgetDetailComponent } from './components/budget-detail.component';

// Route
import { BUDGET_DETAIL_ROUTES } from './budget-detail.route';

@NgModule({
	imports: [ CommonModule, BackButtonModule, SharedModule, BUDGET_DETAIL_ROUTES ],
	declarations: [ BudgetDetailComponent ]
})
export class BudgetDetailModule {}
