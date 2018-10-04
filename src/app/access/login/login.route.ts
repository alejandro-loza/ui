import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component';

const LoginRouting: Routes = [
    { path: '', component: LoginComponent }
];

export const LoginRoutes = RouterModule.forChild( LoginRouting );
