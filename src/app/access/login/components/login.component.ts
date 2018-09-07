import { Component, OnInit } from           '@angular/core';
import { NgForm } from                      '@angular/forms';
import { Router } from                      '@angular/router';

import { AuthService } from                 './../../../services/services.index';
import { User } from                        '../../../shared/dto/authLoginDot';
import { MzToastService } from              'ngx-materialize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorMsg: string;

  constructor(
    private toastService: MzToastService,
    private router: Router,
    private authService: AuthService) {
      this.errorMsg =  '';
  }

  ngOnInit() {
  }

  ingresar(loginForm: NgForm) {
    this.errorMsg = '';

    const usuario = new User(
      loginForm.value.email,
      loginForm.value.password
    );

    this.authService.login( usuario ).subscribe(
      res => {
        this.router.navigate(['/app/dashboard']);
      }, err => {
        if ( err.status === 0 ) {
          this.errorMsg = 'Verifique su conexión de internet';
          this.toastService
          .show(
            this.errorMsg +
            `<button class="transparent btn-flat white-text" onClick="var toastElement = $('.toast').first()[0];
            var toastInstance = toastElement.M_Toast;
            toastInstance.remove();">X</button>`,
            3000, 'teal accent-3 black-text rounded'
          );
          console.error( 'Error.code.0', err );
        }
        if ( err.status === 400 ) {
          this.errorMsg = 'Debes llenar los campos para <br> ingresar a la aplicación';
          this.toastService
          .show(
            this.errorMsg +
            `<button class="transparent btn-flat white-text" onClick="var toastElement = $('.toast').first()[0];
            var toastInstance = toastElement.M_Toast;
            toastInstance.remove();">X</button>`,
            3000, 'orange accent-3 rounded');
          console.error( 'Error.code.400', err );
        }
        if ( err.status === 401 ) {
          this.errorMsg = 'Datos incorrectos. Comprueba que <br> sean correctos tus datos';
          this.toastService
          .show(
            this.errorMsg +
            `<button class="transparent btn-flat white-text" onClick="var toastElement = $('.toast').first()[0];
            var toastInstance = toastElement.M_Toast;
            toastInstance.remove();">X</button>`,
            3000, 'red accent-3 rounded');
          console.error( 'Error.code.401', err );
        }
      }
    );
  }
}
