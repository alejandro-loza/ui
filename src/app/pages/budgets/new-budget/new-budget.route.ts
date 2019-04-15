import { RouterModule, Routes } from '@angular/router';
import { NewBudgetComponent } from './components/new-budget.component';

const NEW_BUDGET_ROUTING: Routes = [ { path: '', component: NewBudgetComponent } ];

export const NEW_BUDGET_ROUTES = RouterModule.forChild(NEW_BUDGET_ROUTING);
