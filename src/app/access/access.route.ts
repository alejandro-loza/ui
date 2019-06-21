import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from '@access/access.component';

const AcessRouting: Routes = [
  {
    path: '',
    component: AccessComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(module => module.SignupModule)
      },
      {
        path: 'recovery',
        loadChildren: () => import('./recoverypassword/recoverypassword.module').then(module => module.RecoverypasswordModule)
      },
      {
        path: 'forgot',
        loadChildren: () => import('./forgotpassword/forgotpassword.module').then(module => module.ForgotpasswordModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(module => module.WelcomeModule)
      },
      {
        path: 'socialNetworks',
        loadChildren: () => import('./social-networks/social-networks.module').then( module => module.SocialNetworksModule )
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

export const AcessRoutes = RouterModule.forChild(AcessRouting);
