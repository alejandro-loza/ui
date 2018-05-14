import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

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
    FormsModule,
    ACCESS_ROUTES,
    HttpClientModule
  ]
})
export class AccessModule { }
