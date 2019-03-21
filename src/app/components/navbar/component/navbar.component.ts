import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2
} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { CleanerService } from '@services/cleaner/cleaner.service';
import {ConfigService} from '@services/config/config.service';

import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentInit {
  @ViewChild('sidenav') elemSidenav: ElementRef;
  @ViewChild('sidenavTrigger') elemSidenavtrigger: ElementRef;
  @ViewChild('chevronRight') elemIcon: ElementRef;
  sideNavInit: M.Sidenav;
  sideNavInstance: M.Sidenav;
  value: boolean;
  titlePage: string;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private cleanerService: CleanerService,
    private configService: ConfigService,
  ) {
    this.getDataRoute().subscribe(res => {
      const textDOM = document.querySelector('.brand-logo');
      this.titlePage = res.title;
      if (!isNullOrUndefined(this.titlePage)) {
        textDOM.innerHTML = this.titlePage;
      }
    });


  }

  ngOnInit() { }

  ngAfterContentInit() {
    this.sideNavInit = new M.Sidenav(this.elemSidenav.nativeElement, {});
    this.sideNavInstance = M.Sidenav.getInstance( this.elemSidenav.nativeElement );
  }

  logout() {
    this.cleanerService.cleanAllVariables();
    this.configService.resetVariable();
    this.sideNavInstance.close();
    return this.router.navigate(['/access/login']);
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
