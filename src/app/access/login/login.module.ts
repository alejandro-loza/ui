import { NgModule } from                             '@angular/core';

import { ServicesModule } from                       '@services/services.module';
import { SharedModule } from                         '@shared/shared.module';
import { SocialMediaModule } from                    '@components/social-media-button/social-media.module';

import { AuthService } from                          '@services/auth/auth.service';

import { LoginRoutes } from                          './login.route';

import { RegisterLoginComponent } from               '@components/register-login-button/register-login.component';
import { LoginComponent } from                       './components/login.component';

@NgModule({
  imports: [
    SharedModule,
    ServicesModule,
    SocialMediaModule,
    LoginRoutes
  ],
  declarations: [
    LoginComponent,
    RegisterLoginComponent
  ],
  providers: [
    AuthService,
  ]
})
export class LoginModule { }
