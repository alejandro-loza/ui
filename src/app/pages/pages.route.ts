import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '@pages/pages.component';

const PagesRouting: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
        data: {
          title: 'Resumen'
        }
      },
      {
        path: 'budgets',
        loadChildren: () => import('./budgets/budgets.module').then(module => module.BudgetsModule),
        data: {
          title: 'Presupuestos'
        }
      },
      {
        path: 'movements',
        loadChildren: () => import('./movements/movements.module').then(module => module.MovementsModule),
        data: {
          title: 'Movimientos'
        }
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(module => module.CategoriesModule),
        data: {
          title: 'Categorias'
        }
      },
      {
        path: 'credentials',
        loadChildren: () => import('./credential/credential.module').then(module => module.CredentialModule),
        data: {
          title: 'Cuentas'
        }
      },
      {
        path: 'banks',
        loadChildren: () => import('./banks/banks.module').then(module => module.BanksModule),
        data: {
          title: 'Bancos'
        }
      },
      {
        path: 'manual-account/:mode',
        loadChildren: () => import('./manual-account/manual-account.module').then(module => module.ManualAccountModule),
        data: {
          title: 'Nueva cuenta manual'
        }
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

export const PagesRoutes = RouterModule.forChild(PagesRouting);
