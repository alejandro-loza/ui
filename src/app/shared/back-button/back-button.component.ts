import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  @Input() ruta:string;

  constructor() { }

  ngOnInit() {
  }

}
