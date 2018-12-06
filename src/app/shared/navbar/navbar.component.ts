import { Component,
         OnInit,
         ViewChild,
         ElementRef, 
         AfterContentInit} from              '@angular/core';
import { Router } from                  '@angular/router';
import * as M from                      'materialize-css/dist/js/materialize';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentInit{
  @ViewChild('sidenav') elemSidenav: ElementRef;
  @ViewChild('collapsible') elemCollapsible: ElementRef;
  @ViewChild('chevronRight') elemIcon: ElementRef;
  value: boolean;


  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() { }

  ngAfterContentInit() {
    const initSidenav = new M.Sidenav(this.elemSidenav.nativeElement, {
      onOpenStart: () => {
        this.renderer.setStyle(this.elemSidenav.nativeElement, 'width', '128px');
      }
    });
    const initCollapsible = new M.Collapsible(this.elemCollapsible.nativeElement, {});
  }

  iconCollapsible() {
    this.renderer.listen(this.elemCollapsible.nativeElement, 'click', () => {
      console.log('Hiciste click');
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/access/login']);
  }

  showValue(flag: boolean) {
    this.value = flag;
  }
}
