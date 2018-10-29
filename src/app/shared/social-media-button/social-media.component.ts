import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  @Input() facebookText: string;
  @Input() googleText: string;

  constructor() { }

  ngOnInit() {
  }

}
