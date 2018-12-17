import { Component, OnInit } from '@angular/core';

import { AuthService } from       '@services/auth/auth.service';
import { ConfigService } from     '@services/config/config.service';

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
    private configservice: ConfigService
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
          const toastHTML =
          `<span>Verifica tu conexión a internet</span>
          <button class="btn-flat toast-action" onClick="
            const toastElement = document.querySelector('.toast');
            const toastInstance = M.Toast.getInstance(toastElement);
            toastInstance.dismiss();">
            <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
          </button>`;
          M.Toast.dismissAll();
          M.Toast({
            html: toastHTML,
            classes: 'teal darken-4',
            displayLength: 2000
          });
        }
        if (err.status === 401) {
          this.configservice.refreshToken();
        }
      },
      () => {}
    );
  }
}
