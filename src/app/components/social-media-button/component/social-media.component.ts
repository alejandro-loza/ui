import { Component, OnInit, Input, isDevMode } from '@angular/core';


@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  @Input() facebookText: string;
  @Input() googleText: string;

  url: string;

  constructor( ) { }

  ngOnInit() {
    if ( isDevMode() === true ) {
      this.url = 'http://localhost:4200';
    } else {
      this.url = 'https://app.finerio.mx';
    }
  }

}
