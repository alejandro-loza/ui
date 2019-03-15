import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignupComponent } from './components/signup.component';

const SIGNUP_ROUTING: Routes = [
    { path: '', component: SignupComponent }
];

export const SIGNUP_ROUTES = RouterModule.forChild( SIGNUP_ROUTING );
