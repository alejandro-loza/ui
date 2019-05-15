import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinerioIconComponent } from './finerio-icon/finerio-icon.component';
import { FinerioLogoComponent } from './finerio-logo/finerio-logo.component';

@NgModule({
  declarations: [
    FinerioIconComponent,
    FinerioLogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FinerioIconComponent,
    FinerioLogoComponent
  ]
})
export class SvgIconsModule { }
