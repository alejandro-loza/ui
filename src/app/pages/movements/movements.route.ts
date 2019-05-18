import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './component/movements.component';

const MovementsRouting: Routes = [
  {
    path: '',
    component: MovementsComponent
  },
  {
    path: ':id',
    loadChildren: './detail-movement/detail-movement.module#DetailMovementModule',
    data: {
      title: 'Movimiento'
    }
  },
  {
    path: '**',
    redirectTo: '/access/login'
  }
];

export const MovementsRoutes = RouterModule.forChild(MovementsRouting);
