import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monto',
  templateUrl: './monto.component.html',
  styleUrls: ['./monto.component.css']
})
export class MontoComponent implements OnInit {
  @Input() amount: number;
  constructor() { }

  ngOnInit() {
  }

}
