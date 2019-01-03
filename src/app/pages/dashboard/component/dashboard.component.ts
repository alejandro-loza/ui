import { Component, OnInit } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { Movement } from '@interfaces/movement.interface';
import { BarChart } from '@interfaces/dashboardBarChart.interface';
import { PieChart } from '@interfaces/dasboardPieChart.interface';
import { DateApiService } from '@services/date-api/date-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  paramsMovements = { charges: true, 
    deep: true, 
    deposits: true, 
    startDate:'', 
    endDate:'', 
    duplicates: false, 
    maxMovements: 150, 
    offset: 0 
  };

  movements:Movement[] = [];
  dataForBarCharts: BarChart[] = [];
  dataReady:boolean = false;

  // Aux
  chargeBalanceAux:number = 0;
  depositBalanceAux:number = 0;
  auxForOffset:number = 0;

  constructor ( private movementsService: MovementsService, private dateApi:DateApiService ){

  }

  ngOnInit(){
    if( sessionStorage.getItem("balanceData") ){
      this.dataForBarCharts = JSON.parse(sessionStorage.getItem("balanceData"));
      this.dataReady = true;
    } else {
      this.getDatesForParams();
      this.getMovementsData();
    }
  }

  getDatesForParams(){
    let currentDate = new Date();
    // END DATE
    let endDate = this.dateApi.dateWithFormat( currentDate );
    this.paramsMovements.endDate = endDate;
    
    // START DATE
    let millisLastYear = 1000 * 60 * 60 * 24 * 336;
    let diff = currentDate.getTime() - millisLastYear; 
    let startDate = this.dateApi.dateWithFormat( new Date( diff ) );
    this.paramsMovements.startDate = startDate;
  }

  // THIS METHOD IS THE SLOWEST 
  getMovementsData(){
    this.movementsService.getMovements( this.paramsMovements ).subscribe( ( res:Movement[] ) => {
      this.auxForOffset += 150;
      if( res.length == this.auxForOffset  ){
        this.paramsMovements.offset += 150;
        this.getMovementsData();
      } else {
          res.forEach( movement => {
            this.movements.push( movement );
          });
          let firstMonth = new Date( this.movements[ this.movements.length - 1 ].customDate );
          this.getBalances( this.movements, firstMonth.getMonth() );
        }
    });
  }

  getBalances( movements:Movement[], month:number ){
    this.chargeBalanceAux = 0; this.depositBalanceAux = 0;
    movements.forEach( movement => {
      let movementDate = new Date ( movement.customDate );

      if( movementDate.getMonth() == month ){
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

    // FUNCTION TO FILL THE ARRAY MONTH PER MONTH
    this.dataProcess( month, this.chargeBalanceAux, ahorro );

    let starterYear  = new Date( movements[ movements.length -1 ].customDate ).getFullYear();
    let lastMonth = new Date( movements[0].customDate ).getMonth();
   
    // SAME YEAR DATA
    if( starterYear == new Date().getUTCFullYear() ){
      if( lastMonth > month ){
       this.getBalances( movements, month + 1 );
      }
    }
    // DATA OF PREVIOUS YEAR
    if ( starterYear < new Date().getUTCFullYear() ) {
      if( lastMonth != month ){
        month == 11 ? this.getBalances( movements, 0 ) : this.getBalances( movements, month + 1)
      }
    }
    this.dataReady = true;
    // SAVING THE DATA ON SESSIONSTORAGE
    sessionStorage.setItem("balanceData", JSON.stringify(this.dataForBarCharts) );
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
