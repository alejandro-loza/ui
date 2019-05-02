import { NgModule } from             '@angular/core';
import { SharedModule } from         '@shared/shared.module';
import {SvgIconsModule} from         '@app/svg/svg-icons.module';

import { WelcomeComponent } from     './components/welcome.component';
import { WelcomeRoutes } from        './welcome.routes';

@NgModule({
  imports: [
    SharedModule,
    SvgIconsModule,
    WelcomeRoutes,
  ],
  declarations: [
    WelcomeComponent,
  ],
  providers: [ ]
})
export class WelcomeModule { }
