import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';
import { MonthChartComponent } from "../component/monthChart/month-chart.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarChartsComponent } from './bar-charts/bar-charts.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PieChartComponent,
    ListMovementsComponent,
    MonthChartComponent,
    BarChartsComponent
  ],
  imports: [
    SharedModule,
    NgxChartsModule
  ],
  exports: [
    PieChartComponent,
    ListMovementsComponent,
    MonthChartComponent,
    BarChartsComponent
  ]
})
export class SharedDashboardModule { }
