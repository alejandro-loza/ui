import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const AppRouting: Routes = [
  {
    path: 'access',
    loadChildren: './access/access.module#AccessModule'
  },
  {
    path: 'app',
    canActivate: [ AuthGuard ],
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: 'first-step',
    canActivate: [ AuthGuard ],
    loadChildren: './first-step/first-step.module#FirstStepModule'
  },
  {
    path: 'invitation/:code',
    loadChildren: './referals/referals.module#ReferalsModule'
  },
  {
    path: 'invitation-success',
    loadChildren: './referals/success/success.module#SuccessModule'
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
