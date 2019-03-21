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

import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";

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
  private timedOut = false;
  value: boolean;
  titlePage: string;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private cleanerService: CleanerService,
    private configService: ConfigService,
    private idle: Idle,
  ) {
    this.getDataRoute().subscribe(res => {
      const textDOM = document.querySelector('.brand-logo');
      this.titlePage = res.title;
      if (!isNullOrUndefined(this.titlePage)) {
        textDOM.innerHTML = this.titlePage;
      }
    });

    this.idle.setIdle(890); // sets an idle timeout of 890 seconds, for testing purposes.
    this.idle.setTimeout(10); // sets a timeout period of 900 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.onTimeout.subscribe(() => {
      this.timedOut = true;
    }, err => {
      console.error(err);
    }, () => {
      this.logout();
    });
    this.idle.watch();
    this.timedOut = false;
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
