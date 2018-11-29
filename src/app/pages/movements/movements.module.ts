import { NgModule } from                           '@angular/core';
import { ReactiveFormsModule } from                '@angular/forms';
import { SharedModule } from                       '@shared/shared.module';

import { MovementModule } from                     './components/movement/movement.module';

import { MovementsRoutes } from                    './movements.route';

import { SpinnerComponent } from                   '@components/spinner/spinner.component';
import { MovementsComponent } from                 './components/movements.component';
import { MovementDetailMedAndUpComponent } from    './components/movement-detail-med-and-up/movement-detail-med-and-up.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    MovementModule,
    MovementsRoutes,
  ],
  declarations: [
    MovementsComponent,
    SpinnerComponent,
    MovementDetailMedAndUpComponent,
  ]
})
export class MovementsModule { }
