import { NgModule } from             '@angular/core';
import { SharedModule } from         '@shared/shared.module';

import { WelcomeComponent } from     './components/welcome.component';
import { WelcomeRoutes } from        './welcome.routes';

@NgModule({
  imports: [
    SharedModule,
    WelcomeRoutes,
  ],
  declarations: [
    WelcomeComponent,
  ],
  providers: [ ]
})
export class WelcomeModule { }
