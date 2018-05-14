import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const ACCESS_ROUTING: Routes = [
	{path: 'login', loadChildren: './login/login.module#LoginModule' },
	{path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
	{path: 'recovery', loadChildren: './recoverypassword/recoverypassword.module#RecoverypasswordModule' },
	{path: 'forgot', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordModule' },
    {path: '', pathMatch: 'full', redirectTo: 'login'},
	{path: '**', redirectTo: 'login'}
];

export const ACCESS_ROUTES = RouterModule.forChild(ACCESS_ROUTING);
