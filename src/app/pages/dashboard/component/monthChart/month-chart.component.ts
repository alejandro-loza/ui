import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PieChart } from '@interfaces/dasboardPieChart.interface';
import { BalanceChart } from '@app/shared/interfaces/dashboardBalanceChart.interface';

  @Component({
    selector: 'app-month-chart',
    templateUrl: './month-chart.component.html',
    styleUrls: ['./month-chart.component.css']
  })

  export class MonthChartComponent implements OnInit {
    @Input() dataForBalanceChart:BalanceChart[] = [];
    @Output() dataPieMonthSelected: EventEmitter<PieChart[]> = new EventEmitter();

    // OPTIONS FOR THE CHART
    showXAxis = true;
    showYAxis = false;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    showGridLines = true;
    showYAxisLabel = true;
    timeline = true;
    colorScheme = {
      domain: ['#a02e36','#7bba3a']
    };
    nameMonthSelected:string;
    yearOfSelectedMonth:number;

  constructor( ) {

  }

  ngOnInit() {
    this.nameMonthSelected = this.dataForBalanceChart[ this.dataForBalanceChart.length - 1 ].name;
    let yearAux = new Date();
    this.yearOfSelectedMonth = yearAux.getFullYear();
  }

  onSelect( event ){
    let monthSelected:string = event.series;
    let data:PieChart[] = []
    this.dataForBalanceChart.forEach( serie => {
      if( serie.name == monthSelected ){
        data.push( { name : "Gastos", value : serie.series[0].value },
                   { name : "Ahorro", value : serie.series[1].value });
      }
    });
    this.dataPieMonthSelected.emit( data );
    this.nameMonthSelected = event.series;
  }

    
}
