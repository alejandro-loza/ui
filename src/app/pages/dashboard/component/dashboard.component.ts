import { Component, OnInit } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { DashboardService } from "@services/dashboard/dashboard.service";
import { Movement } from '@interfaces/movement.interface';
import { BalanceChart } from '@interfaces/dashboardBalanceChart.interface';
import { DateApiService } from '@services/date-api/date-api.service';
import { PieChart } from '@interfaces/dasboardPieChart.interface';
import { BarChart } from '@interfaces/dashboardBarChart.interface';

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
  dataBalanceMonthChart: BalanceChart[] = [];
  dataExpensesMonthChart: BarChart[] = [];
  movementsServiceResponse:Movement[];

  // FOR PIE CHART
  dataForPieChart:PieChart[] = [];
  monthSelected:string;

  constructor ( private movementsService: MovementsService, private dateApi:DateApiService,
                private dashboardService: DashboardService ){

  }

  ngOnInit(){
    if( sessionStorage.getItem("balanceData") ){
      sessionStorage.removeItem("loadingDataForDashboard");
      this.dataBalanceMonthChart = JSON.parse(sessionStorage.getItem("balanceData"));
      this.dataExpensesMonthChart = JSON.parse( sessionStorage.getItem("expensesData"));
      this.balanceDataForPieCurrentMonth();

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
    let startDateAux = new Date();
    startDateAux.setMonth( startDateAux.getMonth() - 11 );
    startDateAux.setDate(1);
    startDateAux.setHours(0);
    startDateAux.setMinutes(0);
    startDateAux.setMilliseconds(0);
    let startDate = this.dateApi.dateWithFormat( startDateAux );
    this.paramsMovements.startDate = startDate;
  }

  // THIS METHOD IS THE SLOWEST 
  getMovementsData(){
    this.movementsService.getMovements( this.paramsMovements ).subscribe( ( res ) => {
      this.movementsServiceResponse = res.body.data;
    }, error => {
      
    }, () => {
      this.paramsMovements.offset += 150;
      if( this.movementsServiceResponse.length == this.paramsMovements.offset  ){
        this.getMovementsData();
      } else {
          this.movementsServiceResponse.forEach( movement => {
            this.movementsList.push( movement );
          });
          this.dataBalanceMonthChart = this.dashboardService.getDataForBalanceChart( this.movementsList );
        }
        this.balanceDataForPieCurrentMonth();
        this.getExpensesData();
    });
  }

  balanceDataForPieCurrentMonth(){
    if( this.dataBalanceMonthChart.length > 0 ){
      let series = this.dataBalanceMonthChart[ this.dataBalanceMonthChart.length - 1].series;
      this.dataForPieChart = series;
      this.monthSelected = this.dataBalanceMonthChart[ this.dataBalanceMonthChart.length - 1].name; 
    }
  }

  getExpensesData(){
    this.dataExpensesMonthChart = JSON.parse(sessionStorage.getItem("expensesData"));
  }

  selectedMonthChart( event ){
    this.dataForPieChart = event;
  }

}
