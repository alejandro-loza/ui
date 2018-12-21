import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard.component';

const DashboardRouting: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'incomes',
        loadChildren: './incomes/incomes.module#IncomesModule'
      },
      {
        path: 'expenses',
        loadChildren: './expenses/expenses.module#ExpensesModule'
      },
      {
        path: 'balance',
        loadChildren: './balance/balance.module#BalanceModule'
      },
      {
        path: 'diagnostic',
        loadChildren: './diagnostic/diagnostic.module#DiagnosticModule'
      },
    ]
  }
];

export const DashboardRoutes = RouterModule.forChild(DashboardRouting);
