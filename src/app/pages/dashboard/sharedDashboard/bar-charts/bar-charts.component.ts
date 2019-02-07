import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Chart } from "chart.js";
import { MonthChartEvent } from '@app/interfaces/dashboard/monthChartEvent.interface';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {
  @Input() dataForChart:number[] = [];
  @Input() labels:string[] = [];
  @Output() clickEventData:EventEmitter<MonthChartEvent> = new EventEmitter();

  barChart:Chart; 

  constructor() { }

  ngOnInit() {
    this.barChartOptions();
  }

  barChartOptions(){
    let chart = document.querySelector("#barChart");
    this.barChart = new Chart(chart, {
      type: 'bar',
      data: {
          labels: this.labels,
          datasets: [{
              label: "Gastos",
              data: this.dataForChart,
              backgroundColor: "#a02e36",
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }],
              xAxes: [{
                gridLines: {
                  display: false,
                },
              }]
          },
          responsive:true,
          legend: { display: false },
          events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
          onClick: ( evt, item ) => {
            if( item.length != 0 ){
                this.clickEvent( item );
              }
          }
      }
    });
  }

  clickEvent( item ){
    let auxEmit:MonthChartEvent;
    if( !isNullOrUndefined(item[0]._model)){
      let label = item[0]._model.label;
      let index = item[0]._index;
      auxEmit = { label:label, index:index };
      this.clickEventData.emit( auxEmit );
    }
  } 

}
