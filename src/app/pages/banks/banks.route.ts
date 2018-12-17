import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './components/banks.component';

const BANKS_ROUTING: Routes = [
    { path:'', component: BanksComponent }
];

export const BANKS_ROUTES = RouterModule.forChild( BANKS_ROUTING );
