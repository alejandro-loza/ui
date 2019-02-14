import { Component, OnInit } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { DashboardService } from "@services/dashboard/dashboard.service";
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { Movement } from '@interfaces/movement.interface';
import { DateApiService } from '@services/date-api/date-api.service';
import { CategoriesService } from '@services/categories/categories.service';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  paramsMovements = { 
    charges: true, 
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
  dataReady:boolean = false;

  /*0 INCOMES 1 EXPENSES 2 BALANCE */
  tabSelected:number = 1;

  
  constructor ( private movementsService: MovementsService, private dateApi:DateApiService,
                private dashboardService: DashboardService, private categoriesService:CategoriesService,
                private dashboardBean: DashboardBeanService ){

  }

  ngOnInit(){
    if( this.dashboardBean.getLoadInformation() ){
      this.getCategoriesInfo();
    } else {
      this.dataReadyValidator();
    }
  }

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
          this.dashboardService.mainMethod( this.movementsList, this.categoriesList );
        }      
    });
   this.dataReadyValidator();
  }

  getCategoriesInfo(){
    this.categoriesList = [];
    this.dashboardBean.setLoadInformation( false );
    this.categoriesService.getCategoriesInfo().subscribe( res => {
     res.body.data.forEach( (category:Category)  => {
      this.categoriesList.push( category );  
     });
    this.getDatesForParams();
    this.getMovementsData( this.categoriesList );
    });
  }

  tabClicked( event ){
    this.tabSelected = event; 
  }

  dataReadyValidator(){
    if( this.dashboardBean.getDataIsReady() ){
      this.dataReady = true;
    } else {
      setTimeout( () => {
        this.dataReadyValidator();
      }, 200 );
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

}