import { NgModule } from             '@angular/core';
import { SharedModule } from         '@shared/shared.module';

import { WelcomeComponent } from     './components/welcome.component';
import { WelcomeRoutes } from        './welcome.routes';
import { AuthService } from          '@services/auth/auth.service';


@NgModule({
  imports: [
    SharedModule,
    WelcomeRoutes,
  ],
  declarations: [
    WelcomeComponent,
  ],
  providers: [
    AuthService,
  ]
})
export class WelcomeModule { }
