import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

// ROUTE
import { FORGOT_PASS_ROUTES } from './forgotpassword.route';

// COMPONENT
import { ForgotpasswordComponent } from './components/forgotpassword.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FORGOT_PASS_ROUTES,
  ],
  declarations: [
    ForgotpasswordComponent
  ],
  providers: [ ]
})
export class ForgotpasswordModule {
}
