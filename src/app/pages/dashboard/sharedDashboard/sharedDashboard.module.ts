import { NgModule } from '@angular/core';
import { MonthChartComponent } from '../component/monthChart/month-chart.component';
import { BarChartsComponent } from './bar-charts/expenses/bar-charts.component';
import { SharedModule } from '@shared/shared.module';
import { IncomesChartComponent } from './bar-charts/incomes/incomes-chart.component';

@NgModule({
	declarations: [ MonthChartComponent, BarChartsComponent, IncomesChartComponent ],
	imports: [ SharedModule ],
	exports: [ MonthChartComponent, BarChartsComponent, IncomesChartComponent ]
})
export class SharedDashboardModule {}
