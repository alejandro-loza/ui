import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {
  @Input() styleClass: string;
  @Input() url: string;
  constructor( ) { }

  ngOnInit() { }

}
