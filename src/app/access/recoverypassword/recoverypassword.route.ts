import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RecoverypasswordComponent } from './components/recoverypassword.component';

const RECOVERY_ROUTING: Routes = [
    { path: ':token', component: RecoverypasswordComponent }
];

export const RECOVERY_ROUTES: ModuleWithProviders = RouterModule.forChild( RECOVERY_ROUTING );