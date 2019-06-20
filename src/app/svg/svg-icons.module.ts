import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinerioIconComponent } from './finerio-icon/finerio-icon.component';
import { FinerioLogoComponent } from './finerio-logo/finerio-logo.component';
import { FinniComponent } from './finni/finni.component';

@NgModule({
  declarations: [
    FinerioIconComponent,
    FinerioLogoComponent,
    FinniComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FinerioIconComponent,
    FinerioLogoComponent,
    FinniComponent
  ]
})
export class SvgIconsModule { }
