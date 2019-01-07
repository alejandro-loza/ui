import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';

@NgModule({
  declarations: [
    PieChartComponent,
    ListMovementsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PieChartComponent,
    ListMovementsComponent
  ]
})
export class SharedModule { }
