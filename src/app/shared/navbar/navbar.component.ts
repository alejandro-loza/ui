import { Component,
         OnInit,
         ViewChild,
         ElementRef } from              '@angular/core';
import { Router } from                  '@angular/router';
import * as M from                      'materialize-css/dist/js/materialize';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') elemSidenav: ElementRef;
  @ViewChild('collapsible') elemCollapsible: ElementRef;
  @ViewChild('chevronRight') elemIcon: ElementRef;
  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    const instanceSidenav = new M.Sidenav(this.elemSidenav.nativeElement, {});
    const instancesCollapsible = new M.Collapsible(this.elemCollapsible.nativeElement, {});
  }

  iconCollapsible() {
    this.renderer.selectRootElement(this.elemCollapsible).click(() => {
      this.renderer.setStyle(this.elemIcon.nativeElement, 'animation', 'rotateIcon 1s ease-in-out 0 1 normal forwards')
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/access/login']);
  }
}
