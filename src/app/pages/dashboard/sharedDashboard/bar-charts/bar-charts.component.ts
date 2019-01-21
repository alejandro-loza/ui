import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BarChart } from '@interfaces/dashboardBarChart.interface';

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {
  @Input() dataForChart:BarChart[] = [];
  @Input() colorOfChart:string = "";
  @Output() clickEvent:EventEmitter<any> = new EventEmitter();

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
    this.clickEvent.emit( event );
  }

}
