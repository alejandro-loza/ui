import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialNetworksComponent } from './component/social-networks.component';
import { SocialNetworksRoutes } from './social-networks.route';

@NgModule({
  declarations: [
    SocialNetworksComponent
  ],
  imports: [
    CommonModule,
    SocialNetworksRoutes
  ]
})
export class SocialNetworksModule { }
