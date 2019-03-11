import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CancelMovementComponent } from './component/cancel-movement.component';

@NgModule({
  declarations: [
    CancelMovementComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CancelMovementComponent
  ]
})
export class CancelMovementModule { }
