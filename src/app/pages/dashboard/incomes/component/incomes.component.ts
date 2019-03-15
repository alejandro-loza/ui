import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MonthChartEvent } from '@app/interfaces/dashboard/monthChartEvent.interface';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';
import { BarChart } from '@app/interfaces/dashboard/BarChart.interface';
import { isNullOrUndefined } from 'util';
import { ResumeMainData } from '@app/interfaces/dashboard/resumeMainData.interface';
import { PieChart } from '@app/interfaces/dashboard/pieChart.interface';
import { TableData } from '@app/interfaces/dashboard/dataForTables.interface';

@Component({
	selector: 'app-incomes',
	templateUrl: './incomes.component.html',
	styleUrls: [ './incomes.component.css' ]
})
export class IncomesComponent implements OnInit {
	incomesData: ResumeMainData[] = [];
	dataForPieChart: PieChart = { labels: [], amount: [], backgroundColor: [] };
	dataForTable: TableData[] = [];
	monthOfCategorySelected: MonthChartEvent = {
		label: null,
		index: null
	};

  incomesData:ResumeMainData[] = [];
  dataForPieChart:PieChart = {labels:[], amount:[], backgroundColor:[]};
  dataForTable:TableData[] = [];
  monthOfCategorySelected:MonthChartEvent = {
    label:null,
    index: null
  };

  amountsBarChart:number[] = [];
  labelsBarChart:string[] = [];
  dataFromServiceForBarChart:BarChart[] = [];
  titleMonth:string = "";
  titleYear:string = "";
  showBackButton:boolean = false;

  doughnutChart:Chart = [];
  totalAmount:number = 0;
  assetsUrl:string = "../../../assets/media/img/categories/color";
  monthOnScreen:number = 0;

  constructor( private dashboardBeanService:DashboardBeanService ) { }

  ngOnInit() {
    this.getDataForIncomes();
    this.getDataForBarChart();
    this.dataForIncomesBarChart();
    this.firstData();
  }

  firstData(){
    this.PieChartOfCats(0);
    this.dataForTableOfCats(0);
    this.setMainMessage(this.dataFromServiceForBarChart.length - 1);
    this.setTitles(this.dataFromServiceForBarChart.length - 1);
    this.monthOnScreen = this.incomesData.length - 1;
    this.showBackButton = false;
  }

  PieChartOfCats( index:number ){
    if( !isNullOrUndefined( index ) ){
      this.transformIncomesData( this.incomesData[index] );
      let pieChart = document.querySelector("#incomesPieChart");
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

  pieChartOfSubcats() {
    let pieChart = document.querySelector("#incomesPieChart");
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
      this.dataForPieChart.labels.push( element.label );
      this.dataForPieChart.amount.push( element.totalAmount );
      this.dataForPieChart.backgroundColor.push( element.backgroundColor )
    });
  }

  dataForTableOfCats( index:number ){
    this.dataForTable = [];
    this.dataForPieChart.amount = [];
    this.dataForPieChart.labels = [];
    this.incomesData[index].data.forEach( data => {
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
    this.incomesData[index].data.forEach( data => {
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

  returnButton( event:number ){
    let auxAmount:number = 0;
    this.doughnutChart.destroy();
    this.PieChartOfCats( event );
    this.dataForTableOfCats( event );
    this.showBackButton = false;
    this.incomesData[ event ].data.forEach( data => {
      auxAmount += data.totalAmount;
    });
    this.setMainMessage( event, auxAmount );
  }

  correctIndex( event:MonthChartEvent ):number {
    let index:number = null;
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    for(let i=0; i<months.length; i++ ){
      if( months[i] == event.label ){
        for( let j = 0; j < this.incomesData.length; j ++){
          if( this.incomesData[j].month == i ){
            index = j;
          }
        }
      }
    }
    return index
  }

  setTitles( index:number ){
    this.titleMonth = this.dataFromServiceForBarChart[index].label;
    this.titleYear = this.dataFromServiceForBarChart[index].year.toString();

    let titleOfThePage = document.querySelector(".brand-logo");
    titleOfThePage.innerHTML = "Resumen "+ this.titleMonth + " "+ this.titleYear;
  }

  setMainMessage( index:number, amount?:number ){
    if( isNullOrUndefined( amount ) ){
      this.totalAmount = this.dataFromServiceForBarChart[index].amount;
    } else {
      this.totalAmount = amount;
    }
  }

  getDataForBarChart(){
    this.dataFromServiceForBarChart = this.dashboardBeanService.getDataIncomesBarChart();
  }

  getDataForIncomes(){
    this.incomesData = this.dashboardBeanService.getDataIncomesTab();
  }

  dataForIncomesBarChart(){
    this.dataFromServiceForBarChart.forEach( element => {
      this.amountsBarChart.push( element.amount );
      this.labelsBarChart.push( element.label );
    });
  }
}
