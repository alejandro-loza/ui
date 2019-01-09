import { Component, OnInit, Input } from '@angular/core';
import { BarChart } from '@interfaces/dashboardBarChart.interface';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  @Input() dataForChart:BarChart[] = [];
  data:any = [];
  colorOfChart:string = "a02e36";

  constructor() { }

  ngOnInit() {
  }

  selectedMonthChart( event ){
    console.log( event );
  }

}
