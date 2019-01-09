import { Component, OnInit, Input } from '@angular/core';
import { BarChart } from '@app/shared/interfaces/dashboardBarChart.interface';

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {
  @Input() dataForChart:BarChart[] = [];
  @Input() colorOfChart:string = "";

   // options
  showXAxis = true;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  colorScheme = {
    domain: [""]
  };

  constructor() { }

  ngOnInit() {
    this.colorScheme.domain[0] = "#"+this.colorOfChart;
  }

  onSelect( event ){
    console.log( event );
  }

}
