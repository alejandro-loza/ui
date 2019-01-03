import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordService } from '@services/password/password.service';

// ROUTE
import { FORGOT_PASS_ROUTES } from './forgotpassword.route';

// COMPONENT
import { ForgotpasswordComponent } from './components/forgotpassword.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FORGOT_PASS_ROUTES,
  ],
  declarations: [
    ForgotpasswordComponent
  ],
  providers: [ PasswordService ]
})
export class ForgotpasswordModule { 
}
