import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BarChart } from '@interfaces/dashboardBarChart.interface';
import { PieChart } from '@interfaces/dasboardPieChart.interface';

  @Component({
    selector: 'app-month-chart',
    templateUrl: './month-chart.component.html',
    styleUrls: ['./month-chart.component.css']
  })

  export class MonthChartComponent implements OnInit {
  @Input() dataForBarCharts:BarChart[];
  @Output() selectedMonth: EventEmitter<PieChart[]>;

   // OPTIONS FOR THE CHART
   showXAxis = true;
   showYAxis = false;
   gradient = false;
   showLegend = false;
   showXAxisLabel = true;
   barPadding = 20;
   showGridLines = true;
   showYAxisLabel = true;
   timeline = true;
   colorScheme = {
    domain: ['#a02e36','#7bba3a']
   };

  constructor( ) {
    this.selectedMonth = new EventEmitter();
  }

  ngOnInit() {
  }

  onSelect( event ){
    let monthSelected:string = event.series;
    let data:PieChart[] = [];
    this.dataForBarCharts.forEach( serie => {
      if( serie.name == monthSelected ){
        data.push( { name : "Gastos", value : serie.series[0].value },
                   { name : "Ahorro", value : serie.series[1].value });
      }
    });
    this.selectedMonth.emit( data );
  }

    
}
