import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';
import { MonthChartComponent } from "../component/monthChart/month-chart.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarChartsComponent } from './bar-charts/bar-charts.component';


@NgModule({
  declarations: [
    PieChartComponent,
    ListMovementsComponent,
    MonthChartComponent,
    BarChartsComponent
  ],
  imports: [
    CommonModule,
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
