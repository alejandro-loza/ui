import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';
import { MonthChartComponent } from '../component/monthChart/month-chart.component';
import { BarChartsComponent } from './bar-charts/expenses/bar-charts.component';
import { SharedModule } from '@shared/shared.module';
import { IncomesChartComponent } from './bar-charts/incomes/incomes-chart.component';

@NgModule({
  declarations: [
    PieChartComponent,
    ListMovementsComponent,
    MonthChartComponent,
    BarChartsComponent,
    IncomesChartComponent
  ],
  imports: [SharedModule],
  exports: [
    PieChartComponent,
    ListMovementsComponent,
    MonthChartComponent,
    BarChartsComponent,
    IncomesChartComponent
  ]
})
export class SharedDashboardModule {}
