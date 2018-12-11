import { NgModule } from                           '@angular/core';
import { FormsModule } from                        '@angular/forms';

import { MovementModule } from                     './components/movement/movement.module';
import { SharedModule } from                       '@shared/shared.module';

import { MovementsRoutes } from                    './movements.route';

import { SpinnerComponent } from                   '@components/spinner/spinner.component';
import { MovementsComponent } from                 './components/movements.component';
import { NewMovementComponent } from               './components/new-movement/new-movement.component';
import { MovementDetailComponent } from            './components/movement-detail/movement-detail.component';
import { EditMovementComponent } from              './components/edit-movement/edit-movement.component';


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
    NewMovementComponent,
    MovementDetailComponent,
    EditMovementComponent
  ]
})
export class MovementsModule { }
