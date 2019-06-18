import { Routes, RouterModule } from          '@angular/router';
import { ModuleWithProviders } from           '@angular/core';

import { UserNameComponent } from './component/user-name.component';



const UserNameRouting: Routes = [
  { path: '', component: UserNameComponent },
  { path: '**', redirectTo: '/access/login' }
];

export const UserNameRoutes: ModuleWithProviders = RouterModule.forChild( UserNameRouting );
