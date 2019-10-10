import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SocialMediaModule } from '@components/social-media-button/social-media.module';
import { RegisterLoginButtonModule } from '@components/register-login-button/register-login-button.module';

import { LoginRoutes } from './login.route';

import { LoginComponent } from './components/login.component';
import { PasswordDirective } from '@directives/password/password.directive';
import { SvgIconsModule } from '@app/svg/svg-icons.module';

@NgModule({
	imports: [ SharedModule, SocialMediaModule, RegisterLoginButtonModule, SvgIconsModule, LoginRoutes ],
	declarations: [ LoginComponent, PasswordDirective ],
	providers: []
})
export class LoginModule {}
