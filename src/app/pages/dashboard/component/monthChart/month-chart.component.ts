import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PieChart } from '@interfaces/dasboardPieChart.interface';
import { BalanceChart } from '@interfaces/dashboardBalanceChart.interface';

  @Component({
    selector: 'app-month-chart',
    templateUrl: './month-chart.component.html',
    styleUrls: ['./month-chart.component.css']
  })

  export class MonthChartComponent implements OnInit {
    @Input() dataForBalanceChart:BalanceChart[] = [];
    @Output() dataPieMonthSelected: EventEmitter<PieChart[]> = new EventEmitter();
    @Output() indexMonthSelected: EventEmitter<number> = new EventEmitter();

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

  constructor( ) {

  }

  ngOnInit() {
  }

  onSelect( event ){
    let monthSelected:string = event.series;
    let data:any[] = []
    this.dataForBalanceChart.forEach( serie => {
      if( serie.name == monthSelected ){
        data.push( { name : "Gastos", value : serie.series[0].value },
                   { name : "Ahorro", value : serie.series[1].value });
      }
    });
    this.dataPieMonthSelected.emit( data );
    this.indexMonthSelected.emit( this.getIndexMonth( monthSelected ) );
  }

  getIndexMonth( name:string ):number{
    let index = 0;
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    for( let i = 0; i < months.length ; i++){
      if( months[i] == name ){
        index = i;
        break;
      }
    }
    return index;
  }

    
}
