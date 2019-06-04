import { NgModule } from                     '@angular/core';
import { SharedModule } from                 '@shared/shared.module';
import {SvgIconsModule} from '@app/svg/svg-icons.module';

import { SocialNetworksComponent } from      './component/social-networks.component';

import { SocialNetworksRoutes } from         './social-networks.route';

@NgModule({
  declarations: [
    SocialNetworksComponent
  ],
  imports: [
    SharedModule,
    SvgIconsModule,
    SocialNetworksRoutes
  ]
})
export class SocialNetworksModule { }
