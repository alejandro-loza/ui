import { RouterModule, Routes } from '@angular/router';
import { BudgetDetailComponent } from './components/budget-detail.component';

const BUDGET_DETAIL_ROUTING: Routes = [ { path: '', component: BudgetDetailComponent } ];

export const BUDGET_DETAIL_ROUTES = RouterModule.forChild(BUDGET_DETAIL_ROUTING);
