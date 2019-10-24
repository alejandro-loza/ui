import { Routes, RouterModule } from '@angular/router';

import { SignupLandingComponent } from './components/signup-landing.component';

const SIGNUP_LANDING_ROUTING: Routes = [
    { path: '', component: SignupLandingComponent }
];

export const SIGNUP_LANDING_ROUTES = RouterModule.forChild(SIGNUP_LANDING_ROUTING);