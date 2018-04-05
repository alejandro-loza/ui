import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './components/movements.component';

const MOVEMENTS_ROUTING: Routes = [
    { path:'', component: MovementsComponent }
];

export const MOVEMENTS_ROUTES = RouterModule.forChild( MOVEMENTS_ROUTING );