import { RouterModule, Routes } from '@angular/router';
import { SharedBudgetComponentComponent } from './components/shared-budget-component.component';

const SHARED_BUDGET_COMPONENT_ROUTING: Routes = [ { path: '', component: SharedBudgetComponentComponent } ];

export const SHARED_BUDGET_COMPONENT_ROUTES = RouterModule.forChild(SHARED_BUDGET_COMPONENT_ROUTING);
