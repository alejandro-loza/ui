import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {
  @Input() styleClass: string;
  private previousUrl: string;
  private canBack: boolean;
  constructor(
    private location: Location,
    private router: Router
    ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ) .subscribe(e => {
      this.previousUrl = e.url;
    });
  }

  ngOnInit() { }

  goBack() {
    this.location.back();
  }
}
