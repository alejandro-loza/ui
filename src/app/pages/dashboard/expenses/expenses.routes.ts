import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './component/expenses.component';

const ExpensesRouting: Routes = [
  {
    path: '',
    component: ExpensesComponent,
  }
];

export const ExpensesRoutes = RouterModule.forChild( ExpensesRouting );
