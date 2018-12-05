import { Component,
         OnInit,
         ViewChild,
         ElementRef } from              '@angular/core';
import { Router } from                  '@angular/router';
import * as M from                      'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') elemSidenav: ElementRef;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const instanceSidenav = new M.Sidenav(this.elemSidenav.nativeElement, {});
  }
}
