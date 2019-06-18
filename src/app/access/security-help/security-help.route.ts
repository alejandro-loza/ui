import { Routes, RouterModule } from          '@angular/router';
import { ModuleWithProviders } from           '@angular/core';

import {SecurityHelpComponent} from           './components/security-help.component';

const SecurityHelpRouting: Routes = [
  { path: '', component: SecurityHelpComponent },
  { path: '**', redirectTo: '/access/login' }
];

export const SecurityHelpRoutes: ModuleWithProviders = RouterModule.forChild( SecurityHelpRouting );
