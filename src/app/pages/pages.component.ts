import { Component, OnInit } from '@angular/core';

import { AuthService } from       '@services/auth/auth.service';
import { ToastService } from      '@services/toast/toast.service';

import { retry } from             'rxjs/operators';
import * as M from                'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.authService.personalInfo()
    .pipe(
      retry(2)
    )
    .subscribe(
      res => res,
      err => {
        if (err.status === 0) {
          this.toastService.toastCode0();
        }
        if (err.status === 401) {
          this.toastService.toastCode401();
        }
        if (err.status === 500) {
          this.toastService.toastCode500();
        }
      },
      () => {}
    );
  }
}
