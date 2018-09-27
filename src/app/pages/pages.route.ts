import { RouterModule, Routes } from '@angular/router';

const PagesRouting: Routes = [
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: 'budgets', loadChildren: './budgets/budgets.module#BudgetsModule'},
  {path: 'movements', loadChildren: './movements/movements.module#MovementsModule' },
  {path: 'saving', loadChildren: './saving/saving.module#SavingModule' },
  {path: 'category', loadChildren: './category/category.module#CategoryModule' },
  {path: 'credential', loadChildren: './credential/credential.module#CredentialModule' },
  {path: '', pathMatch:'full', redirectTo: '/app/dashboard'},
  {path: '**', redirectTo: '/app/dashboard'}
];

export const PagesRoutes = RouterModule.forChild( PagesRouting );
