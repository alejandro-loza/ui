import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PasswordResetRequest } from '@interfaces/passwordResetRequest.interface';
import { PasswordService } from '@services/password/password.service';
import * as M from 'materialize-css/dist/js/materialize';
import { ToastService } from '@services/toast/toast.service';
import { ToastInterface } from '@interfaces/toast.interface';

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.css']
})
export class RecoverypasswordComponent implements OnInit {
  passwordReset: PasswordResetRequest;
  recoveryPasswordGroup = new FormGroup({
    password: new FormControl(),
    passwordConfirm: new FormControl()
  });
  showErrorMessage: boolean = false;
  invalidToken: boolean = false;
  failedProcess: boolean = false;

  toastInterface: ToastInterface;

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private passwordService: PasswordService,
    private toastService: ToastService
  ) {
    this.passwordReset = {
      email: null,
      password: null,
      passwordConfirmation: null,
      token: null
    };
    this.toastInterface = { classes: null, code: null, message: null };
  }

  ngOnInit() {
    this.activated.params.subscribe(params => {
      this.passwordReset.token = params.token;
    });
    this.validateEmail();
  }

  validateEmail() {
    this.passwordService
      .validateToken(this.passwordReset.token)
      .subscribe(res => {
        !res.body.email
          ? (this.invalidToken = true)
          : (this.passwordReset.email = res.body.email);
      });
  }

  onSubmit() {
    this.passwordReset.password = this.recoveryPasswordGroup.value.password;
    this.passwordReset.passwordConfirmation = this.recoveryPasswordGroup.value.passwordConfirm;
    if (
      this.passwordReset.password === this.passwordReset.passwordConfirmation
    ) {
      this.passwordService.resetPassword(this.passwordReset).subscribe(
        res => {
          M.toast({
            html: '<span>Contraseña reestablecida</span>',
            displayLength: 2500,
            classes: 'green'
          });
          this.router.navigate(['/access']);
        },
        err => {
          console.error(err);
          this.toastInterface.code = err.status;
          if (err.status === 0) {
            this.toastService.toastGeneral(this.toastInterface);
          }
          if (err.status === 400) {
            this.toastInterface.message = 'Por favor llena los campos';
            this.toastService.toastGeneral(this.toastInterface);
          }
          if (err.status === 500) {
            this.toastInterface.message =
              'Ocurrió un error al querer cambiar tu contraseña';
            this.toastService.toastGeneral(this.toastInterface);
          }
          this.failedProcess = true;
        }
      );
    } else {
      console.error('error showErrorMessage');
      this.showErrorMessage = true;
    }
  }
}
