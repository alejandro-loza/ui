import { NgModule } from             '@angular/core';
import { SharedModule } from         '@shared/shared.module';

import { WelcomeComponent } from     './components/welcome.component';
import { WelcomeRoutes } from        './welcome.routes';
import {WelcomeAnimationComponent} from '@components/welcome-animation/welcome-animation.component';

@NgModule({
  imports: [
    SharedModule,
    WelcomeRoutes,
  ],
  declarations: [
    WelcomeComponent,
    WelcomeAnimationComponent,
  ],
  providers: [ ]
})
export class WelcomeModule { }
