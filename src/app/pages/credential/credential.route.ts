import { RouterModule, Routes } from '@angular/router';
import { CredentialComponent } from './components/credential.component';

const CREDENTIAL_ROUTING: Routes = [
  {
    path: '',
    component: CredentialComponent
  },
  {
    path: ':credencialId',
    loadChildren: () => import('./credential-details/credential-details.module').then(module => module.CredentialDetailsModule),
    data: {
      title: 'Detalle de la cuenta bancaria'
    }
  },
  {
    path: '**',
    redirectTo: '/access/login'
  }
];

export const CREDENTIAL_ROUTES = RouterModule.forChild(CREDENTIAL_ROUTING);
