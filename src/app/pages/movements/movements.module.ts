import { NgModule } from                   '@angular/core';
import { SharedModule } from               '@shared/shared.module';

import { MatExpansionModule } from         '@angular/material/expansion';
import { MovementModule } from             './components/movement/movement.module';

import { MovementsRoutes } from            './movements.route';

import { SpinnerComponent } from           '@components/spinner/spinner.component';
import { MovementsComponent } from         './components/movements.component';


@NgModule({
  imports: [
    SharedModule,
    MatExpansionModule,
    MovementModule,
    MovementsRoutes
  ],
  declarations: [
    MovementsComponent,
    SpinnerComponent
  ]
})
export class MovementsModule { }
