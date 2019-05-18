import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { BackButtonModule } from '@components/back-button/back-button.module';

import { DateApiService } from '@services/date-api/date-api.service';
import { UserManualAccountsModule } from '@components/user-manual-accounts/user-manual-accounts.module';

import {DetailMovementRoutes} from './detail-movement.route';

import { DateModule } from '../date/date.module';
import {DetailMovementComponent} from './component/detail-movement.component';

@NgModule({
  declarations: [
    DetailMovementComponent
  ],
  imports: [
    SharedModule,
    DateModule,
    BackButtonModule,
    UserManualAccountsModule,
    DetailMovementRoutes
  ],
  providers: [
    DateApiService
  ]
})
export class DetailMovementModule { }

