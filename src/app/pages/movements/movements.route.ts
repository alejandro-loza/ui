import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './component/movements.component';

const MovementsRouting: Routes = [
  {
    path: '',
    component: MovementsComponent
  },
  {
    path: ':id',
    loadChildren: () => import('./detail-movement/detail-movement.module').then(module => module.DetailMovementModule),
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
