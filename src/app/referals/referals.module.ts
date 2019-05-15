import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialMediaModule } from '@components/social-media-button/social-media.module';
import { SignupService } from '@services/signup/signup.service';

// ROUTE
import { REFERALS_ROUTES } from './referals.route';

// COMPONENT
import { ReferalsComponent } from './components/referals.component';
import { SharedModule } from '@shared/shared.module';
import { SvgIconsModule } from '@app/svg/svg-icons.module';

@NgModule({
	imports: [ SharedModule, SocialMediaModule, ReactiveFormsModule, SvgIconsModule, REFERALS_ROUTES ],
	declarations: [ ReferalsComponent ],
	providers: [ SignupService ]
})
export class ReferalsModule {}
