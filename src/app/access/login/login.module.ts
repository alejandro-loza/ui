import { NgModule } from                             '@angular/core';
import { FormsModule } from                          '@angular/forms';
import { HttpClientModule } from                     '@angular/common/http';
// ROUTE
import { LOGIN_ROUTES } from                         './login.route';

import { SharedModule } from                         '@shared/shared.module';

// COMPONENT
import { LoginComponent } from                       './components/login.component';
import { RegisterLoginComponent } from               '@components/register-login-button/register-login.component';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    HttpClientModule,
    LOGIN_ROUTES
  ],
  declarations: [
    LoginComponent,
    RegisterLoginComponent
  ]
})
export class LoginModule { }
