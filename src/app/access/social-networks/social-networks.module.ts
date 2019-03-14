import { NgModule } from                     '@angular/core';
import { SharedModule } from                 '@shared/shared.module';

import { SocialNetworksComponent } from      './component/social-networks.component';

import { SocialNetworksRoutes } from         './social-networks.route';

@NgModule({
  declarations: [
    SocialNetworksComponent
  ],
  imports: [
    SharedModule,
    SocialNetworksRoutes
  ]
})
export class SocialNetworksModule { }
