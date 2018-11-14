import { Component, OnInit, Renderer2 } from           '@angular/core';
import { NgForm } from                      '@angular/forms';
import { Router } from                      '@angular/router';

import { AuthService } from                 '@services/services.index';
import { User } from                        '@app/shared/interfaces/authLogin.interface';
import * as M from 'materialize-css/dist/js/materialize';
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
    private renderer: Renderer2
    ) {
      this.errorMsg =  '';
  }

  ngOnInit() {
  }

  ingresar(loginForm: NgForm) {

    this.errorMsg = '';

    this.usuario.email = loginForm.value.email,
    this.usuario.password = loginForm.value.password;

    this.authService.login( this.usuario ).subscribe(
      res => {
        this.router.navigate(['/access/welcome']);
      }, err => {
        if ( err.status === 0 ) {

          this.errorMsg = 'Verifique su conexión de internet';
          M.toast({html: 'I am a toast!'});
        }
        // if ( err.status === 400 ) {
        //   this.errorMsg = 'Debes llenar los campos para <br> ingresar a la aplicación';
        //   this.toastService
        //   .show(
        //     this.errorMsg +
        //     `<button class="transparent btn-flat white-text" onClick="var toastElement = $('.toast').first()[0];
        //     var toastInstance = toastElement.M_Toast;
        //     toastInstance.remove();"><i class="large material-icons">close</i></button>`,
        //     3000, 'orange darken-2 rounded');
        // }
        // if ( err.status === 401 ) {
        //   this.errorMsg = 'Datos incorrectos. Comprueba que <br> sean correctos tus datos';
        //   this.toastService
        //   .show(
        //     this.errorMsg +
        //     `<button class="transparent btn-flat white-text" onClick="var toastElement = $('.toast').first()[0];
        //     var toastInstance = toastElement.M_Toast;
        //     toastInstance.remove();"><i class="large material-icons">close</i></button>`,
        //     3000, 'red accent-3 rounded');
        // }
      }
    );
  }
}
