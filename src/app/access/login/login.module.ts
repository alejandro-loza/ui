import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// ROUTE
import { LOGIN_ROUTES } from './login.route';
// COMPONENT
import { LoginComponent } from './components/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LOGIN_ROUTES
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
