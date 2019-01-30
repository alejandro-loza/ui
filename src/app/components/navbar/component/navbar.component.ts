import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2
} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import * as M from 'materialize-css/dist/js/materialize';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentInit {
  @ViewChild('sidenav') elemSidenav: ElementRef;
  @ViewChild('sidenavTrigger') elemSidenavtrigger: ElementRef;
  @ViewChild('collapsible') elemCollapsible: ElementRef;
  @ViewChild('chevronRight') elemIcon: ElementRef;
  value: boolean;
  titlePage: string;

  constructor(private renderer: Renderer2, private router: Router) {
    this.getDataRoute().subscribe(res => {
      let textDOM = document.querySelector('.brand-logo');
      this.titlePage = res.title;
      if (!isNullOrUndefined(this.titlePage)) {
        textDOM.innerHTML = this.titlePage;
      }
    });
  }

  ngOnInit() {}

  ngAfterContentInit() {
    const initSidenav = new M.Sidenav(this.elemSidenav.nativeElement, {});
    const instanceSidenav = M.Sidenav.getInstance(
      this.elemSidenav.nativeElement
    );
    const initCollapsible = new M.Collapsible(
      this.elemCollapsible.nativeElement,
      {}
    );
  }

  logout() {
    this.router.navigate(['/access/login']);
    sessionStorage.clear();
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
