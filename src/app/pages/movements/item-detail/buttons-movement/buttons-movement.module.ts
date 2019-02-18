import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SaveMovementModule } from './save-movement/save-movement.module';
import { DeleteMovementModule } from './delete-movement/delete-movement.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, SaveMovementModule, DeleteMovementModule],
  exports: [SaveMovementModule, DeleteMovementModule],
  providers: []
})
export class ButtonsMovementModule {}
