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
  @ViewChild('collapsible') elemCollapsible: ElementRef;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const instanceSidenav = new M.Sidenav(this.elemSidenav.nativeElement, {});
    const instancesCollapsible = new M.Collapsible(this.elemCollapsible.nativeElement, {});
  }

  // logout() {
  //   sessionStorage.removeItem('access-token');
  //   sessionStorage.removeItem('id-user');
  //   sessionStorage.removeItem('refresh-token');
  //   this.router.navigate(['/access/login']);
  // }
}
