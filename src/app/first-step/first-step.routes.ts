import { RouterModule, Routes } from '@angular/router';
import { FirstStepComponent } from './component/first-step.component';

const FirstStepRouting: Routes = [
  {
    path: '',
    component: FirstStepComponent,
    children: [
      {
        path: 'username',
        loadChildren: './user-name/user-name.module#UserNameModule',
        data: {
          title: 'Nombre de Usuario'
        }
      },
      {
        path: 'adviser',
        loadChildren: './adviser/adviser.module#AdviserModule',
        data: {
          title: 'Asesor Financiero'
        }
      },
      {
        path: 'security',
        loadChildren: './security-help/security-help.module#SecurityHelpModule',
        data: {
          title: 'Seguridad para ti'
        }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/access/login'
      },
      {
        path: '**',
        redirectTo: '/access/login'
      }
    ]
  }
];

export const FirstStepRoutes = RouterModule.forChild(FirstStepRouting);
