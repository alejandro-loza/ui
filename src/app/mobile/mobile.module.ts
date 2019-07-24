import { NgModule } from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import { MobileComponent } from './component/mobile.component';
import {MobileRoutes} from '@app/mobile/mobile.route';
import {SvgIconsModule} from '@app/svg/svg-icons.module';
import {BadgesModule} from '@app/svg/badges/badges.module';
import {MobileService} from '@services/mobile/mobile.service';

@NgModule({
  declarations: [
    MobileComponent
  ],
  imports: [
    SharedModule,
    SvgIconsModule,
    BadgesModule,
    MobileRoutes
  ],
  providers: [
    MobileService
  ]
})
export class MobileModule { }
