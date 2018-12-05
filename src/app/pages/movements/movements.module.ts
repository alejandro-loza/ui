import { NgModule } from                           '@angular/core';
import { FormsModule } from                '@angular/forms';
import { SharedModule } from                       '@shared/shared.module';

import { MovementModule } from                     './components/movement/movement.module';

import { MovementsRoutes } from                    './movements.route';

import { SpinnerComponent } from                   '@components/spinner/spinner.component';
import { MovementsComponent } from                 './components/movements.component';
import { MovementDetailMedAndUpComponent } from    './components/movement-detail-med-and-up/movement-detail-med-and-up.component';
import { NewMovementComponent } from               './components/new-movement/new-movement.component';


@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    MovementModule,
    MovementsRoutes,
  ],
  declarations: [
    MovementsComponent,
    SpinnerComponent,
    MovementDetailMedAndUpComponent,
    NewMovementComponent,
  ]
})
export class MovementsModule { }
