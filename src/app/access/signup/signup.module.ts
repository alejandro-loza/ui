import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialMediaModule } from   '@components/social-media-button/social-media.module';

// ROUTE
import { SIGNUP_ROUTES } from './signup.route';

// COMPONENT
import { SignupComponent } from './components/signup.component';
import { SharedModule } from    '@shared/shared.module';
import {SvgIconsModule} from '@app/svg/svg-icons.module';

@NgModule({
  imports: [
    SharedModule,
    SocialMediaModule,
    ReactiveFormsModule,
    SvgIconsModule,
    SIGNUP_ROUTES,
  ],
  declarations: [
    SignupComponent
  ],
  providers:[ ]
})
export class SignupModule { }
