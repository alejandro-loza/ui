import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from './components/bank.component';
import {} from '@services/field/field.service';

const BANK_ROUTING: Routes = [
    { path:'', component: BankComponent }
];

export const BANK_ROUTES = RouterModule.forChild( BANK_ROUTING );