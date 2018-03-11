import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';

const APP_ROUTING: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'register', component: SignupComponent},	
	{path: '**', component: LoginComponent},
];

export const APP_ROUTES = RouterModule.forRoot(APP_ROUTING);