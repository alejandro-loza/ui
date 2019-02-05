import { Injectable } from '@angular/core';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { Movement } from '@interfaces/movement.interface';
import { ExpensesMainData, PreDetails, ExpensesFirstScreen, ExpensesSecondScreen } from '@interfaces/dashboard/dataExpensesComponent.interface';
import { Category } from '@interfaces/category.interface';
import { isNullOrUndefined } from 'util';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { monthMovement } from '@app/interfaces/dashboard/monthMovement.interface';
import { BalancePieChart } from '@app/interfaces/dashboard/BalancePieChart.interface';
import { MonthMovementArray } from '@app/interfaces/dashboard/monthMovementArray.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // FOR BALANCE
  chargeBalanceAux:number = 0;
  depositBalanceAux:number = 0;
  savingBalanceAux:number = 0;
  auxMonthMovement:number = 0;
  auxDataStackedBarExpenses:number[] = [];
  auxDataStackedBarSaving:number[] = [];
  auxDataStackedBarLabels:string[] = [];
  auxDataStackedBarYear:number[] = [];

  // FOR EXPENSES
  auxCategoryId:string[] =[];
  auxLabels:string[] = [];
  auxCategory:Category[] = [];
  auxBackgroundColor:string[] = [];
  auxTotalAmount:number[] = [];
  auxTotalAmountSubCat:number = 0;
  firstScreen:ExpensesFirstScreen;
  secondScreen:ExpensesSecondScreen[] = [];

  // 
  categoriesList:Category[] = [];
  movementsList:Movement[] = [];
  movementsPerMonth:monthMovement[] = [];
  monthMovementArray:MonthMovementArray[] = [];
  expensesData:ExpensesMainData[] = [];


  constructor( private dashboardBean:DashboardBeanService ) { }

  getDataForCharts( movements:Movement[], categories:Category[] ) {

    this.cleanValues();
    this.categoriesList = categories;
    this.movementsList = movements;

    this.dataForBalanceChart();
    this.dataForBalancePie();

    this.dataForExpenses();

    this.dashboardBean.setLoadInformation( false );
   

  }/////////////////////////////////////////////////////


  dataForExpenses(){
    let auxDate = new Date( this.movementsList[0].customDate );
    let monthsArray:number[] = [];
    monthsArray.push( auxDate.getMonth() );

    for( let i=0; i < this.movementsList.length; i++){
      let movementDate = new Date( this.movementsList[i].customDate );
      if( movementDate.getMonth() == auxDate.getMonth() ){
        this.monthMovementProcess( this.movementsList[i], monthsArray );
      } 
      else {
        this.monthMovementProcess( this.movementsList[i], monthsArray );
        auxDate = movementDate;
      }
    }
    this.monthMovementArray = this.monthMovementsArray( monthsArray );
    this.expensesMainData( this.monthMovementArray );
  }

  expensesMainData( monthMovementArray:MonthMovementArray[] ){
    monthMovementArray.forEach( element => {
      this.fillExpensesMainData( element );
      
    });
  }

  fillExpensesMainData( movements:MonthMovementArray ){
    // MONTH - DETAILS ARRAY 
    let auxCategoryId:string[] = [];
    let auxLabels:string[] = [];
    let auxCategory:Category[] = [];
    let auxBackgroundColor:string[] = [];
    let auxTotalAmount:number[] = [];

    this.firstScreen = {
      labels:[],
      totalAmount:[],
      category:[],
      categoryId:[],
      backgroundColor:[]
    };

    movements.details.forEach( element => {
      if( element.movement.type === "CHARGE" ){
        element.movement.concepts.forEach( concept => {
          this.getCategoryInfo(concept, auxCategoryId, auxLabels, auxCategory, auxBackgroundColor );
         });
      }
    });
    auxTotalAmount = this.getTotalAmount( movements, auxTotalAmount, auxCategory );

    this.auxLabels = auxLabels;
    this.auxTotalAmount = auxTotalAmount;
    this.auxCategory = auxCategory;
    this.auxCategoryId = auxCategoryId;
    this.auxBackgroundColor = auxBackgroundColor;

    this.firstScreen.labels = this.auxLabels;
    this.firstScreen.totalAmount = this.auxTotalAmount;
    this.firstScreen.category = this.auxCategory;
    this.firstScreen.categoryId = this.auxCategoryId;
    this.firstScreen.backgroundColor = this.auxBackgroundColor; 
    
    this.detailsOfMainData( movements );
    console.log( this.firstScreen );

    console.log("-------------------");
  }

  detailsOfMainData( movements:MonthMovementArray ){
    let detailsForExpenses:PreDetails[] = [];

    this.auxCategory.forEach( category => {
      let movementsArray:any[] = [];
      movements.details.forEach( movement => {
        movement.movement.concepts.forEach( concept => {
          if( !isNullOrUndefined( concept.category ) ){
            if( !isNullOrUndefined( concept.category.parent ) ){
              if( concept.category.parent.id == category.id ){
                movementsArray.push( movement );
              }
            } else {
              // SUBCAT AS CATEGORY
              if( concept.category.id == category.id ){
                movementsArray.push( movement );
              }
            }
          } else {
            // NO CATEGORY
            if( "000000" == category.id ){
              movementsArray.push( movement );
            }
          }

        });
      });
      detailsForExpenses.push({ 
        Category:category,
        Movements: movementsArray
      });
    });
    
   this.filterOfSubcats( detailsForExpenses );

  }

  filterOfSubcats( detailsForExpenses:PreDetails[] ){
    this.secondScreen = []
    //console.log( detailsForExpenses );

    // process to get details
    detailsForExpenses.forEach( (element:PreDetails) => {
    
      if( element.Category.id != "000000" ){
        element.Movements.forEach( Movement => {
          Movement.movement.concepts.forEach( concept => {
            if( !isNullOrUndefined( concept.category ) ){
              if( !isNullOrUndefined( concept.category.parent ) ){

                this.fillingExpenses( concept, Movement.movement );


              } else {
                // MOVS WO SUBCATS
                if( concept.type == "DEFAULT" ){
                  this.fillingExpensesNoSubCats( element );
                }
              }
            } 
          });
        });

      } else {
        this.fillingExpensesNoCat( element );
      }
    });

  }


  // TODO LO QUE ENTRA A ESTE METODO TIENE UN PARENT ID
  fillingExpenses( concept, movement:Movement ){
    let flagDoubleCat:boolean = false;
   
    this.secondScreen.forEach( (secondScreen:ExpensesSecondScreen) => {
      if( concept.category.parent.id == secondScreen.Category.id ){
        flagDoubleCat = true;
      }
    });

    if( !flagDoubleCat ){
      this.pushMovementWithNewParent( concept, movement );
    } else {
      this.pushMovementWithSameParent( concept, movement );


    }
  }

  pushMovementWithNewParent( concept, movement:Movement ){

    
    
  }

  pushMovementWithSameParent( concept, movement:Movement ){

    

  }

  fillingExpensesNoSubCats( element:PreDetails ){
    let totalAmount:number = 0;
    let movements:Movement[] = [];
    let flagDoubleCat:boolean = false;

    this.secondScreen.forEach( (secondScreen:ExpensesSecondScreen) => {
      if( element.Category.id == secondScreen.Category.id ){
        flagDoubleCat = true;
      }
    });

    if( !flagDoubleCat ){
      element.Movements.forEach( movement => {
        movements.push( movement.movement ) 
        totalAmount += movement.movement.amount
      });
      this.secondScreen.push({
        Category:element.Category,
        movementsPerSubCategory:[{
          subCategory: element.Category,
          backgroundColorSubCategory: element.Category.color,
          totalAmount: totalAmount,
          movements: movements
        }]
      });
    }
  }

  fillingExpensesNoCat( elementPreDetails:PreDetails ){
    let totalAmount:number = 0;
    let movements:Movement[] = [];

    elementPreDetails.Movements.forEach( movement =>{ 
      movements.push( movement.movement ) 
      totalAmount += movement.movement.amount
    })
    
    this.secondScreen.push({
      Category:elementPreDetails.Category,
      movementsPerSubCategory:[{
        subCategory: elementPreDetails.Category,
        backgroundColorSubCategory: elementPreDetails.Category.color,
        totalAmount: totalAmount,
        movements: movements
      }]
    });

  }

  // Se ejecuta una vez por cada MES
  getTotalAmount( movements:MonthMovementArray, auxTotalAmount:number[], auxCategory:Category[] ): number[]{
    auxCategory.forEach( category => {
      auxTotalAmount.push( this.filterForTotalAmount( category, movements.details ) );
    });
    return auxTotalAmount;
  }

  filterForTotalAmount( category:Category, movements:monthMovement[] ):number {
    let amount:number = 0;

    movements.forEach( movement => {
      if( movement.movement.type == "CHARGE"){
        movement.movement.concepts.forEach( concept => {
          if( concept.type == "DEFAULT"){
            if( !isNullOrUndefined( concept.category ) ){
              if( !isNullOrUndefined( concept.category.parent ) ){
                if( category.id == concept.category.parent.id ){
                  amount += movement.movement.amount;
                }
              } else {
                if( category.id == concept.category.id ){
                  amount += movement.movement.amount;
                }
              }
            } else {
              if( category.id == "000000" ){
                amount += movement.movement.amount;
              }
            }
          }
        });
      }
    });
    return amount;
  }
 
  getCategoryInfo( concept, auxCategoryId:string[], auxLabels:string[], auxCategory:Category[],
              auxBackgroundColor:string[] ) {
    if( !isNullOrUndefined(concept.category) ){
      if( !isNullOrUndefined(concept.category.parent )){
        if( concept.type === "DEFAULT" ){
          if( !auxCategoryId.includes( concept.category.parent.id ) ){
            // NORMAL MOVEMENT
            auxCategoryId.push( concept.category.parent.id );
            auxLabels.push( this.getLabelByCatId( concept.category.parent.id ));
            auxCategory.push( this.getCategoryById( concept.category.parent.id ));
            auxBackgroundColor.push( this.getCategoryById( concept.category.parent.id ).color );
          }
        } 
      } else {
        // NO SUBCATEGORY
        if( !auxCategoryId.includes( concept.category.id ) ){
          auxCategoryId.push( concept.category.id );
          auxLabels.push( this.getLabelByCatId( concept.category.id ));
          auxCategory.push( this.getCategoryById( concept.category.id ));
          auxBackgroundColor.push( concept.category.color );
        }
      }
    } else {
      // NO CATEGORY
      if( !auxCategoryId.includes("000000") ){
        auxCategoryId.push("000000");
        auxLabels.push("Sin Categoría");
        auxCategory.push({
          id:"000000",
          color:"#AAAAAA",
          name: "Sin Categoria",
          textColor: "#FFFFFF"
        });
        auxBackgroundColor.push( "#AAAAAA" );
      }
    }
  }

  getCategoryById( id:string ):Category{
    let categoryVar:Category;
    this.categoriesList.forEach( category => {
      if( category.id == id ){
        categoryVar = category;
      }
    });
    return categoryVar;
  }

  getLabelByCatId( id:string ):string {
    let label:string = "";
    this.categoriesList.forEach( category => {
      if( category.id == id ){
        label = category.name;
      }
    });
    return label;
  }

  monthMovementsArray( monthsArray:number[] ):MonthMovementArray[] {
    let movementArray:MonthMovementArray[] = [];
    monthsArray.forEach( monthIndex => {
      movementArray.push({
        month: monthIndex,
        details: this.movementsPerMonth.filter( mov => mov.month == monthIndex )
      });
    })
    return movementArray;
  }

  // Arreglo de mes-movimiento, mes-movimiento
  monthMovementProcess( movement:Movement, monthsArray:number[] ){
    let date = new Date( movement.customDate );
    
    if( !monthsArray.includes( date.getMonth() ) ){
      monthsArray.push( date.getMonth() );
    }
    if( date.getMonth() == this.auxMonthMovement ){
      this.movementsPerMonth.push( { month:date.getMonth(), movement:movement } );
    } else {
      this.auxMonthMovement = date.getMonth();
      this.movementsPerMonth.push( { month:date.getMonth(), movement:movement } );
    }
  }

  dataForBalanceChart(){
    let firstdate = new Date( this.movementsList[0].customDate );
    this.fillingYearsArray( firstdate.getFullYear() ); 
    let auxMonth:number = firstdate.getMonth();

    this.movementsList.forEach( movement => {
      let date = new Date( movement.customDate );
      let dateMovementMonth = date.getMonth();

      if( auxMonth == dateMovementMonth ){
        this.chargeDepositOperation( movement );
      } 
      else {
        this.savingBalanceAux = this.depositBalanceAux - this.chargeBalanceAux;
        this.savingBalanceAux < 0 ? this.savingBalanceAux = 0 : this.savingBalanceAux = this.savingBalanceAux
        this.dataProcessBalanceChart( auxMonth, this.chargeBalanceAux, this.savingBalanceAux );
        this.fillingYearsArray( date.getFullYear() ); 
        auxMonth = dateMovementMonth;
        this.chargeBalanceAux = 0; this.depositBalanceAux = 0;
        this.chargeDepositOperation( movement );
      }
    });
    this.dataProcessBalanceChart( auxMonth, this.chargeBalanceAux, this.savingBalanceAux ); 
    this.setAuxStackedData();
  }

  dataForBalancePie(){
    let stackedData = this.dashboardBean.getDataStackedBar();
    let auxDataBalancePieChart:BalancePieChart[] = [];
    for( let i=0; i < stackedData[0].labels.length; i++ ){
      auxDataBalancePieChart.push({
        data: [stackedData[0].expenses[i], stackedData[0].saving[i] ]
      });
    }
    this.dashboardBean.setDataBalancePieChart( auxDataBalancePieChart );
  }

  dataProcessBalanceChart( monthNumber:number, gastosValue:number, ahorroValue:number ){
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let name:string = "";
    for( let i = 0; i < months.length; i++ ){
      monthNumber == i ? name = months[i] : null
    }

    this.auxDataStackedBarExpenses.push( Math.round(gastosValue) );
    this.auxDataStackedBarSaving.push( Math.round(ahorroValue) );
    this.auxDataStackedBarLabels.push( name );
  }

  fillingYearsArray( year:number ){
    this.auxDataStackedBarYear.push( year );
  }

  setAuxStackedData(){
    let auxStackedData:StackedBar[] = [];
    auxStackedData.push({
      expenses: this.auxDataStackedBarExpenses.reverse(),
      saving: this.auxDataStackedBarSaving.reverse(),
      labels: this.auxDataStackedBarLabels.reverse(),
      year: this.auxDataStackedBarYear.reverse()
    });
    this.dashboardBean.setDataStackedBar( auxStackedData );
  }

  chargeDepositOperation( movement ){
    if( movement.type === "CHARGE" ){
      this.chargeBalanceAux += movement.amount; 
    }
    if( movement.type === "DEPOSIT" ){
      this.depositBalanceAux += movement.amount;
    }
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

  cleanValues(){
    this.chargeBalanceAux = 0;
    this.depositBalanceAux = 0;
    this.savingBalanceAux = 0;
    this.auxMonthMovement = 0;
    this.auxDataStackedBarExpenses = [];
    this.auxDataStackedBarSaving = [];
    this.auxDataStackedBarLabels = [];
    this.auxDataStackedBarYear = [];
  }


}
