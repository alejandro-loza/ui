import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { RouterModule } from               '@angular/router';

import { MaterializeModule } from          './materialize/materialize.module';
import { SocialMediaComponent } from       '../components/social-media-button/social-media.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [ SocialMediaComponent ],
  exports: [
    CommonModule,
    RouterModule,
    MaterializeModule,
    SocialMediaComponent
  ]
})
export class SharedModule { }
