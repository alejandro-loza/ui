import { RouterModule, Route } from '@angular/router';
import { BudgetsComponent } from './components/budgets.component';

const BUDGETS_ROUTING = [
    { path: '', component: BudgetsComponent }
];

export const BUDGETS_ROUTES = RouterModule.forChild( BUDGETS_ROUTING );