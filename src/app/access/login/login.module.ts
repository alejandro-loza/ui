import { NgModule } from                             '@angular/core';
import { FormsModule } from                          '@angular/forms';
import { HttpClientModule } from                     '@angular/common/http';
import { SharedModule } from                         '@shared/shared.module';

import { LoginRoutes } from                         './login.route';

import { LoginComponent } from                       './components/login.component';
import { RegisterLoginComponent } from               '@components/register-login-button/register-login.component';

import { AuthService } from                         '@services/auth/auth.service';
import { ToastService } from                        '@services/toast/toast.service';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    HttpClientModule,
    LoginRoutes
  ],
  declarations: [
    LoginComponent,
    RegisterLoginComponent
  ],
  providers: [
    AuthService,
    ToastService
  ]
})
export class LoginModule { }
