import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ingreso-gasto',
  templateUrl: './ingreso-gasto.component.html',
  styleUrls: ['./ingreso-gasto.component.css']
})
export class IngresoGastoComponent implements OnInit {
  @Input() type: string;
  constructor() { }

  ngOnInit() {
  }

}
