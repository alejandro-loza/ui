import { RouterModule, Routes } from   '@angular/router';
import { PagesComponent } from         '@pages/pages.component';

const PagesRouting: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'budgets',
        loadChildren: './budgets/budgets.module#BudgetsModule'
      },
      {
        path: 'movements',
        loadChildren: './movements/movements.module#MovementsModule'
      },
      {
        path: 'saving',
        loadChildren: './saving/saving.module#SavingModule'
      },
      {
        path: 'category',
        loadChildren: './category/category.module#CategoryModule'
      },
      {
        path: 'credentials',
        loadChildren: './credential/credential.module#CredentialModule'
      },
      {
        path: 'banks',
        loadChildren: './banks/banks.module#BanksModule'
      },
      {
        path: 'bank/:bankCode',
        loadChildren: './bank/bank.module#BankModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

export const PagesRoutes = RouterModule.forChild( PagesRouting );
