import { Component, OnInit, Input } from '@angular/core';
import { Chart } from "chart.js";
import { DashboardBeanService } from "@services/dashboard/dashboard-bean.service";
import { ResumeMainData } from '@app/interfaces/dashboard/resumeMainData.interface';
import { MonthChartEvent } from '@app/interfaces/dashboard/monthChartEvent.interface';
import { StackedBar } from '@app/interfaces/dashboard/dashboardStackedBar.interface';
import { TableData } from '@app/interfaces/dashboard/dataForTables.interface';
import { isNullOrUndefined } from 'util';
import { PieChart } from '@app/interfaces/dashboard/pieChart.interface';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  stackedBarData:StackedBar[] = [];
  dataForPieChart:PieChart = {labels:[], amount:[], backgroundColor:[]};
  doughnutChart:Chart;
  expensesData:ResumeMainData[] = [];
  dataForTable:TableData[] = [];

  totalAmount:number = 0;
  titleMonth:string = "";
  titleYear:string = "";
  assetsUrl:string = "../../../assets/media/img/categories/color";
  showBackButton:boolean = false;
  monthOnScreen:number = 0;

  constructor( private dashboardBean:DashboardBeanService ) {
   }

  ngOnInit() {
    this.getStackedBarData();
    this.getMainData();
    this.firstData();
  }

  firstData(){
    this.PieChartOfCats(0);
    this.dataForTableOfCats(0);
    this.setMainMessage( this.expensesData.length - 1 );
    this.setTitles( this.expensesData.length - 1 );
    this.monthOnScreen = this.expensesData.length - 1
    this.showBackButton = false;
  }

  PieChartOfCats( index:number ){
    if( !isNullOrUndefined( index ) ){
      this.transformIncomesData( this.expensesData[index] )
      let pieChart = document.querySelector("#expensesPieChart");
      this.doughnutChart = new Chart(pieChart, {
        type: 'doughnut',
        data:{
          labels: this.dataForPieChart.labels,
          datasets:[{
            data: this.dataForPieChart.amount,
            backgroundColor: this.dataForPieChart.backgroundColor
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
    } else {
      this.doughnutChart.destroy();
    }
  }

  pieChartOfSubcats(){
    let pieChart = document.querySelector("#expensesPieChart");
    this.doughnutChart = new Chart(pieChart, {
      type: 'doughnut',
      data:{
        labels: this.dataForPieChart.labels,
        datasets:[{
          data: this.dataForPieChart.amount,
          backgroundColor: this.dataForPieChart.backgroundColor
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

  transformIncomesData( data:ResumeMainData ){
    this.dataForPieChart.amount = [];
    this.dataForPieChart.labels = [];
    this.dataForPieChart.backgroundColor = [];
    data.data.forEach( element => {
      this.dataForPieChart.labels.push( element.label )
      this.dataForPieChart.amount.push( element.totalAmount )
      this.dataForPieChart.backgroundColor.push( element.backgroundColor )
    });
  }

  dataForTableOfCats( index:number ){
    this.dataForTable = [];
    this.expensesData[index].data.forEach( data => {
        this.dataForTable.push({
          catId: data.categoryId,
          label: data.label,
          amount: data.totalAmount,
          isSubCat:false,
          index: index
        });
    });
  }

  dataForTableOfSubcats( index:number, catId:string ){
    this.dataForTable = [];
    this.dataForPieChart.amount = [];
    this.dataForPieChart.labels = [];
    this.dataForPieChart.backgroundColor = [];
    this.expensesData[index].data.forEach( data => {
      if( data.categoryId == catId ){
        data.details.forEach( details => {
          if( !isNullOrUndefined( details.subCategory.parent ) ){
            this.dataForTable.push({
              catId: details.subCategory.parent.id,
              label: details.subCategory.name,
              amount: details.totalAmount,
              isSubCat:true,
              index: index
            });
          } else {
            this.dataForTable.push({
              catId: details.subCategory.id,
              label: details.subCategory.name,
              amount: details.totalAmount,
              isSubCat:true,
              index: index
            });
          }
          this.dataForPieChart.labels.push( details.subCategory.name );
          this.dataForPieChart.amount.push( details.totalAmount );
          this.dataForPieChart.backgroundColor.push( details.subCategory.color );
        });
      }
    });
  }

  // EVENTO DE CLICK
  selectedMonthChart( event:MonthChartEvent ){
    this.setMainMessage( event.index );
    this.setTitles( event.index );
    this.doughnutChart.destroy();
    this.showBackButton = false;
    this.PieChartOfCats( this.correctIndex( event ) );
    this.dataForTableOfCats( this.correctIndex( event ) );
  }

  clickOnCategory( element:TableData ){
    if( !element.isSubCat ){
      this.doughnutChart.destroy();
      this.showBackButton = true;
      this.dataForTableOfSubcats( element.index, element.catId );
      this.pieChartOfSubcats();
      this.setMainMessage( element.index, element.amount );
      this.monthOnScreen = element.index;
    }
  }

  correctIndex( event:MonthChartEvent ):number {
    let index:number = null;
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    for(let i=0; i<months.length; i++ ){
      if( months[i] == event.label ){
        for( let j = 0; j < this.expensesData.length; j ++){
          if( this.expensesData[j].month == i ){
            index = j;
          }
        }
      }
    }
    return index
  }

  returnButton( event:number ){
    let auxAmount:number = 0;
    this.doughnutChart.destroy();
    this.PieChartOfCats( event );
    this.dataForTableOfCats( event );
    this.showBackButton = false;
    this.expensesData[ event ].data.forEach( data => {
      auxAmount += data.totalAmount;
    });
    this.setMainMessage( event, auxAmount );
  }

  setTitles( index:number ){
    console.log( this.stackedBarData );
    this.titleMonth = this.stackedBarData[0].labels[index];
    this.titleYear = this.stackedBarData[0].year[index].toString();

    let titleOfThePage = document.querySelector(".brand-logo");
    titleOfThePage.innerHTML = "Resumen "+ this.titleMonth + " "+ this.titleYear;
  }

  setMainMessage( index:number, amount?:number ){
    if( isNullOrUndefined( amount ) ){
      this.totalAmount = this.stackedBarData[0].expenses[index];
    } else {
      this.totalAmount = amount;
    }
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
