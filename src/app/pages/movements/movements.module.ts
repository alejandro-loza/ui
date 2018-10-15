import { NgModule } from             '@angular/core';
import { SharedModule } from         '@shared/shared.module';

import { MovementsRoutes } from      './movements.route';

import { MovementsComponent } from   './components/movements.component';
import { MovementComponent } from    '@components/movement/movement.component';

@NgModule({
  imports: [
    SharedModule,
    MovementsRoutes
  ],
  declarations: [ 
    MovementsComponent,
    MovementComponent
  ]
})
export class MovementsModule { }
