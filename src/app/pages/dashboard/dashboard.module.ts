import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from "@shared/shared.module";

// Component
import { DashboardComponent } from './components/dashboard.component';

// Routes
import { DASHBOARD_ROUTES } from './dashboard.route';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    DASHBOARD_ROUTES,
    SharedModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
