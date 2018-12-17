import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { RouterModule } from               '@angular/router';

import { SocialMediaComponent } from       '@shared/social-media-button/social-media.component';

import { NavbarComponent } from            './navbar/navbar.component';
import { LinkComponent } from './navbar/link/link.component';
import { BackButtonComponent } from "./back-button/back-button.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    SocialMediaComponent,
    LinkComponent,
    BackButtonComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SocialMediaComponent,
    BackButtonComponent
  ]
})
export class SharedModule { }
