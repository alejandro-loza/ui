import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material';
import { DeleteMovementComponent } from './component/delete-movement.component';
import { ModalDeleteMovementComponent } from './modal-delete-movement/modal-delete-movement.component';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';

@NgModule({
  declarations: [DeleteMovementComponent, ModalDeleteMovementComponent],
  imports: [CommonModule, MatDialogModule],
  providers: [MovementsService, ToastService],
  exports: [DeleteMovementComponent],
  entryComponents: [ ModalDeleteMovementComponent ]
})
export class DeleteMovementModule {}
