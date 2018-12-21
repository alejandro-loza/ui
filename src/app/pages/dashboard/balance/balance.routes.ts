import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './component/balance.component';

const BalanceRouting: Routes = [
  {
    path: '',
    component: BalanceComponent,
  }
];

export const BalanceRoutes = RouterModule.forChild( BalanceRouting );
