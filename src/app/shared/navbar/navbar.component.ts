import { AfterContentInit,
         Component,
         ElementRef,
         OnInit,
         Renderer2,
         ViewChild,
         DoCheck, } from              '@angular/core';
import { Router } from                  '@angular/router';
import * as M from                      'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck, AfterContentInit{
  @ViewChild('sidenav') elemSidenav: ElementRef;
  @ViewChild('sidenavTrigger') elemSidenavtrigger: ElementRef;
  @ViewChild('collapsible') elemCollapsible: ElementRef;
  @ViewChild('chevronRight') elemIcon: ElementRef;
  value: boolean;


  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() { }

  ngDoCheck(): void {
    // Called every time that the input properties of a component or a directive are checked.
    // Use it to extend change detection by performing a custom check.
    // Add 'implements DoCheck' to the class.
    this.renderer.listen(this.elemSidenavtrigger.nativeElement, 'click', () => {
      this.value = true;
    });
  }

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
