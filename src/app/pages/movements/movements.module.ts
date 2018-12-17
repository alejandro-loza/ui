import { NgModule } from                           '@angular/core';
import { FormsModule } from                        '@angular/forms';

import { MovementModule } from                     './components/movement/movement.module';
import { SharedModule } from                       '@shared/shared.module';

import { MovementsRoutes } from                    './movements.route';

import { MovementsComponent } from                 './components/movements.component';
import { NewMovementComponent } from               './components/new-movement/new-movement.component';
import { MovementDetailComponent } from            './components/movement-detail/movement-detail.component';
import { ParamsService } from                      '@services/movements/params/params.service';
import { ParamsComponent } from './components/params/params.component';


@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    MovementModule,
    MovementsRoutes,
  ],
  declarations: [
    MovementsComponent,
    NewMovementComponent,
    MovementDetailComponent,
    ParamsComponent,
  ],
  providers: [
    ParamsService
  ]
})
export class MovementsModule { }
