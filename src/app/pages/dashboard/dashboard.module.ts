import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '@shared/shared.module';

// Service
import { MovementsService } from '@services/movements/movements.service';

// Component
import { DashboardComponent } from   './component/dashboard.component';
import { TabsComponent } from        './component/tabs/tabs.component';

// Routes
import { DashboardRoutes } from      './dashboard.route';
import { MonthChartComponent } from  './component/monthChart/month-chart.component';



@NgModule({
  imports: [
    SharedModule,
    NgxChartsModule,
    DashboardRoutes,
  ],
  declarations: [
    TabsComponent,
    MonthChartComponent,
    DashboardComponent,
  ],
  providers: [ MovementsService ]
})
export class DashboardModule { }
