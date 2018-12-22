import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from                    '@angular/router';
import { AuthService } from               '@services/auth/auth.service';
import { ToastService } from              '@services/toast/toast.service';
import * as M from                        'materialize-css/dist/js/materialize';
import { isNullOrUndefined } from         'util';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    private toastService: ToastService
  ) {
    this.authService.personalInfo().subscribe(
      res => {
        if ( res.accountLocked === true ) {
          this.toastService.setMessage = 'Tu cuenta está bloqueada. Si es un error,<br>por favor ponte en contacto con nosotros';
          this.toastService.setClasses = 'red darken-4';
          this.toastService.setDisplayLength = 4000;
          this.toastService.toastCustom();
          this.router.navigate(['access/login']);
        }
        return res;
      },
      err => {
        this.toastService.setMessage = 'Ocurrió un error al obtener tus datos';
        this.toastService.toastCode400();
        this.router.navigate(['access/login']);
      }
    );
  }

  ngOnInit() {
    this.loading();
  }

  loading() {
    this.renderer.addClass(document.querySelector('img.logo-white'), 'hide');
    if ( isNullOrUndefined(sessionStorage.getItem('idUser')) ) {
      setTimeout( () => {
        this.router.navigate(['/app/dashboard']);
      }, 2500);
    } else {
      this.renderer.removeClass(document.querySelector('img.logo-white'), 'hide');
      this.toastService.setMessage = 'Ocurrió un error al obtener tus datos';
      this.toastService.toastCode400();
      this.router.navigate(['access/login']);
    }
  }

}
