import { NgModule } from                             '@angular/core';

import { SharedModule } from                         '@shared/shared.module';
import { SocialMediaModule } from                    '@components/social-media-button/social-media.module';
import { RegisterLoginButtonModule } from            '@components/register-login-button/register-login-button.module';

import { LoginRoutes } from                          './login.route';

import { LoginComponent } from                       './components/login.component';

@NgModule({
  imports: [
    SharedModule,
    SocialMediaModule,
    RegisterLoginButtonModule,
    LoginRoutes
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule { }
