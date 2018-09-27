import { Component, OnInit } from '@angular/core';
import { MzMediaService } from 'ngx-materialize';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /* Onlu the resolution indicated */
  public smallResolution: Observable<boolean>;
  public mediumResolution: Observable<boolean>;
  public largeResolution: Observable<boolean>;
  public xLargeResolution: Observable<boolean>;

  /** From 0px to MaxResolution */
  public smalltoLargeResolution: Observable<boolean>;

  constructor( private mediaService: MzMediaService ) {
    this.smallResolution = this.mediaService.isActive('s');
    this.mediumResolution = this.mediaService.isActive('m');
    this.largeResolution = this.mediaService.isActive('l');
    this.xLargeResolution = this.mediaService.isActive('xl');
    this.smalltoLargeResolution = this.mediaService.isActive('lt-l');
  }

  ngOnInit() {
  }
}
