import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { RouterModule } from               '@angular/router';

import { MaterializeModule } from          './materialize/materialize.module';
import { SocialMediaComponent } from       '@shared/social-media-button/social-media.component';

import { NavbarComponent } from            './navbar/navbar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [
    NavbarComponent,
    SocialMediaComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterializeModule,
    NavbarComponent,
    SocialMediaComponent
  ]
})
export class SharedModule { }
