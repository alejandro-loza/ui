import { NgModule } from '@angular/core';

import { ParamsMovementsService } from '@services/movements/params-movements/params-movements.service';
import {MovementsService} from '@services/movements/movements.service';

import { SharedModule } from '@shared/shared.module';
import { ItemListModule } from './item-list/item-list.module';
import { FilterModule } from './filter/filter.module';
import { MovementsRoutes } from './movements.route';
import { EmptyStateModule } from '@components/empty-states/empty-states.module';

import { MovementsComponent } from './component/movements.component';
import { NewMovementModule } from './new-movement/new-movement.module';

@NgModule({
  imports: [
    SharedModule,
    ItemListModule,
    NewMovementModule,
    FilterModule,
    EmptyStateModule,
    MovementsRoutes,

],
  declarations: [
    MovementsComponent
  ],
  providers: [
    ParamsMovementsService
  ]
})
export class MovementsModule {}
