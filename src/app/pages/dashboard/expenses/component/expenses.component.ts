import { Component, OnInit, Input } from '@angular/core';
import { Chart } from "chart.js";
import { DashboardBeanService } from "@services/dashboard/dashboard-bean.service";
import { ExpensesMainData } from '@app/interfaces/dashboard/dataExpensesComponent.interface';
import { MonthChartEvent } from '@app/interfaces/dashboard/monthChartEvent.interface';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { TableData } from '@app/interfaces/dashboard/dataForTables.interface';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  stackedBarData:StackedBar[] = [];
  doughnutChart:Chart;
  expensesData:ExpensesMainData[] = [];
  dataForTable:TableData[] = [];
  monthOfCategorySelected:MonthChartEvent = {
    label:null,
    index: null
  };

  totalAmount:number = 0;
  titleMonth:string = "";
  titleYear:string = "";
  assetsUrl:string = "../../../assets/media/img/categories/color";
  showBackButton:boolean = false;
 

  constructor( private dashboardBean:DashboardBeanService ) {
   }

  ngOnInit() {
    this.getStackedBarData();
    this.getMainData();
    this.setMainMessage( this.stackedBarData[0].labels.length - 1 );
    this.setTitles( this.stackedBarData[0].labels.length - 1 );
    this.firstData();
  }

  firstData(){
    this.PieChartOfCats( this.expensesData.length - 1 );
    this.dataForTableOfCats( this.expensesData.length - 1 );
  }

  PieChartOfCats( index:number ){
  
    let pieChart = document.querySelector("#expensesPieChart");
    this.doughnutChart = new Chart(pieChart, {
      type: 'doughnut',
      data:{
        labels: this.expensesData[index].firstScreen.labels,
        datasets:[{
          data: this.expensesData[index].firstScreen.totalAmount,
          backgroundColor:this.expensesData[index].firstScreen.backgroundColor
        }],
      },
      options: {
        responsive: true,
        animation:{
          animateScale : false
        },
        legend: { display: false },
      }
    });
  }

  PieChartOfSubCats( labels:string[], data:number[], backgroundColor:string[] ){
    let pieChart = document.querySelector("#expensesPieChart");
    this.doughnutChart = new Chart(pieChart, {
      type: 'doughnut',
      data:{
        labels: labels,
        datasets:[{
          data: data,
          backgroundColor: backgroundColor
        }],
      },
      options: {
        responsive: true,
        animation:{
          animateScale : false
        },
        legend: { display: false },
      }
    });
  }

  dataForTableOfCats( index:number ){
    this.dataForTable = [];
    for (let i=0; i < this.expensesData[index].firstScreen.labels.length; i++ ){
      this.dataForTable.push({
        catId: this.expensesData[index].firstScreen.categoryId[i],
        label: this.expensesData[index].firstScreen.labels[i],
        amount: this.expensesData[index].firstScreen.totalAmount[i],
        index: index
      });
    }
  }

  dataForTableofSubcats( parentId:string, index:number ){
    this.dataForTable = [];
    for( let i=0; i < this.expensesData[index].secondScreen.length; i++ ){
      if( this.expensesData[index].secondScreen[i].parentCategory == parentId ){
        for(let j=0; j<this.expensesData[index].secondScreen[i].details.length; j++ ){
          this.dataForTable.push({
            catId: this.expensesData[index].secondScreen[i].parentCategory,
            label: this.expensesData[index].secondScreen[i].details[j].subCategory.name,
            amount: this.expensesData[index].secondScreen[i].details[j].totalAmount,
            index: index
          })
        }
      }
    }
  }

  makingStructureForPie( parentId:string, index:number ){
    let labels:string[] = [];
    let amount:number[] = [];
    let backgroundColor:string[] = [];

    for( let i=0; i < this.expensesData[index].secondScreen.length; i++ ){
      if( this.expensesData[index].secondScreen[i].parentCategory == parentId ){
        for(let j=0; j<this.expensesData[index].secondScreen[i].details.length; j++ ){
          labels.push( this.expensesData[index].secondScreen[i].details[j].subCategory.name );
          amount.push( this.expensesData[index].secondScreen[i].details[j].totalAmount );
          backgroundColor.push( this.expensesData[index].secondScreen[i].details[j].subCategory.color );
        }
      }
    }
    this.PieChartOfSubCats( labels, amount, backgroundColor );
  }

  // EVENTO DE CLICK
  selectedMonthChart( event:MonthChartEvent ){
    this.setMainMessage( event.index );
    this.setTitles( event.index );
    this.doughnutChart.destroy();
    this.showBackButton = false;
    this.PieChartOfCats( event.index );
    this.dataForTableOfCats( event.index );
  }

  clickOnCategory( element:TableData ){
    this.doughnutChart.destroy();
    this.showBackButton = true;

    this.monthOfCategorySelected.label = element.label;
    this.monthOfCategorySelected.index = element.index;

    this.dataForTableofSubcats( element.catId, element.index );
    this.makingStructureForPie( element.catId, element.index );
  }

  setTitles( index:number ){
    this.titleMonth = this.stackedBarData[0].labels[index];
    this.titleYear = this.stackedBarData[0].year[index].toString();

    let titleOfThePage = document.querySelector(".brand-logo");
    titleOfThePage.innerHTML = "Resumen "+ this.titleMonth + " "+ this.titleYear;
  }

  setMainMessage( index ){
    this.totalAmount = this.stackedBarData[0].expenses[index];
  }

  getStackedBarData(){
    this.stackedBarData = this.dashboardBean.getDataStackedBar();
  }

  getMainData(){
    this.expensesData = this.dashboardBean.getDataExpensesTab();
  }

  dataForExpensesBarChart():number[] {
    return this.stackedBarData[0].expenses;
  }

  labelsForExpensesChart():string[] {
    return this.stackedBarData[0].labels;
  }

}
