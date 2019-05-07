import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-finerio-logo',
  templateUrl: './finerio-logo.component.html',
  styleUrls: ['./finerio-logo.component.css']
})
export class FinerioLogoComponent implements OnInit {
  @Input() fillMainColor: string;
  @Input() fillAccentColor: string;
  @Input() svgClasses: string;

  constructor() { }

  ngOnInit() {
  }

}
