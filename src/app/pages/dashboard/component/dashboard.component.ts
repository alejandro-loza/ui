import { Component, OnInit } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { DashboardService } from "@services/dashboard/dashboard.service";
import { Movement } from '@interfaces/movement.interface';
import { BarChart } from '@interfaces/dashboardBarChart.interface';
import { DateApiService } from '@services/date-api/date-api.service';
import { PieChart } from '@app/shared/interfaces/dasboardPieChart.interface';

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

  movementsList:Movement[] = [];
  dataForBarCharts: BarChart[] = [];
  dataReady:boolean = false;
  movementsServiceResponse:Movement[];

  // FOR PIE CHART
  dataForPieChart:PieChart[];
  monthSelected:string;

  // Aux
  chargeBalanceAux:number = 0;
  depositBalanceAux:number = 0;

  constructor ( private movementsService: MovementsService, private dateApi:DateApiService,
                private dashboardService: DashboardService ){

  }

  ngOnInit(){
    if( sessionStorage.getItem("balanceData") ){
      sessionStorage.removeItem("loadingDataForDashboard");
      this.dataForBarCharts = JSON.parse(sessionStorage.getItem("balanceData"));
      this.dataForPieCurrentMonth();
      this.dataReady = true;
    } else if( !sessionStorage.getItem("loadingDataForDashboard") ) {
      sessionStorage.setItem("loadingDataForDashboard", "true");
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
    const MILLIS_LAST_YEAR = 1000 * 60 * 60 * 24 * 365; // PONER MILLIS
    let diff = currentDate.getTime() - MILLIS_LAST_YEAR; 
    let startDate = this.dateApi.dateWithFormat( new Date( diff ) );
    this.paramsMovements.startDate = startDate;
  }

  // THIS METHOD IS THE SLOWEST 
  getMovementsData(){
    this.movementsService.getMovements( this.paramsMovements ).subscribe( ( res:Movement[] ) => {
      this.movementsServiceResponse = res;
    }, error => {
      console.log( error );
    }, () => {
      this.paramsMovements.offset += 150;
      if( this.movementsServiceResponse.length == this.paramsMovements.offset  ){
        this.getMovementsData();
      } else {
          this.movementsServiceResponse.forEach( movement => {
            this.movementsList.push( movement );
          });
          let firstMonth = new Date( this.movementsList[ this.movementsList.length - 1 ].customDate );
          this.getBalances( this.movementsList, firstMonth.getMonth() );
        }
    });
  }

  getBalances( movements:Movement[], month:number ){
    console.log("getBalances");
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
    // SAVING THE DATA ON SESSIONSTORAGE
    sessionStorage.setItem("balanceData", JSON.stringify(this.dataForBarCharts) );
    this.dataForPieCurrentMonth();
    this.dataReady = true;
  }

  dataProcess( monthNumber:number, gastosValue:number, ahorroValue:number ){
    // Name of the month process
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
                        'Agosto', 'Septiembre', 'Octube', 'Noviembre', 'Diciembre'];
    let name:string = "";
    for( let i = 0; i < months.length; i++ ){
      monthNumber == i ? name = months[i] : null
    }
    
    this.dataForBarCharts.push( { name: name, 
                                  series:[ 
                                      { name : "Gastos", value : gastosValue }, 
                                      { name : "Ahorro", value : ahorroValue } 
                                  ]
    });
  }

  dataForPieCurrentMonth(){
    let series = this.dataForBarCharts[ this.dataForBarCharts.length - 1].series;
    this.dataForPieChart = series;
    this.monthSelected = this.dataForBarCharts[ this.dataForBarCharts.length - 1].name;
  }

  selectedMonth( event ){
    this.dataForPieChart = event;
  }

}
