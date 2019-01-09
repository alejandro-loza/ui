import { Routes, RouterModule } from '@angular/router';
import { BankFormComponent } from './component/bank-form.component';

const BankFormRouting: Routes = [
  { path: '', component: BankFormComponent }
];

export const BankFormRoutes = RouterModule.forChild(BankFormRouting);
