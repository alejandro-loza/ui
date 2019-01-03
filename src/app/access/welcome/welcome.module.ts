import { NgModule } from             '@angular/core';
import { CommonModule } from         '@angular/common';

import { WelcomeComponent } from     './components/welcome.component';
import { WelcomeRoutes } from        './welcome.routes';
import { AuthService } from          '@services/services.index';


@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutes,
  ],
  declarations: [
    WelcomeComponent
  ],
  providers: [
    AuthService
  ]
})
export class WelcomeModule { }
