import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './components/movements.component';

const MovementsRouting: Routes = [
    {
        path: '',
        component: MovementsComponent
    },
    {
        path: 'newMovement',
        loadChildren: './new-movement/new-movement.module#NewMovementModule'
    }
];

export const MovementsRoutes = RouterModule.forChild( MovementsRouting );
