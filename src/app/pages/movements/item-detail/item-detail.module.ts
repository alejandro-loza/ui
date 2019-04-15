import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { TypeModule } from './type/type.module';
import { ButtonsMovementModule } from './buttons-movement/buttons-movement.module';

import { ItemDetailComponent } from './component/item-detail.component';

@NgModule({
  declarations: [
    ItemDetailComponent
  ],
  imports: [
    SharedModule,
    TypeModule,
    ButtonsMovementModule
  ],
  exports: [
    ItemDetailComponent
  ],
  providers: [],
})
export class ItemDetailModule {}
