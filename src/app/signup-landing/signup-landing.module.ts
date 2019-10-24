import { NgModule } from '@angular/core';
import { SignupLandingComponent } from "./components/signup-landing.component";
import { SIGNUP_LANDING_ROUTES } from "./signup-landing.route";

import { SharedModule } from "@shared/shared.module";
import { SvgIconsModule } from '@app/svg/svg-icons.module';
import { SignupFormComponent } from './signup-form/component/signup-form.component';
import { SocialMediaModule } from '@components/social-media-button/social-media.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [SignupLandingComponent, SignupFormComponent],
    imports: [SharedModule, SvgIconsModule, SocialMediaModule, ReactiveFormsModule, SIGNUP_LANDING_ROUTES],
    exports: [],
    providers: [],
})
export class SignupLandingModule { }