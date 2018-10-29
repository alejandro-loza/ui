import { NgModule } from             '@angular/core';
import { CommonModule } from         '@angular/common';

import { WelcomeComponent } from     './components/welcome.component';
import { WelcomeRoutes } from        './welcome.routes';
import { MzSpinnerModule } from 'ngx-materialize'

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutes,
    MzSpinnerModule
  ],
  declarations: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
