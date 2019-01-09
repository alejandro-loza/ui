import { Component, OnInit, Input } from '@angular/core';
import { PieChart } from "@interfaces/dasboardPieChart.interface";
import { BalanceChart } from '@interfaces/dashboardBalanceChart.interface';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  @Input() data:PieChart[] = [];
  @Input() dataForBalanceChart:BalanceChart[] = [];

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
  }

  selectedMonthChart( event ){
    this.data = event;
  }

}
