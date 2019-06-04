import { RouterModule, Routes } from '@angular/router';
import {DetailMovementComponent} from './component/detail-movement.component';

const DetailMovementRouting: Routes = [
  { path: '', component: DetailMovementComponent }
];

export const DetailMovementRoutes = RouterModule.forChild(DetailMovementRouting);
