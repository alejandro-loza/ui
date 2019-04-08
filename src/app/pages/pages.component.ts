import { Component, OnInit } from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {CleanerService} from "@services/cleaner/cleaner.service";
import {ConfigService} from "@services/config/config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  constructor(
    private cleanerService: CleanerService,
    private configService: ConfigService,
    private router: Router,
    private idle: Idle,
  ) {
    // sets an idle timeout of 1 seconds, for testing purposes.
    idle.setIdle(1);
    // sets a timeout period of 899 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(899);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onTimeout.subscribe(() => {
      this.cleanerService.cleanAllVariables();
      this.configService.resetVariable();
      return this.router.navigate(['/']);
    });
    this.reset();
  }
  ngOnInit() { }

  reset() {
    this.idle.watch();
  }
}
