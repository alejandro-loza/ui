import { Injectable } from '@angular/core';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { BalancePieChart } from '@app/interfaces/dashboard/BalancePieChart.interface';
import { ExpensesMainData } from '@app/interfaces/dashboard/dataExpensesComponent.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardBeanService {

  private dataStackedBar:StackedBar[] = [];
  private dataBalancePieChart:BalancePieChart[] = [];
  private loadInformation:boolean = true;
  private dataExpensesTab:ExpensesMainData[] = [];

  constructor() { }

  public setDataExpensesTab( data: ExpensesMainData[] ){
    this.dataExpensesTab = data;
  }

  public getDataExpensesTab():ExpensesMainData[]{
    return this.dataExpensesTab;
  }

  public setDataStackedBar( data: StackedBar[] ) {
    this.dataStackedBar = data;
  }

  public getDataStackedBar():StackedBar[]{
    return this.dataStackedBar;
  }

  public setDataBalancePieChart( data:BalancePieChart[] ){
    this.dataBalancePieChart = data;
  }

  public getDataBalancePieChart():BalancePieChart[]{
    return this.dataBalancePieChart;
  }

  public setLoadInformation( flag:boolean ){
    this.loadInformation = flag;
  } 

  public getLoadInformation():Boolean{
    return this.loadInformation;
  }

}
