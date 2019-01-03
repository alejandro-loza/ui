import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ROUTE
import { SIGNUP_ROUTES } from './signup.route';

// COMPONENT
import { SignupComponent } from './components/signup.component';
import { SharedModule } from '../../shared/shared.module';

// Service
import { SignupService } from '../../services/signup/signup.service';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    SIGNUP_ROUTES,
  ],
  declarations: [
    SignupComponent
  ],
  providers:[ SignupService ]
})
export class SignupModule { }
