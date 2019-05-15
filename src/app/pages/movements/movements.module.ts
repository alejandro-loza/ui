import { NgModule } from '@angular/core';

import { ParamsMovementsService } from '@services/movements/params-movements/params-movements.service';

import { SharedModule } from '@shared/shared.module';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { ItemListModule } from './item-list/item-list.module';
import { FilterModule } from './filter/filter.module';
import { MovementsRoutes } from './movements.route';
import { EmptyStateModule } from '@components/empty-states/empty-states.module';

import { MovementsComponent } from './component/movements.component';
import {StateMovementsService} from '@services/movements/state-movements/state-movements.service';

@NgModule({
  imports: [ SharedModule, ItemListModule, BackButtonModule, FilterModule, EmptyStateModule, MovementsRoutes ],
  declarations: [ MovementsComponent ],
  providers: [ ParamsMovementsService, StateMovementsService ]
})
export class MovementsModule {}
