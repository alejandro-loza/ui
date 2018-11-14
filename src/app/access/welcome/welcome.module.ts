import { NgModule } from             '@angular/core';
import { CommonModule } from         '@angular/common';

import { WelcomeComponent } from     './components/welcome.component';
import { WelcomeRoutes } from        './welcome.routes';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutes,
  ],
  declarations: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
