import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component';

const LOGIN_ROUTING: Routes = [
    { path: '', component: LoginComponent }
];

export const LOGIN_ROUTES = RouterModule.forChild( LOGIN_ROUTING );
