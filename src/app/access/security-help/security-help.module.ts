import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityHelpComponent } from './components/security-help.component';
import {SecurityHelpRoutes} from   './security-help.route';
import {SecuritySvgModule} from '@access/security-help/svg/security-svg.module';
import {SecurityHelpAnimationComponent} from '@animations/security-help-animation/security-help-animation.component';

@NgModule({
  declarations: [
    SecurityHelpComponent,
    SecurityHelpAnimationComponent
  ],
  imports: [
    CommonModule,
    SecuritySvgModule,
    SecurityHelpRoutes
  ]
})
export class SecurityHelpModule { }
