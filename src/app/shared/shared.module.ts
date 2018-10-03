import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { RouterModule } from               '@angular/router';

import { MaterializeModule } from          './materialize/materialize.module';

import { RegisterLoginComponent } from     '@components/register-login-button/register-login.component';
import { SocialMediaComponent } from       '@components/social-media-button/social-media.component';
import { NavbarComponent } from            './navbar/navbar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [
    NavbarComponent,
    RegisterLoginComponent,
    SocialMediaComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterializeModule,
    NavbarComponent,
    RegisterLoginComponent,
    SocialMediaComponent
  ]
})
export class SharedModule { }
