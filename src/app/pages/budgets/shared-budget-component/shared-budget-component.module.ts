import { NgModule } from '@angular/core';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { SharedModule } from '@shared/shared.module';

import { SharedBudgetComponentComponent } from './components/shared-budget-component.component';

import { SHARED_BUDGET_COMPONENT_ROUTES } from './shared-budget-component.route';

@NgModule({
  imports: [
    SharedModule,
    BackButtonModule,
    SHARED_BUDGET_COMPONENT_ROUTES ],
  declarations: [ SharedBudgetComponentComponent ]
})
export class SharedBudgetComponentModule {}
