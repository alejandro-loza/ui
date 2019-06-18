import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNameComponent } from './component/user-name.component';
import {UserNameRoutes} from '@app/first-steps/user-name/user-name.route';
import {SvgIconsModule} from '@app/svg/svg-icons.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    UserNameComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SvgIconsModule,
    UserNameRoutes
  ]
})
export class UserNameModule { }
