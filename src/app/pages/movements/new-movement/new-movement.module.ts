import { NgModule } from                '@angular/core';
import { CommonModule } from            '@angular/common';
import { ReactiveFormsModule } from     '@angular/forms';

import { MovementModule } from          '../components/movement/movement.module';

import { NewMovementComponent } from    './new-movement/new-movement.component';
import { NewMovementsRoutes } from      './new-movement.routes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovementModule,
    NewMovementsRoutes
  ],
  declarations: [
    NewMovementComponent,
  ],
})
export class NewMovementModule { }
