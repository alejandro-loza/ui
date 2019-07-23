import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GoogleBadgeComponent} from '@app/svg/badges/google-badge/google-badge.component';
import {AppleBadgeComponent} from '@app/svg/badges/apple-badge/apple-badge.component';

@NgModule({
  declarations: [
    GoogleBadgeComponent,
    AppleBadgeComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GoogleBadgeComponent,
    AppleBadgeComponent,
  ]
})
export class BadgesModule { }
