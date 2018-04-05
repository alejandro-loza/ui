import { RouterModule, Route } from '@angular/router';
import { MovementsComponent } from './components/movements.component';

const MOVEMENTS_ROUTING = [
    { path:'', component: MovementsComponent }
];

export const MOVEMENTS_ROUTES = RouterModule.forChild( MOVEMENTS_ROUTING );