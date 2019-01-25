import { Component, OnInit, Input } from '@angular/core';
import { BarChart } from '@interfaces/dashboardBarChart.interface';
import { DataForCharts } from '@interfaces/dataExpensesComponent.interface';
import { PieChart } from '@app/interfaces/dasboardPieChart.interface';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  dataForBarChart:BarChart[] = [];
  dataPieChart:any[] = [];

  dataExpenses:DataForCharts[] = [];
  colorOfChart:string = "a02e36";
  dataForTable:any[] = [];
  auxDataForTable:any[] = [];

  titleMonth:string;
  titleYear:string;
  totalAmount:number = 0;
  showBackButton:boolean = false;
  monthOfCategorySelected:number;

  view = [ 270, 270 ];
  showLegend = false;
  showLabels = false;
  explodeSlices = false;
  doughnut = true;
  arcWidth = 0.50;
  activeEntries = [];
  colorScheme = {
   domain: []
  };
  assetsUrl = "../../../assets/media/img/categories/color";
 

  constructor( ) {
   }

  ngOnInit() {
   this.getFirstData();
  }

  // EVENTO PROVENIENTE DE LA GRAFICA MENSUAL
  selectedMonthChart( param ){
    let month:number = 0;
    typeof(param) == "object" ?  month = this.getIndexMonth( param.name ) :  month = param;
    this.tableData( month );
    this.getDataAnotherMonth( month );
    let titleOfThePage = document.querySelector(".brand-logo");
    titleOfThePage.innerHTML = "Resumen "+ this.titleMonth + " "+ this.titleYear;
    this.showBackButton = false;
  }

  getIndexMonth( name:string ):number{
    let index = 0;
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    for( let i = 0; i < months.length ; i++){
      if( months[i] == name ){
        this.titleMonth = name;
        index = i;
        break;
      }
    }
    return index;
  }

  getDataAnotherMonth( month:number ){
    this.dataPieChart = [];
    this.colorScheme.domain = [];
    let dataSession = JSON.parse(sessionStorage.getItem("expensesPie") );

    for( let i = 0; dataSession.length; i++ ){
      if( dataSession[i].month == month ){
        this.dataPieChart = dataSession[i].series;
        for( let j = 0; j < this.dataPieChart.length; j++ ){
          this.colorScheme.domain.push( dataSession[i].series[j].color );
        }  
        break;
      }
    }
  }

  getFirstData(){
    this.colorScheme.domain = [];
    this.titleMonth = "";
    this.titleYear = "";

    let dataSession = JSON.parse(sessionStorage.getItem("expensesPie") );
    this.dataPieChart = dataSession[0].series;

    for( let i = 0; i < this.dataPieChart.length; i++ ){
     this.colorScheme.domain.push( dataSession[0].series[i].color );
    }    

    this.dataForBarChart = JSON.parse( sessionStorage.getItem("expensesData") );
    this.dataExpenses = JSON.parse( sessionStorage.getItem("formatedData") );

    this.titleMonth = this.dataForBarChart[ this.dataForBarChart.length - 1].name;
    let year = new Date(this.dataExpenses[0].referenceDate);
    this.titleYear = year.getFullYear().toString();

    let firstMonth:Date = new Date (this.dataExpenses[0].referenceDate);
    this.tableData( firstMonth.getMonth() );


   let titleOfThePage = document.querySelector(".brand-logo");
   titleOfThePage.innerHTML = "Resumen "+ this.titleMonth + " "+ this.titleYear;
  }

  tableData( numberMonth:number ){
    this.dataForTable = [];
    this.dataExpenses.forEach( element => {
      let elementDate:Date = new Date(element.referenceDate);

      if( elementDate.getMonth() == numberMonth ){
        let year = new Date( element.referenceDate );
        this.titleYear = year.getFullYear().toString();
        
        if( element.totalValue != 0 ){
          this.dataForTable.push( element );
        }
      }
    });
    this.getTotalAmount( this.dataForTable );
    this.sortJSON( this.dataForTable, "totalValue", "desc");
  }

  getTotalAmount( data ){
    this.totalAmount = 0;
    data.forEach(element => {
      this.totalAmount += element.totalValue;
    });
  }

  clickOnCategory( element ){
    console.log( element );
    if( isNullOrUndefined(element.isSubcat) ){
      if( element.category.id != "000000"){
        let date:Date = new Date( element.referenceDate );
        this.monthOfCategorySelected = date.getMonth();
    
        this.auxDataForTable = this.dataForTable;
        this.dataForTable = [];
        this.dataForPieWithSubCategories( element );
        this.dataForTableWithSubcategories( element.details );
        this.showBackButton =  true;
    
        let titleOfThePage = document.querySelector(".brand-logo");
        titleOfThePage.innerHTML = element.category.name + " "+ this.titleMonth + " "+ this.titleYear;
      }
    }
  }

  dataForTableWithSubcategories( details ){
    details.forEach(element => {
      if( element.totalValue != 0 ){
        if( !element.movements[0].hasConcepts ){
          if( !isNullOrUndefined( element.movements[0].concepts[0].category.parent ) ){
            this.dataForTable.push({
              category:{
                id: element.subcat.parent.id,
                name: element.subcat.name
              },
              totalValue: element.totalValue,
              isSubcat: true
            });
          } else{
            this.dataForTable.push({
              category:{
                id: element.subcat,
                name: element.movements[0].concepts[0].category.name
              },
              totalValue: element.totalValue,
              isSubcat: true
            });
          }
        }
      }
    });
  }

  dataForPieWithSubCategories( elementOfEvent ){
    this.dataPieChart = [];
    elementOfEvent.details.forEach( subCategory => {
      if( subCategory.totalValue != 0 ){
        if( !isNullOrUndefined( subCategory.movements[0].concepts[0].category.parent ) ){
          this.dataPieChart.push({
            name: subCategory.subcat.name,
            value: subCategory.totalValue,
            color: subCategory.subcat.color
          });
        } else {
          this.dataPieChart.push({
            name: subCategory.movements[0].concepts[0].category.name,
            value: subCategory.totalValue,
            color: subCategory.movements[0].concepts[0].category.color,
          });
        }
      }
    });
    this.sortJSON( this.dataPieChart, "value", "desc");
    this.colorScheme.domain = [];
    for( let i = 0; i < this.dataPieChart.length; i++ ){
      this.colorScheme.domain.push( this.dataPieChart[i].color );
     }    
    this.getTotalAmount( elementOfEvent.details );
  }


  sortJSON(data, key, orden) {
    return data.sort( (a, b) => {
        let x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
  }

}
