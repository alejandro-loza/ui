import { Routes, RouterModule } from '@angular/router';
import { ReferalsComponent } from './components/referals.component';

const REFERALS_ROUTING: Routes = [ { path: '', component: ReferalsComponent } ];

export const REFERALS_ROUTES = RouterModule.forChild(REFERALS_ROUTING);
