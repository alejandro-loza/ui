import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';

const DASHBOARD_ROUTING: Routes = [
    { path: '', component: DashboardComponent }
];

export const DASHBOARD_ROUTES = RouterModule.forChild( DASHBOARD_ROUTING );

