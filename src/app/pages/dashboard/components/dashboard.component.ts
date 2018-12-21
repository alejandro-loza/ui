import { Component, OnInit } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { Movement } from '@interfaces/movement.interface';
import { BarChart } from '@interfaces/dashboardBarChart.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ MovementsService ]
})
export class DashboardComponent implements OnInit {

  paramsMovements = { charges: true, 
                      deep: true, 
                      deposits: true, 
                      startDate:'2018-01-01', 
                      endDate:'2018-12-20', 
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

  constructor( private moviementsService: MovementsService ) {

   }

  ngOnInit() {
    this.getDataForGraphs();
  }

  onSelect( event ){
    console.log( event );
  }

  getDataForGraphs(){
    this.moviementsService.getMovements( this.paramsMovements ).subscribe( ( res:Movement[] ) => {
     res.forEach( movement => {
       this.movements.push( movement );
     });
     this.getFirstMonth( this.movements );
    });
  }

  getFirstMonth( movements:Movement[]){
    let lastMov = movements.length - 1; 
    let firstMonth = new Date( movements[ lastMov ].customDate ).getUTCMonth();
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
  }


}
