import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

// Routes
import { BUDGETS_ROUTES } from './budgets.route';

// Components
import { BudgetsComponent } from './components/budgets.component';

@NgModule({
	imports: [ CommonModule, SharedModule, BUDGETS_ROUTES ],
	declarations: [ BudgetsComponent ]
})
export class BudgetsModule {}
