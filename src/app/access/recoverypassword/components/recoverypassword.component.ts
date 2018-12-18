import { Component, OnInit } from               '@angular/core';
import { FormControl, FormGroup } from          '@angular/forms';
import { ActivatedRoute, Router, Params } from  '@angular/router';
import { PasswordResetRequest } from            '@shared/dto/recoveryPasswordRequestDto.ts';
import { PasswordService } from                 '@services/password/password.service';
import * as M from                              'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.css'],
  providers: [ PasswordService ]
})

export class RecoverypasswordComponent implements OnInit {

  passwordReset:PasswordResetRequest;
  recoveryPasswordGroup = new FormGroup({
    password : new FormControl(),
    passwordConfirm : new FormControl()
  });
  showErrorMessage:boolean = false;
  invalidToken:boolean = false;
  successCode:string = "forgotPasswordService_setNewPassword_success";
  failedProcess:boolean = false;

  constructor( private router: Router, private activated: ActivatedRoute,
               private passwordService: PasswordService ) {
    this.passwordReset = new PasswordResetRequest();
   }

  ngOnInit() {
    this.activated.params.subscribe( params => {
      this.passwordReset.token = params.token;
    });
    this.validateEmail();
  }

  validateEmail(){
    this.passwordService.validateToken( this.passwordReset.token ).subscribe( res => {
     !res['email'] ? this.invalidToken = true : this.passwordReset.email = res['email']
    });
  } 

  onSubmit(){
    this.passwordReset.password = this.recoveryPasswordGroup.value.password;
    this.passwordReset.passwordConfirmation = this.recoveryPasswordGroup.value.passwordConfirm;

    if( this.validatePasswords() ){
      this.passwordService.resetPassword( this.passwordReset ).subscribe( res => {
        if (res['code'] == this.successCode) {
          this.router.navigate(['/access']);
          M.toast({
            html: 'Cambio de contraseña exitoso',
            displayLength: 1500
          });
        } else{ this.failedProcess = true; }
      });
    }
  }

  validatePasswords(){
    let password = this.recoveryPasswordGroup.value.password;
    let passwordConfirm = this.recoveryPasswordGroup.value.passwordConfirm;

    if( password == passwordConfirm ){
      return true;
    } else {
      this.showErrorMessage = true;
    }

  }
}
