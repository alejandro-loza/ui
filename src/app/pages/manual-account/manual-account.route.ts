import { RouterModule, Routes } from '@angular/router';
import { ManualAccountComponent } from './components/manual-account.component';

const MANUAL_ACCOUNT_ROUTING: Routes = [ { path: '', component: ManualAccountComponent } ];

export const MANUAL_ACCOUNT_ROUTER = RouterModule.forChild(MANUAL_ACCOUNT_ROUTING);
