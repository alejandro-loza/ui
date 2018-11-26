import { RouterModule, Routes } from '@angular/router';
import { NewMovementComponent } from './new-movement/new-movement.component';

const NewMovementsRouting: Routes = [
    { path: '', component: NewMovementComponent }
];

export const NewMovementsRoutes = RouterModule.forChild( NewMovementsRouting );
