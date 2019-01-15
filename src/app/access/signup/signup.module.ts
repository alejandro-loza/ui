import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialMediaModule } from   '@components/social-media-button/social-media.module';

// ROUTE
import { SIGNUP_ROUTES } from './signup.route';

// COMPONENT
import { SignupComponent } from './components/signup.component';
import { SharedModule } from    '@shared/shared.module';

// Service
import { SignupService } from   '@services/signup/signup.service';

@NgModule({
  imports: [
    SharedModule,
    SocialMediaModule,
    ReactiveFormsModule,
    SIGNUP_ROUTES,
  ],
  declarations: [
    SignupComponent
  ],
  providers:[ SignupService ]
})
export class SignupModule { }
