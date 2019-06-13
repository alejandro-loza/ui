import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from '@access/access.component';

const AcessRouting: Routes = [
  {
    path: '',
    component: AccessComponent,
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'signup',
        loadChildren: './signup/signup.module#SignupModule'
      },
      {
        path: 'recovery',
        loadChildren:
          './recoverypassword/recoverypassword.module#RecoverypasswordModule'
      },
      {
        path: 'forgot',
        loadChildren:
          './forgotpassword/forgotpassword.module#ForgotpasswordModule'
      },
      {
        path: 'welcome',
        loadChildren: './welcome/welcome.module#WelcomeModule'
      },
      {
        path: 'socialNetworks',
        loadChildren:
          './social-networks/social-networks.module#SocialNetworksModule'
      },
      {
        path: 'security',
        loadChildren:
          './security-help/security-help.module#SecurityHelpModule'
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
