import { Component, OnInit } from       '@angular/core';
import { Router } from                  '@angular/router';
import { MzMediaService } from          'ngx-materialize';
import { Observable } from              'rxjs';

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
  public lowThanLargeResolution: Observable<boolean>;
  public moreThanMediumResoultion: Observable<boolean>;

  constructor( 
      private mediaService: MzMediaService,
      private router: Router
    ) {
    this.smallResolution = this.mediaService.isActive('s');
    this.mediumResolution = this.mediaService.isActive('m');
    this.largeResolution = this.mediaService.isActive('l');
    this.xLargeResolution = this.mediaService.isActive('xl');
    this.lowThanLargeResolution = this.mediaService.isActive('lt-l');
    this.moreThanMediumResoultion = this.mediaService.isActive('gt-m');
  }

  ngOnInit() {
    this.collapsableFun();
  }


  collapsableFun() {
    const chevron = document.querySelector('#chevron');
    document.querySelector('#sidenav-collapsible').addEventListener('click', () => {
      if (document.querySelector('.collapsible-header').classList.contains('active')) {
        chevron.classList.replace('mdi-plus', 'mdi-chevron-down');
      } else {
        chevron.classList.replace('mdi-chevron-down', 'mdi-plus');
      }
    });
  }
  logout() {
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('id-user');
    sessionStorage.removeItem('refresh-token');
    this.router.navigate(['/access/login']);
  }
}
