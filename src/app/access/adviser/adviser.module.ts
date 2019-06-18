import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviserComponent } from './component/adviser.component';
import {AdviserRoutes} from '@access/adviser/adviser.route';
import {SharedModule} from '@shared/shared.module';
import {SvgIconsModule} from '@app/svg/svg-icons.module';

@NgModule({
  declarations: [AdviserComponent],
  imports: [
    CommonModule,
    SharedModule,
    SvgIconsModule,
    AdviserRoutes
  ]
})
export class AdviserModule { }
