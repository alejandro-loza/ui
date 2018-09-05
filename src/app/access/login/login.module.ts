import { NgModule } from                             '@angular/core';
import { CommonModule } from                         '@angular/common';
import { FormsModule } from                          '@angular/forms';
import { HttpClientModule } from                     '@angular/common/http';
// ROUTE
import { LOGIN_ROUTES } from                         './login.route';
// COMPONENT
import { LoginComponent } from                       './components/login.component';
import { MzInputModule, MzButtonModule } from        'ngx-materialize';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MzInputModule,
    MzButtonModule,
    LOGIN_ROUTES
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
