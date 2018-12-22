import { Component,
         OnInit, } from                     '@angular/core';
import { NgForm } from                      '@angular/forms';
import { Router } from                      '@angular/router';

import { AuthService,
         ToastService } from                '@services/services.index';
import { User } from                        '@app/shared/interfaces/authLogin.interface';

import * as M from                          'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorMsg: string;
  usuario: User = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
    ) {
      this.errorMsg =  '';
  }

  ngOnInit() {
  }

  ingresar(loginForm: NgForm) {
    this.usuario.email = loginForm.value.email,
    this.usuario.password = loginForm.value.password;

    this.authService.login( this.usuario ).subscribe(
      res => {
        this.router.navigate(['/access/welcome']);
      }, err => {
        if ( err.status === 0 ) {
          this.toastService.toastCode0();
        }
        if ( err.status === 400 ) {
          this.toastService.setMessage = 'Te falto llenar un campo del formulario';
          this.toastService.setClasses = 'orange darken-2';
          this.toastService.toastCustom();
        }
        if ( err.status === 401 ) {
          this.toastService.setMessage = 'Tus datos son incorrectos, por favor verifica<br>que los hayas escrito bien';
          this.toastService.toastCode400();
        }
        if ( err.status === 500) {
          this.toastService.toastCode500();
        }
      }
    );
  }
}
