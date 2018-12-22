import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PasswordResetRequest } from '@shared/dto/recoveryPasswordRequestDto.ts';
import { PasswordService } from '@services/password/password.service';
import * as M from 'materialize-css/dist/js/materialize';
import { ToastService } from '@services/toast/toast.service';

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.css'],
  providers: [PasswordService]
})
export class RecoverypasswordComponent implements OnInit {
  passwordReset: PasswordResetRequest;
  recoveryPasswordGroup = new FormGroup({
    password: new FormControl(),
    passwordConfirm: new FormControl()
  });
  showErrorMessage: boolean = false;
  invalidToken: boolean = false;
  successCode: string = 'forgotPasswordService_setNewPassword_success';
  failedProcess: boolean = false;

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private passwordService: PasswordService,
    private toastService: ToastService
  ) {
    this.passwordReset = new PasswordResetRequest();
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
        !res['email']
          ? (this.invalidToken = true)
          : (this.passwordReset.email = res['email']);
      });
  }

  onSubmit() {
    this.passwordReset.password = this.recoveryPasswordGroup.value.password;
    this.passwordReset.passwordConfirmation = this.recoveryPasswordGroup.value.passwordConfirm;

    if (this.validatePasswords()) {
      this.passwordService.resetPassword(this.passwordReset).subscribe(
      res => {
      if (res['code'] === this.successCode) {
        this.toastService.setMessage = 'Cambio de contraseña exitoso';
        this.toastService.toastCode200();
        this.router.navigate(['/access']);
        } else {
          this.failedProcess = true;
        }
      }, err => {
        if ( err.status === 0 ) {
          this.toastService.toastCode0();
        }
        if ( err.status === 400 ) {
          this.toastService.setMessage = 'Te falto llenar un campo del formulario';
          this.toastService.setClasses = 'orange darken-2';
          this.toastService.toastCustom();
        }
        if ( err.status === 500) {
          this.toastService.toastCode500();
        }
      });
    }
  }

  validatePasswords() {
    let password = this.recoveryPasswordGroup.value.password;
    let passwordConfirm = this.recoveryPasswordGroup.value.passwordConfirm;

    if (password == passwordConfirm) {
      return true;
    } else {
      this.showErrorMessage = true;
    }
  }
}
