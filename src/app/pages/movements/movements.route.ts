import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './component/movements.component';

const MovementsRouting: Routes = [
    {
        path: '',
        component: MovementsComponent
    }
];

export const MovementsRoutes = RouterModule.forChild( MovementsRouting );
