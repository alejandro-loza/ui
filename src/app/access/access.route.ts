import { RouterModule, Routes } from '@angular/router';

import { AccessComponent } from './access.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverypasswordComponent } from './recoverypassword/recoverypassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const ACCESS_ROUTING: Routes = [
    {path: 'access', component: AccessComponent, children:[
		{path: 'login', component: LoginComponent},
	    {path: 'signup', component: SignupComponent},
	    {path: 'recovery-password', component: ForgotpasswordComponent},
	    {path: 'new-password', component: RecoverypasswordComponent},
	    {path: '', pathMatch: 'full', redirectTo: '/access/login'},
	    {path: '**', redirectTo:'/access/login'}
    ]}
];

export const ACCESS_ROUTES = RouterModule.forRoot(ACCESS_ROUTING);
