import { Component,
         OnInit, } from                     '@angular/core';
import { NgForm } from                      '@angular/forms';
import { Router } from                      '@angular/router';

import { AuthService } from                 '@services/auth/auth.service';
import { ToastService } from                '@services/toast/toast.service';

import { LoginInterface } from                        '@interfaces/authLogin.interface';
import { ToastInterface } from              '@interfaces/toast.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorMsg: string;
  user: LoginInterface;
  toastInterface: ToastInterface;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
    ) {
      this.errorMsg =  '';
      this.user = { email: '', password: '' };
      this.toastInterface = { code: 0, message: null, classes: null };
  }

  ngOnInit() { }

  ingresar(loginForm: NgForm) {
    this.user.email = loginForm.value.email,
    this.user.password = loginForm.value.password;

    this.authService.login( this.user ).subscribe(
      res => {
        this.router.navigate(['/access/welcome']);
      }, err => {
        this.toastInterface.code = err.status;
        if ( err.status === 0 ) {
          this.toastService.toastGeneral(this.toastInterface);
        }
        if ( err.status === 400 ) {
          this.toastInterface.message = 'Te falto llenar un campo del formulario';
          this.toastService.toastGeneral(this.toastInterface);
        }
        if ( err.status === 401 ) {
          this.toastInterface.code = 4011;
          this.toastService.toastGeneral(this.toastInterface);
        }
        if ( err.status === 500) {
          this.toastInterface.message = 'Ocurrió un error al querer ingresar.<br>Intentalo más tarde';
          this.toastService.toastGeneral(this.toastInterface);
        }
      }
    );
  }
}
