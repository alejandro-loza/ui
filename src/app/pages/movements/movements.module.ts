import { NgModule } from             '@angular/core';
import { SharedModule } from         '@shared/shared.module';

import { MovementsRoutes } from      './movements.route';

import { MovementsComponent } from   './components/movements.component';

@NgModule({
  imports: [
    SharedModule,
    MovementsRoutes
  ],
  declarations: [ MovementsComponent ]
})
export class MovementsModule { }
