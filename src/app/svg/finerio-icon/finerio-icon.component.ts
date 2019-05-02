import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-finerio-icon',
  templateUrl: './finerio-icon.component.html',
  styleUrls: ['./finerio-icon.component.css']
})
export class FinerioIconComponent implements OnInit {
  @Input() svgClasses: string;
  @Input() accentClasses: string;
  constructor() { }

  ngOnInit() {
  }

}
