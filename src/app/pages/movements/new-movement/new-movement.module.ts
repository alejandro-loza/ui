import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { TypeModule } from '../item-detail/type/type.module';

import { DateApiService } from '@services/date-api/date-api.service';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { UserManualAccountsModule } from '@components/user-manual-accounts/user-manual-accounts.module';

import { NEW_MOVEMENT_ROUTER } from './new-movement.route';

import { NewMovementComponent } from './component/new-movement.component';
import { DateModule } from '../date/date.module';

@NgModule({
	declarations: [ NewMovementComponent ],
	imports: [ NEW_MOVEMENT_ROUTER, SharedModule, DateModule, TypeModule, BackButtonModule, UserManualAccountsModule ],
	exports: [ NewMovementComponent ],
	providers: [ DateApiService, MovementsService, ToastService ]
})
export class NewMovementModule {}
