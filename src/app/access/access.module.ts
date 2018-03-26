import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ACCESS_ROUTES } from './access.route';

import { AccessComponent } from './access.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RecoverypasswordComponent } from './recoverypassword/recoverypassword.component';



@NgModule({
  declarations: [
    AccessComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    RecoverypasswordComponent
  ],
  imports: [
    CommonModule,
    ACCESS_ROUTES
  ]
})
export class AccessModule { }
