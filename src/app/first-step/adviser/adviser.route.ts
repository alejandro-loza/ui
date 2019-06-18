import { Routes, RouterModule } from '@angular/router';

import { AdviserComponent } from './component/adviser.component';

const AdviserRouting: Routes = [
  { path: '', component: AdviserComponent },
  { path: '', pathMatch: 'full', redirectTo: '/access/login'},
  { path: '**', redirectTo: '/access/login' }
];

export const AdviserRoutes = RouterModule.forChild( AdviserRouting );
