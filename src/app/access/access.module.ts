import { NgModule } from           '@angular/core';

import { AcessRoutes } from        '@access/access.route';

import { SharedModule } from       '@shared/shared.module';

import { SignupService } from      '@services/signup/signup.service';
import { PasswordService } from    '@services/password/password.service';
import { LoginService } from       '@services/login/login.service';

import { AccessComponent } from    '@access/access.component';

@NgModule({
  imports: [
    SharedModule,
    AcessRoutes
  ],
  declarations: [
    AccessComponent
  ],
  providers: [
    LoginService,
    SignupService,
    PasswordService
  ]
})
export class AccessModule { }
