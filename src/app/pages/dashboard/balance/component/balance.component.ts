import { Component, OnInit, Input } from '@angular/core';
import { PieChart } from "@interfaces/dasboardPieChart.interface";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  @Input() data:PieChart[];
  @Input() month:string;

  // pie
  view = [ 250, 250 ];
  showLegend = false;
  showLabels = false;
  explodeSlices = false;
  doughnut = true;
  arcWidth = 0.50;
  colorScheme = {
   domain: ['#a02e36','#7bba3a']
  };

  assetsUrl = "../../../assets/media/img/dashboard/";

  
  constructor() { }

  ngOnInit() {
    
  }

}
