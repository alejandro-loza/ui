import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';

const APP_ROUTING: Routes = [
	{path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/login'}
];

export const APP_ROUTES = RouterModule.forRoot(APP_ROUTING);
