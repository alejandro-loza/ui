import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { EmptyStateModule } from '@components/empty-states/empty-states.module';

// Routes
import { BUDGETS_ROUTES } from './budgets.route';

// Components
import { BudgetsComponent } from './components/budgets.component';

@NgModule({
	imports: [ CommonModule, SharedModule, EmptyStateModule, BUDGETS_ROUTES ],
	declarations: [ BudgetsComponent ]
})
export class BudgetsModule {}
