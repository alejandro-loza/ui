import { NgModule } from                           '@angular/core';

import { ParamsService } from                      '@services/movements/params/params.service';
import { MovementsService } from                   '@services/movements/movements.service';

import { SharedModule } from                       '@shared/shared.module';
import { MovementModule } from                     './movement/movement.module';
import { FilterModule } from                       './filter/filter.module';
import { MovementsRoutes } from                    './movements.route';

import { MovementsComponent } from                 './component/movements.component';
import { NewMovementModule } from                  './new-movement/new-movement.module';


@NgModule({
  imports: [
    SharedModule,
    MovementModule,
    NewMovementModule,
    FilterModule,
    MovementsRoutes,
  ],
  declarations: [
    MovementsComponent,
  ],
  providers: [
    ParamsService,
    MovementsService
  ]
})
export class MovementsModule { }
