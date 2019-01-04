import { Component, OnInit } from '@angular/core';

import { AuthService } from '@services/auth/auth.service';
import { ToastService } from '@services/toast/toast.service';
import { ConfigService } from '@services/config/config.service';

import { ToastInterface } from '@interfaces/toast.interface';

import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  toastInterface: ToastInterface;
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private toastService: ToastService
  ) {
    this.toastInterface = {
      code: null,
      message: null,
      classes: null
    };
  }

  ngOnInit() {
    this.personalInfo();
  }

  personalInfo() {
    this.authService
      .personalInfo()
      .pipe(retry(2))
      .subscribe(
        res => {
          this.toastInterface.code = res.status;
        },
        err => {
          this.toastInterface.code = err.status;
          if (err.status === 0) {
            this.toastService.toastGeneral(this.toastInterface);
          }
          if (err.status === 401) {
            this.toastService.toastGeneral(this.toastInterface);
          }
          if (err.status === 500) {
            this.toastInterface.message =
              'Ocurrió un error al obtener tu información';
            this.toastService.toastGeneral(this.toastInterface);
          }
        },
        () => {}
      );
  }
}
