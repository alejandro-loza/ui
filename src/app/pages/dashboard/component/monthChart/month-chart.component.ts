import { Component, OnInit, Input } from '@angular/core';
import { BarChart } from '@interfaces/dashboardBarChart.interface';

  @Component({
    selector: 'app-month-chart',
    templateUrl: './month-chart.component.html',
    styleUrls: ['./month-chart.component.css']
  })

  export class MonthChartComponent implements OnInit {
  @Input() dataForBarCharts:BarChart[];

   // OPTIONS FOR THE CHART
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = true;
   legendTitle = "Gráfica mensual"
   showXAxisLabel = true;
   barPadding = 20;
   showGridLines = true;
   showYAxisLabel = true;
   timeline = true;
   colorScheme = {
    domain: ['#A10A28','#5AA454']
   };

  constructor( ) {

  }

  ngOnInit() {
  }

  onSelect( event ){
    let monthSelected:string = event.series;
    let data:any[] = [];
    this.dataForBarCharts.forEach( serie => {
      if( serie.name == monthSelected ){
        data.push( { name : "Gastos", value : serie.series[0].value },
                   { name : "Ahorro", value : serie.series[1].value });
      }
    });
    console.log( data );
  }

    
}
