import { Injectable } from '@angular/core';
import { Movement } from '@interfaces/movement.interface';
import { BalanceChart } from "@app/shared/interfaces/dashboardBalanceChart.interface";
import { BarChart } from "@interfaces/dashboardBarChart.interface";
import { PieChart } from "@interfaces/dasboardPieChart.interface";

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

  constructor( ) { }

  getDataForBalanceChart( movements:Movement[] ) {
    this.dataBalanceMonthChart = [];
    this.chargeBalanceAux = 0; this.depositBalanceAux = 0; this.savingBalanceAux = 0;

    let auxMonth = new Date().getMonth();
    for( let i=0; i < movements.length; i++ ){
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
    this.dataProcessBalanceChart( auxMonth, this.chargeBalanceAux, this.savingBalanceAux );
    this.dataBalanceMonthChart.reverse();
    this.dataExpensesChart.reverse();
    
    sessionStorage.setItem("balanceData", JSON.stringify(this.dataBalanceMonthChart) );
    sessionStorage.setItem("expensesData", JSON.stringify(this.dataExpensesChart) );

    return this.dataBalanceMonthChart;
    
  }

  dataProcessBalanceChart( monthNumber:number, gastosValue:number, ahorroValue:number ){
    // Name of the month process
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
                        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let name:string = "";
    for( let i = 0; i < months.length; i++ ){
      monthNumber == i ? name = months[i] : null
    }
    this.dataBalanceMonthChart.push( { name: name, 
                                  series:[ 
                                      { name : "Gastos", value : gastosValue }, 
                                      { name : "Ahorro", value : ahorroValue } 
                                  ]
    });

    this.dataExpensesChart.push({ name: name, value: gastosValue });
  }
}
