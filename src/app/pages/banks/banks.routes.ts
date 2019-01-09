import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './component/banks.component';

const BanksRouting: Routes = [
  { path: '', component: BanksComponent },
  {
    path: ':bankCode',
    loadChildren: './bank-form/bank-form.module#BankFormModule'
  }
];

export const BanksRoutes = RouterModule.forChild(BanksRouting);
