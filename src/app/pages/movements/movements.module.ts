import { NgModule } from                           '@angular/core';
import { FormsModule } from                        '@angular/forms';

import { ParamsService } from                      '@services/movements/params/params.service';
import { MovementsService } from                   '@services/movements/movements.service';

import { SharedModule } from                       '@shared/shared.module';
import { MovementModule } from                     './components/movement/movement.module';
import { CategoryModule } from                     '../categories/component/category/category.module';
import { MovementsRoutes } from                    './movements.route';

import { MovementsComponent } from                 './components/movements.component';
import { NewMovementComponent } from               './components/new-movement/new-movement.component';
import { MovementDetailComponent } from            './components/movement-detail/movement-detail.component';
import { ParamsComponent } from                    './components/params/params.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    MovementModule,
    CategoryModule,
    MovementsRoutes,
  ],
  declarations: [
    MovementsComponent,
    NewMovementComponent,
    MovementDetailComponent,
    ParamsComponent,
  ],
  providers: [
    ParamsService,
    MovementsService
  ]
})
export class MovementsModule { }
