import { Routes, RouterModule } from '@angular/router';

import { ForgotpasswordComponent } from './components/forgotpassword.component';

const FORGOT_PASS_ROUTING: Routes = [
    { path: '', component: ForgotpasswordComponent }
];

export const FORGOT_PASS_ROUTES = RouterModule.forChild( FORGOT_PASS_ROUTING );