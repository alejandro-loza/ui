import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const AppRouting: Routes = [
  {
    path: 'access',
    loadChildren: () => import('./access/access.module').then(module => module.AccessModule)
  },
  {
    path: 'app',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./pages/pages.module').then(module => module.PagesModule)
  },
  {
    path: 'mobile',
    loadChildren: () => import('./mobile/mobile.module').then(module => module.MobileModule)
  },
  {
    path: 'first-step',
   canActivate: [ AuthGuard ],
    loadChildren: () => import('./first-step/first-step.module').then(module => module.FirstStepModule)
  },
  {
    path: 'invitation/:code',
    loadChildren: () => import('./referals/referals.module').then( module => module.ReferalsModule)
  },
  {
    path: 'invitation-success',
    loadChildren: () => import('./referals/success/success.module').then(module => module.SuccessModule)
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
];

export const AppRoutes = RouterModule.forRoot(AppRouting);
