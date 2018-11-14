import { Component,
         OnInit,
         ViewChild,
         ElementRef } from              '@angular/core';
import { Router } from                  '@angular/router';
<<<<<<< Updated upstream
import * as M from                      'materialize-css/dist/js/materialize';
=======
>>>>>>> Stashed changes

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
<<<<<<< Updated upstream
  @ViewChild('sidenav') elemSidenav: ElementRef;
  constructor(
    private router: Router
  ) { }
=======
  
  constructor( private router: Router ) { }
>>>>>>> Stashed changes

  ngOnInit() {
    const instanceSidenav = new M.Sidenav(this.elemSidenav.nativeElement, {});
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
