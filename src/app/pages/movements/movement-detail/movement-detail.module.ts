import { NgModule } from                 '@angular/core';
import { SharedModule } from             '@shared/shared.module';

import { MovementDetailComponent } from  './component/movement-detail.component';

import { TypeModule } from               './type/type.module';
import { ButtonsMovementModule } from    './buttons-movement/buttons-movement.module';

@NgModule({
  declarations: [
    MovementDetailComponent
  ],
  imports: [
    SharedModule,
    TypeModule,
    ButtonsMovementModule
  ],
  exports: [
    MovementDetailComponent
  ]
})
export class MovementDetailModule { }
