import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PasswordResetRequest } from '@shared/dto/recoveryPasswordRequestDto.ts';

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.css']
})
export class RecoverypasswordComponent implements OnInit {

  constructor( ) {
    //this.passwordReset = new PasswordResetRequest();
   }

  ngOnInit() {
    ///this.passwordReset.userId = this.route.snapshot.params.id;
    //this.passwordReset.code = this.route.snapshot.params.code;
  }

  /*validatePasswords(){
    let password = this.forgotPasswordGroup.value.password;
    let passwordConfirm = this.forgotPasswordGroup.value.passwordConfirm;

    if( password == passwordConfirm ){
      return true;
    } else {
      this.showErrorMessage = true;
    }

  }*/
}
