import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTE
import { FORGOT_PASS_ROUTES } from './forgotpassword.route';

// COMPONENT
import { ForgotpasswordComponent } from './components/forgotpassword.component';

@NgModule({
  imports: [
    CommonModule,
    FORGOT_PASS_ROUTES
  ],
  declarations: [
    ForgotpasswordComponent
  ]
})
export class ForgotpasswordModule { 
}
