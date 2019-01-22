import { Component, OnInit, Input } from '@angular/core';
import { PieChart } from "@interfaces/dasboardPieChart.interface";
import { BalanceChart } from '@interfaces/dashboardBalanceChart.interface';
import { DataForCharts } from '@interfaces/dataExpensesComponent.interface';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  dataForBalanceChart:BalanceChart[] = [];
  dataPieChart:any[] = [];

  titleMonth:string;
  titleYear:string;
  formatedData:DataForCharts[] = [];
  typeOfAmount:string = "";
  totalAmount:number = 0;

  // pie
  view = [ 270, 270 ];
  showLegend = false;
  showLabels = false;
  explodeSlices = false;
  doughnut = true;
  arcWidth = 0.50;
  colorScheme = {
   domain: ['#a02e36','#7bba3a']
  };
  assetsUrl = "../../../assets/media/img/dashboard/";

  constructor( ) { }

  ngOnInit() {
    this.getFirstData();
  }

  getFirstData(){
    this.titleMonth = "";
    this.titleYear = "";

    this.dataForBalanceChart = JSON.parse( sessionStorage.getItem("balanceData") );
    this.titleMonth = this.dataForBalanceChart[ this.dataForBalanceChart.length - 1].name;

    this.formatedData = JSON.parse( sessionStorage.getItem("formatedData") );
    let year = new Date( this.formatedData[0].referenceDate );
    this.titleYear = year.getFullYear().toString();

    this.dataPieChart = this.dataForBalanceChart[  this.dataForBalanceChart.length - 1 ].series;
    this.setTextBellowChart( this.titleMonth );

    let titleOfThePage = document.querySelector(".brand-logo");
    titleOfThePage.innerHTML = "Resumen "+ this.titleMonth + " "+ this.titleYear;
  }

  setTextBellowChart( month ){
    this.typeOfAmount = "";
    this.totalAmount = 0;

    this.dataForBalanceChart.forEach( element => {
      if( month == element.name ){
        if( element.series[1].value != 0 ){
          this.typeOfAmount = "Ahorro"
          this.totalAmount = element.series[1].value;
        } else {
          this.typeOfAmount = "Gasto"
          this.totalAmount = element.series[0].value;
        }
      }
    });
    let titleOfThePage = document.querySelector(".brand-logo");
    titleOfThePage.innerHTML = "Resumen "+ this.titleMonth + " "+ this.titleYear;
  }

  // EVENTO PARA CAMBIO DE DATA EN EL PIE Y TABLA
  selectedMonthChart( event ){
    this.dataPieChart = event;
  }

  indexMonthSelected( event ){
    this.titleMonth = "";
    this.titleYear = "";
    let months:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let dataSession = JSON.parse(sessionStorage.getItem("formatedData"));
    dataSession.forEach( element => {
      let date = new Date( element.referenceDate );

      if( date.getMonth() == event ){
        this.titleMonth = months[ event ];
        this.titleYear = date.getFullYear().toString();

        this.setTextBellowChart( this.titleMonth );
      }
    });
  }

}
