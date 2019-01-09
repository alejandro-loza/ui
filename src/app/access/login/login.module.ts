import { NgModule } from                             '@angular/core';
import { FormsModule } from                          '@angular/forms';
import { HttpClientModule } from                     '@angular/common/http';

import { SharedModule } from                         '@shared/shared.module';
import { AuthService } from                          '@services/auth/auth.service';
import { ServicesModule } from                       '@services/services.module';

import { LoginRoutes } from                          './login.route';

import { RegisterLoginComponent } from               '@components/register-login-button/register-login.component';
import { LoginComponent } from                       './components/login.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    HttpClientModule,
    ServicesModule,
    LoginRoutes
  ],
  declarations: [
    LoginComponent,
    RegisterLoginComponent
  ],
  providers: [
    AuthService,
  ]
})
export class LoginModule { }
