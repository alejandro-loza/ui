import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { RouterModule } from               '@angular/router';
import { HttpClientModule } from           '@angular/common/http';

import { SocialMediaComponent } from       '@shared/social-media-button/social-media.component';

import { NavbarComponent } from            './navbar/navbar.component';
import { LinkComponent } from              './navbar/link/link.component';
import { BackButtonComponent } from        './back-button/back-button.component';
import { SpinnerComponent } from           './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [
    BackButtonComponent,
    LinkComponent,
    NavbarComponent,
    SocialMediaComponent,
    SpinnerComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BackButtonComponent,
    NavbarComponent,
    SocialMediaComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
