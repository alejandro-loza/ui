import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {
  @Input() styleClass: string;
  constructor( private location: Location) { }

  ngOnInit() { }

  goBack() {
    this.location.back();
  }
}
