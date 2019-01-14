import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  @Input() account: string;
  constructor() { }

  ngOnInit() {
  }

}
