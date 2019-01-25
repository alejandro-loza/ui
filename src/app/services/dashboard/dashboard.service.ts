import { Injectable } from '@angular/core';
import { Movement } from '@interfaces/movement.interface';
import { BalanceChart } from "@interfaces/dashboardBalanceChart.interface";
import { BarChart } from "@interfaces/dashboardBarChart.interface";
import { PieChart } from "@interfaces/dasboardPieChart.interface";
import { DataForCharts } from '@interfaces/dataExpensesComponent.interface';
import { movementsPerMonth } from "@interfaces/dashboardMovementsPerMonth.interface";
import { Category } from '@interfaces/category.interface';
import { isNullOrUndefined } from 'util';
import { ExpensesPieChart } from '@app/interfaces/dashboardPieChartExpenses.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  chargeBalanceAux:number = 0;
  depositBalanceAux:number = 0;
  savingBalanceAux:number = 0;
  dataBalanceMonthChart:BalanceChart[] = [];
  dataExpensesChart:BarChart[] = [];
  dataBalancePieChart:PieChart[] = [];

  // EXPENSES STUFF
  dataForCharts:DataForCharts[] = [];
  movementsPerMonth:movementsPerMonth[] = [];
  dataExpensesPieChart:any[] = [];   // CREAR INTERFAZ
  expensesFirstPart:any[] = [];
  movementsPerSubCat:any[] = [];
  details:any[] = [];

  // AUX
  auxMonth:number = 0;

  constructor() { }

  getDataForCharts( movements:Movement[], categories:Category[] ) {
    this.cleanValues();
    let auxMonth = new Date().getMonth();

    for( let i=0; i < movements.length; i++ ){
      this.dataProcessMovementsPerMonth( movements[i] );
      let movementMonth = new Date (movements[i].customDate);

      if( movementMonth.getMonth() == auxMonth ){
        if( movements[i].type === "CHARGE" ){
          this.chargeBalanceAux += movements[i].amount; 
        }
        if( movements[i].type === "DEPOSIT" ){
          this.depositBalanceAux += movements[i].amount;
        }
      } 
      else {
        this.savingBalanceAux = this.depositBalanceAux - this.chargeBalanceAux;
        this.savingBalanceAux < 0 ? this.savingBalanceAux = 0 : this.savingBalanceAux = this.savingBalanceAux
        
        this.dataProcessBalanceChart( auxMonth, this.chargeBalanceAux, this.savingBalanceAux );
        this.chargeBalanceAux = 0; this.depositBalanceAux = 0;

        if( movements[i].type === "CHARGE" ){
          this.chargeBalanceAux += movements[i].amount; 
        }
        if( movements[i].type === "DEPOSIT" ){
          this.depositBalanceAux += movements[i].amount;
        }
        auxMonth = movementMonth.getMonth();
      }
    }

    this.dataProcessMovements( this.movementsPerMonth, categories );
    this.dataProcessBalanceChart( auxMonth, this.chargeBalanceAux, this.savingBalanceAux );
    this.settingDataForExpensesPie();
    this.dataBalanceMonthChart.reverse();
    this.dataExpensesChart.reverse();
    
    sessionStorage.setItem("balanceData", JSON.stringify(this.dataBalanceMonthChart) );
    sessionStorage.setItem("expensesData", JSON.stringify(this.dataExpensesChart) );
    sessionStorage.setItem("expensesPie", JSON.stringify( this.dataExpensesPieChart ));
    sessionStorage.setItem("formatedData", JSON.stringify( this.dataForCharts ));

    return this.dataForCharts;
  }

  dataProcessMovements( movementsPerMonth:movementsPerMonth[], categories:Category[] ){
    let arrayMonths:number[] = [];
    let arrayMovs:any[] = [];
    let catsArray:string[] = [];
    let valueAux:number[] = [];
    let valueAuxDad:any[] = [];
    let auxMonth:Date;
    let auxMovements:any[] = [];
    let sumValues:number = 0;
   
    for( let i=0; i < movementsPerMonth.length ; i++ ){
      if( movementsPerMonth[i].month != arrayMonths[ arrayMonths.length - 1 ] || i == 0 ){
        arrayMonths.push( movementsPerMonth[i].month );
        let movsFilter = movementsPerMonth.filter( mov => mov.month == arrayMonths[ arrayMonths.length - 1] );
        let movsAux:Movement[] = [];
        movsFilter.forEach(element => {
          movsAux.push( element.movement );
        });
        arrayMovs.push({
          month: arrayMonths[arrayMonths.length - 1],
          movements: movsAux
        });
      }
    }
    
    for( let i=0; i < arrayMovs.length; i++ ){
      arrayMovs[i].movements.forEach( movement => {
        // MOVEMENT WITH CATEGORY
        if( !isNullOrUndefined( movement.concepts[0].category )){
          // Filtro para movimientos divididos
          if( movement.concepts.length < 2 ){
            if( !isNullOrUndefined( movement.concepts[0].category.parent ) ){
              if( !catsArray.includes( movement.concepts[0].category.parent.id, 0 ) ){
                catsArray.push( movement.concepts[0].category.parent.id );
              }
            } else {
              catsArray.push( movement.concepts[0].category.id );
            }
          } else {
            // MOVEMENT WITH MORE THAN 2 CONCEPTS
            movement.concepts.forEach(concept => {
              if( !isNullOrUndefined( concept.category ) ){
                concept.type == "DEFAULT" ? catsArray.push( concept.category.parent.id ) : null
              } else {
                // MOVEMENT WITHOUT CATEGORY
                concept.type == "DEFAULT" ? catsArray.push( "NoCategory" ) : null
              }
             
            });
          }
        } else {
          if( !catsArray.includes("NoCategory", 0 ) ){
            catsArray.push( "NoCategory" );
          }
        }
      });
      catsArray.forEach( (categoryId:string) => {
        valueAux = [];
        sumValues = 0;
        auxMovements = [];
        
        // LISTA DE MOVIMIENTOS MES X MES
        arrayMovs[i].movements.forEach( element => {
          let date = new Date( element.customDate );
          if( !isNullOrUndefined( element.concepts[0].category ) ){
            if( element.concepts.length < 2 ){
              if( !isNullOrUndefined( element.concepts[0].category.parent ) ){
                if( element.concepts[0].category.parent.id == categoryId ){

                  if( element.type == "CHARGE" ){
                    valueAux.push(  element.concepts[0].amount );
                    auxMovements.push( element );
                  } else if( element.type == "DEPOSIT" ){
                    auxMovements.push( element );
                    // PARA LA CHART DE INCOMES 
    
                  }
                } 
              } else {
                // PARA MOVS SIN SUBCAT
                if( element.concepts[0].category.id == categoryId ){
                  if( element.type == "CHARGE" ){
                    valueAux.push(  element.concepts[0].amount );
                    auxMovements.push( element );
                  } else if( element.type == "DEPOSIT" ){
                    auxMovements.push( element );
                    // PARA LA CHART DE INCOMES 
    
                  }
                } 
              }
            } else {
              // Else for splited movements
              element.concepts.forEach( concept => {
                if( concept.type == "DEFAULT"){
                  if( !isNullOrUndefined( concept.category ) ){
                    if( concept.category.parent.id == categoryId ){
                      if( element.type == "CHARGE" ){
                        valueAux.push(  element.amount );
                        auxMovements.push( element );
                      } else if( element.type == "DEPOSIT" ){
                        auxMovements.push( element );
                        // PARA LA CHART DE INCOMES 
        
                      }
                    } 
                  } else {
                    if( element.type == "CHARGE" ){
                      valueAux.push(  element.amount );
                      auxMovements.push( element );
                    } else if( element.type == "DEPOSIT" ){
                      auxMovements.push( element );
                      // PARA LA CHART DE INCOMES 
                    }
                  }
                }
              });
            }
          } else {
            if( categoryId == "NoCategory"){
             
              if( element.type == "CHARGE" ){
                valueAux.push(  element.concepts[0].amount );
                auxMovements.push( element );
              } else if( element.type == "DEPOSIT" ){
                auxMovements.push( element );
                // PARA LA CHART DE INCOMES 

              }
            }
          }
          auxMonth = new Date( element.customDate );
        });

        valueAux.forEach( value => {
          sumValues += value;
        });

        valueAuxDad.push({
          catId: categoryId,
          month: auxMonth.getMonth(),
          value: sumValues,
          movements: auxMovements
        });
      });
      
      this.replaceCategoryId( valueAuxDad, categories );
      catsArray = [];   valueAuxDad = [];
    }

  }

  replaceCategoryId( values , categories:Category[] ){
    let detailsAux:ExpensesPieChart[] = [];
    let subcatsAux:any[] = [];
    let movsForSubs:any[] = [];
    let flagForMovsWithoutCat:boolean = false;
    
    values.forEach( element => {
      categories.forEach( category => {
        if( element.catId == category.id ){
          detailsAux.push({
            category:category,
            categoryName:category.name,
            value: element.value,
            movements: element.movements
          });
        } else if( element.catId == "NoCategory" && !flagForMovsWithoutCat ){
          
          detailsAux.push({
            category: {
              id:"000000",
              color: "#AAAAAA",
              name: "Sin Categoria",
              textColor: "#FFF",
            },
            categoryName:"NoCategory",
            value: element.value,
            movements: element.movements
          });
          flagForMovsWithoutCat = true;
        } 
      });
    });
    console.log( detailsAux );
    // FOREACH PARA COMPLETAR LA PRIMER PANTALLA DE DASHBOARD
    detailsAux.forEach( element => {
      
      let date = new Date( element.movements[0].customDate );
      this.expensesFirstPart.push({
       referenceDate:date,
       category:element.category,
       totalValue:element.value,
       movementsPerCategory: element.movements  
      });
    });


    // FOR PARA LISTA DE SUBCATS SIN REPETIR
    for( let i=0; i<this.expensesFirstPart.length; i++ ){
      this.expensesFirstPart[i].movementsPerCategory.forEach( movement => {

        if(!isNullOrUndefined( movement.concepts[0].category) ){
          if( !subcatsAux.includes( movement.concepts[0].category.id, 0) ){
            subcatsAux.push( movement.concepts[0].category.id );
            movsForSubs.push({
              subcat: movement.concepts[0].category.id,
              movements:[
                movement
              ],
              totalValue: movement.type == "CHARGE" ? movement.amount : 0
            });
          } else {
            movsForSubs.forEach( element => {
              if( element.subcat ==  movement.concepts[0].category.id ){
                element.movements.push( movement );
                element.totalValue += movement.type == "CHARGE" ? movement.amount : 0
              }
            });
          }
        } else {
          // ELSE PARA MOVS SIN CATEGORIA
          if( !subcatsAux.includes( "NoCategory", 0) ){
            subcatsAux.push( "NoCategory" );
            movsForSubs.push({
              subcat:"NoCategory",
              movements:[
                movement
              ],
              totalValue: movement.type == "CHARGE" ? movement.amount : 0
            });
          } else {
            movsForSubs.forEach( element => {
              if( element.subcat == "NoCategory" ){
                element.movements.push( movement );
                element.totalValue += movement.type == "CHARGE" ? movement.amount : 0
              }
            });
          }
        }
      });
    }
  
    //PROCESO PARA LIGAR SUBCATEGORIAS CON CATEGORIAS
    this.expensesFirstPart.forEach( element => {
      let id:string;
      !isNullOrUndefined( element.category ) ? id = element.category.id : id="NoCategory"
      let subcatsAuxForPush:any = [];
      
      movsForSubs.forEach( subElement => {
        if( subElement.movements[0].concepts.length == 1 ){
          if( !isNullOrUndefined(subElement.movements[0].concepts[0].category ) ){
            if( !isNullOrUndefined(subElement.movements[0].concepts[0].category.parent) ){
              if( subElement.movements[0].concepts[0].category.parent.id == id ){
                subcatsAuxForPush.push( subElement );
                subElement.subcat = subElement.movements[0].concepts[0].category;
              }
            } else if(subElement.subcat == id ){
              // NO CATEGORY
              subcatsAuxForPush.push( subElement );
              subElement.subcat = id;
            }
          } else {
            // ELSE PARA MOVS SIN SUBCATS y MOVS SIN CATS
            if( subElement.subcat == id ){
              subcatsAuxForPush.push( subElement );
              subElement.subcat = id;
            }
          }
          
        } else {
          // ELSE FOR SPLIT MOVEMENTS
         // console.log( subElement );
          if( !isNullOrUndefined( subElement.movements[0].concepts[0].category ) ){
            if( subElement.movements[0].concepts[0].category.id == id ){
              subcatsAuxForPush.push( subElement );
              subElement.subcat = subElement.movements[0].concepts[0].category;
            }
          } else if( subElement.subcat == id ){
            subcatsAuxForPush.push( subElement );
            subElement.subcat = id;
          }
        }

      });

      this.dataForCharts.push({
        referenceDate: element.referenceDate,
        category: element.category,
        totalValue: element.totalValue,
        movementsPerCategory: element.movementsPerCategory,
        details: subcatsAuxForPush
      });

    });

    this.expensesFirstPart = [];
    subcatsAux = [];
  }

  // Arreglo de mes-movimiento, mes-movimiento
  dataProcessMovementsPerMonth( movement:Movement ){
    let date = new Date( movement.customDate );
    if( date.getMonth() == this.auxMonth ){
      this.movementsPerMonth.push( { month:date.getMonth(), movement:movement } );
    } else {
      this.auxMonth = date.getMonth();
      this.movementsPerMonth.push( { month:date.getMonth(), movement:movement } );
    }
  }

  settingDataForExpensesPie(){   
    let arraysOfMonths:number[] = [];
    this.dataExpensesPieChart = [];

    for(let i = 0; i < this.dataForCharts.length; i++ ){

     if( this.dataForCharts[i].referenceDate.getMonth() != arraysOfMonths[ arraysOfMonths.length - 1] || i == 0 ){
      arraysOfMonths.push( this.dataForCharts[i].referenceDate.getMonth() ); 
      
      let pieFilter = this.dataForCharts.filter( element => element.referenceDate.getMonth() == arraysOfMonths[ arraysOfMonths.length - 1]);
      let pieSeries:any[] = [];

      pieFilter.forEach( element => {
       if( !isNullOrUndefined( element.category ) ){
          pieSeries.push({
            name: element.category.name,
            value: element.totalValue,
            color: element.category.color
          });
       } else {
        pieSeries.push({
          name: "Sin Categoria",
          value: element.totalValue,
          color: "#AAAAAA"
        });
       }
      
      });
      this.sortJSON( pieSeries, "value", "desc");
      this.dataExpensesPieChart.push({
        month: arraysOfMonths[ arraysOfMonths.length - 1],
        series: pieSeries
      });
     }
    }
  }

  dataProcessBalanceChart( monthNumber:number, gastosValue:number, ahorroValue:number ){
    // Name of the month process
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let name:string = "";
    for( let i = 0; i < months.length; i++ ){
      monthNumber == i ? name = months[i] : null
    }
    this.dataBalanceMonthChart.push( { name: name, month:monthNumber, 
                                  series:[ 
                                      { name : "Gastos", value : gastosValue }, 
                                      { name : "Ahorro", value : ahorroValue } 
                                  ]
    });
    this.dataExpensesChart.push( { name: name, value: gastosValue, month:monthNumber } );
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
    this.dataBalanceMonthChart = []; 
    this.dataExpensesChart = [];
    this.dataExpensesPieChart = [];
    this.chargeBalanceAux = 0; 
    this.depositBalanceAux = 0; 
    this.savingBalanceAux = 0;
    this.movementsPerMonth = [];
    this.dataForCharts = [];
  }


}
