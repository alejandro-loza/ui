import { RouterModule, Routes } from '@angular/router';
import { FirstStepComponent } from './component/first-step.component';

const FirstStepRouting: Routes = [
  {
    path: '',
    component: FirstStepComponent,
    children: [
      {
        path: 'username',
        loadChildren: () => import('./user-name/user-name.module').then(module => module.UserNameModule),
        data: {
          title: 'Nombre de Usuario'
        }
      },
      {
        path: 'adviser',
        loadChildren: () => import('./adviser/adviser.module').then(module => module.AdviserModule),
        data: {
          title: 'Asesor Financiero'
        }
      },
      {
        path: 'security',
        loadChildren: () => import('./security-help/security-help.module').then(module => module.SecurityHelpModule),
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
