import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './component/banks.component';

const BanksRouting: Routes = [
  {
    path: '',
    component: BanksComponent
  },
  {
    path: ':bankCode',
    loadChildren: () => import('./bank-form/bank-form.module').then(module => module.BankFormModule)
  },
  {
    path: '**',
    redirectTo: '/access/login'
  }
];

export const BanksRoutes = RouterModule.forChild(BanksRouting);
