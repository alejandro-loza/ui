import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTE
import { LOGIN_ROUTES } from './login.route';

// COMPONENT
import { LoginComponent } from './components/login.component';

@NgModule({
  imports: [
    CommonModule,
    LOGIN_ROUTES
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
