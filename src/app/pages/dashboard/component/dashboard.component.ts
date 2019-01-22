import { Component, OnInit } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { DashboardService } from "@services/dashboard/dashboard.service";
import { Movement } from '@interfaces/movement.interface';
import { BalanceChart } from '@interfaces/dashboardBalanceChart.interface';
import { DateApiService } from '@services/date-api/date-api.service';
import { PieChart } from '@interfaces/dasboardPieChart.interface';
import { BarChart } from '@interfaces/dashboardBarChart.interface';
import { CategoriesService } from '@services/categories/categories.service';
import { Category } from '@interfaces/category.interface';
import { DataForCharts } from '@interfaces/dataExpensesComponent.interface';

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
  movementsServiceResponse:Movement[];
  categoriesList:Category[] = [];
  dataForChart:DataForCharts[] = [];
  
  /*0 INCOMES 1 EXPENSES 2 BALANCE */
  tabSelected:number = 1;

  //AUX
  dataReady:boolean = false;

  
  constructor ( private movementsService: MovementsService, private dateApi:DateApiService,
                private dashboardService: DashboardService, private categoriesService:CategoriesService ){

  }

  ngOnInit(){
    if( sessionStorage.getItem("balanceData")){
      sessionStorage.removeItem("loadingDataForDashboard");
      this.dataReady = true;
    } else {
      if( !sessionStorage.getItem("loadingDataForDashboard") ){
        this.getCategoriesInfo();
      } else if( sessionStorage.getItem("loadingDataForDashboard") ){
        sessionStorage.setItem("loadingDataForDashboard", "true");
      } 
    }
  }

  // THIS METHOD IS THE SLOWEST 
  getMovementsData( categories:Category[] ){  
    this.movementsService.getMovements( this.paramsMovements ).subscribe( ( res ) => {
      this.movementsServiceResponse = res.body.data;
    }, error => {
      
    }, () => {
      this.paramsMovements.offset += 150;
      if( this.movementsServiceResponse.length == this.paramsMovements.offset  ){
        this.getMovementsData( categories );
      } else {
          this.movementsServiceResponse.forEach( movement => {
            this.movementsList.push( movement );
          });
          this.dataForChart = this.dashboardService.getDataForCharts( this.movementsList, this.categoriesList );
          this.dataReady = true;
          sessionStorage.removeItem("loadingDataForDashboard");
        }      
    });
  }

  getCategoriesInfo(){
    sessionStorage.setItem("loadingDataForDashboard", "true");
    this.categoriesList = [];
    this.categoriesService.getCategoriesInfo().subscribe( res => {
     res.body.data.forEach( (element:Category)  => {
      this.categoriesList.push( element );  
     });
    this.getDatesForParams();
    this.getMovementsData( this.categoriesList );
    });
  }

  tabClicked( event ){
    this.tabSelected = event; 
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

}