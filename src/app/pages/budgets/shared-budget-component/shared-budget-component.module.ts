import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { SharedModule } from '@shared/shared.module';

import { SharedBudgetComponentComponent } from './components/shared-budget-component.component';

import { SHARED_BUDGET_COMPONENT_ROUTES } from './shared-budget-component.route';

@NgModule({
	imports: [ CommonModule, FormsModule, BackButtonModule, SharedModule, SHARED_BUDGET_COMPONENT_ROUTES ],
	declarations: [ SharedBudgetComponentComponent ]
})
export class SharedBudgetComponentModule {}
