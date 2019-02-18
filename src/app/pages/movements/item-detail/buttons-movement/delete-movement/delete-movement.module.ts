import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteMovementComponent } from './component/delete-movement.component';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';

@NgModule({
  declarations: [DeleteMovementComponent],
  imports: [CommonModule],
  providers: [MovementsService, ToastService],
  exports: [DeleteMovementComponent]
})
export class DeleteMovementModule {}
