import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard.component';

const DashboardRouting: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'incomes',
        loadChildren: './incomes/incomes.module#IncomesModule',
        data: {
          title: 'Ingreso'
        }
      },
      {
        path: 'expenses',
        loadChildren: './expenses/expenses.module#ExpensesModule',
        data: {
          title: 'Gasto'
        }
      },
      {
        path: 'balance',
        loadChildren: './balance/balance.module#BalanceModule',
        data: {
          title: 'Balance'
        }
      },
      {
        path: 'diagnostic',
        loadChildren: './diagnostic/diagnostic.module#DiagnosticModule',
        data: {
          title: 'Diagnostico'
        }
      },
    ]
  }
];

export const DashboardRoutes = RouterModule.forChild(DashboardRouting);
