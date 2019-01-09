import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard.component';

const DashboardRouting: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

export const DashboardRoutes = RouterModule.forChild(DashboardRouting);
