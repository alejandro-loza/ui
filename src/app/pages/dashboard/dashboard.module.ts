import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { DashboardComponent } from './components/dashboard.component';

// Routes
import { DASHBOARD_ROUTES } from './dashboard.route';

@NgModule({
  imports: [
    CommonModule,
    DASHBOARD_ROUTES
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
