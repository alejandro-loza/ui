import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SaveMovementModule } from './save-movement/save-movement.module';
import { DeleteMovementModule } from './delete-movement/delete-movement.module';
import { CancelMovementModule } from './cancel-movement/cancel-movement.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, SaveMovementModule, DeleteMovementModule, CancelMovementModule],
  exports: [SaveMovementModule, DeleteMovementModule, CancelMovementModule],
  providers: []
})
export class ButtonsMovementModule {}
