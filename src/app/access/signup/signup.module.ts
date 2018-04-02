import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTE
import { SIGNUP_ROUTES } from './signup.route';

// COMPONENT
import { SignupComponent } from './components/signup.component';

@NgModule({
  imports: [
    CommonModule,
    SIGNUP_ROUTES
  ],
  declarations: [
    SignupComponent
  ]
})
export class SignupModule { }
