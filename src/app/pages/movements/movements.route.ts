import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './component/movements.component';

const MovementsRouting: Routes = [
  {
    path: '',
    component: MovementsComponent
  },
  {
    path: 'new-movement',
    loadChildren: './new-movement/new-movement.module#NewMovementModule',
    data: {
      title: 'Nuevo movimiento'
    }
  },
  {
    path: '**',
    redirectTo: '/access/login'
  }
];

export const MovementsRoutes = RouterModule.forChild(MovementsRouting);
