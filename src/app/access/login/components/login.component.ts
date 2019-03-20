import {
  Component,
  OnInit, Renderer2,
} from '@angular/core';
import { NgForm } from                      '@angular/forms';
import { Router } from                      '@angular/router';

import { LoginService } from                '@services/login/login.service';
import { ToastService } from                '@services/toast/toast.service';
import { ConfigService } from               '@services/config/config.service';

import { User } from                        '@interfaces/user.interface';
import { ToastInterface } from              '@interfaces/toast.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private user: User;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private loginService: LoginService,
    private configService: ConfigService,
    private toastService: ToastService
  ) {
    this.user = { };
  }

  ngOnInit() { }

  login(loginForm: NgForm) {
    this.user.email = loginForm.value.email;
    this.user.password = loginForm.value.password;
    this.renderer.addClass(document.getElementById('buttonElement'), 'disabled');
    this.renderer.setAttribute(document.getElementById('buttonElement'), 'disabled', 'disabled');

    this.loginService.login( this.user ).subscribe(
      res => res,
      err => {
        this.toastService.setCode = err.status;
        if ( err.status === 0 ) {
          this.toastService.toastGeneral();
        } else if ( err.status === 400 ) {
          this.toastService.setMessage = 'Te falto llenar un campo del formulario';
          this.toastService.toastGeneral();
        } else if ( err.status === 401 ) {
          this.toastService.setCode = 4011;
          this.toastService.toastGeneral();
        } else if ( err.status === 500) {
          this.toastService.setMessage = 'Ocurrió un error al querer ingresar.<br>Intentalo más tarde';
          this.toastService.toastGeneral();
        }
        this.renderer.removeClass(document.getElementById('buttonElement'), 'disabled');
        this.renderer.removeAttribute(document.getElementById('buttonElement'), 'disabled');

      },
      () => {
        loginForm.reset();
        return this.router.navigate(['/access/welcome']);
      }
    );
    this.renderer.removeClass(document.getElementById('Inputemail'), 'valid');
    this.renderer.removeClass(document.getElementById('Inputemail'), 'invalid');
    this.renderer.removeClass(document.getElementById('Inputpassword'), 'invalid');
    this.renderer.removeClass(document.getElementById('Inputpassword'), 'invalid');
  }
}
