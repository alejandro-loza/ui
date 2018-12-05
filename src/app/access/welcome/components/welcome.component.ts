import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from                    '@angular/router';
import { AuthService } from               '@services/services.index';
import * as M from                        'materialize-css/dist/js/materialize';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  buttonToast =
    ` <button class="transparent btn-flat white-text" onClick="` +
    `${M.Toast.dismissAll()}` + `var toastElement = document.querySelector('.toast');` +
    `var toastInstance = M.Toast.getInstance(toastElement);  toastInstance.dismiss();"><i class="large material-icons">close</i></button>'`;
  message: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.authService.personalInfo().subscribe(
      res => res,
      err => {
        console.error(err);
        this.message = 'Ocurrió un error al obtener tus datos';
        M.toast({
          html: this.message + this.buttonToast,
          classes: 'red accent-3'
        });
        this.router.navigate(['access/login']);
      }
    );
  }

  ngOnInit() {
    this.loading();
  }

  loading() {
    this.message = '';
    this.renderer.addClass(document.querySelector('img.logo-white'), 'hide');
    if ( isNullOrUndefined(sessionStorage.getItem('idUser')) ) {
      setTimeout( () => {
        this.router.navigate(['/app/dashboard']);
      }, 2500);
    } else {
      this.message = 'Ocurrió un error al obtener tus datos';
      M.toast({
        html: this.message + this.buttonToast,
        classes: 'red accent-3'
      });
      this.renderer.removeClass(document.querySelector('img.logo-white'), 'hide');
      this.router.navigate(['access/login']);
    }
  }

}
