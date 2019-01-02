import {
  Component,
  OnInit,
} from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { Movement } from '@interfaces/movement.interface';
import { BarChart } from '@interfaces/dashboardBarChart.interface';
import { DateApiService } from '@services/date-api/date-api.service';

  @Component({
    selector: 'app-month-chart',
    templateUrl: './month-chart.component.html',
    styleUrls: ['./month-chart.component.css']
  })

  export class MonthChartComponent implements OnInit {

  paramsMovements = { charges: true, 
                      deep: true, 
                      deposits: true, 
                      startDate:'2018-01-01', 
                      endDate:'2018-12-31', 
                      duplicates: false, 
                      maxMovements: 150, 
                      offset: 0 };
      
  movements:Movement[] = [];
  dataForBarCharts: BarChart[] = [];

  // Aux
  chargeBalanceAux:number = 0;
  depositBalanceAux:number = 0;
  dataReady:boolean = false;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  barPadding = 8;
  showGridLines = true;
  showYAxisLabel = true;
  yAxisLabel = '';
  timeline = true;
  colorScheme = {
    domain: ['#A10A28','#5AA454']
  };

  constructor( private movementsService: MovementsService, private dateApi:DateApiService ) {

  }

  ngOnInit() {
    // Primero debemos obtener las fechas de inicio y de final que queremos de los movs
    this.getMovementsData();
  }

  onSelect( event ){
    console.log( event );
  }

  getMovementsData(){
    this.movementsService.getMovements( this.paramsMovements ).subscribe( ( res:Movement[] ) => {
      res.forEach( movement => {
        this.movements.push( movement );
      });
      this.getFirstMonth( this.movements );
      });
  }

  getFirstMonth( movements:Movement[]){
    let lastMov = movements.length - 1; 

    let date = new Date ( movements[lastMov].customDate );
    console.log( movements[lastMov].customDate );
    console.log( this.dateApi.dateWithFormat( date ) );

    let firstMonth = new Date( movements[ lastMov ].customDate ).getUTCMonth();
    console.log( firstMonth );
    this.getMonthBalances( movements, firstMonth );
  }

  getMonthBalances( movements:Movement[], month:number ){
    this.chargeBalanceAux = 0; this.depositBalanceAux = 0;
    movements.forEach( movement => {
      let auxDate = new Date ( movement.customDate );

      if( auxDate.getMonth() == month ){
        if( movement.type === "CHARGE" ){
          this.chargeBalanceAux += movement.amount; 
        }
        if( movement.type === "DEPOSIT" ){
          this.depositBalanceAux += movement.amount;
        }
      } 
    });

    let ahorro = this.depositBalanceAux - this.chargeBalanceAux;
    ahorro < 0 ? ahorro = 0 : ahorro = ahorro
    this.dataProcess( month, this.chargeBalanceAux, ahorro );

    if( month < 11 ){
      this.getMonthBalances( movements, month + 1 );
    }
    this.dataReady = true;
  }

  dataProcess( monthNumber:number, gastosValue:number, ahorroValue:number ){
    // Name of the month process
    let months:any[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
                        'Agosto', 'Septiembre', 'Octube', 'Noviembre', 'Diciembre'];
    let name = "";
    for( let i = 0; i < months.length; i++ ){
      monthNumber == i ? name = months[i] : null
    }
    this.dataForBarCharts.push( { name: name, series:[ 
                                  { name : "Gastos", value : gastosValue }, 
                                  { name:"Ahorro", value : ahorroValue } 
                                ]
    });
    //console.log( this.dataForBarCharts );
  }
    
}
