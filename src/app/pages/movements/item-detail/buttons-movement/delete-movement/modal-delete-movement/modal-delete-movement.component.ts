import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MovementsService} from '@services/movements/movements.service';
import {ToastService} from '@services/toast/toast.service';
import {CleanerService} from '@services/cleaner/cleaner.service';

@Component({
  selector: 'app-modal-delete-movement',
  templateUrl: './modal-delete-movement.component.html',
  styleUrls: ['./modal-delete-movement.component.css']
})
export class ModalDeleteMovementComponent implements OnInit {
  private id: string;
  constructor(
    private movementService: MovementsService,
    private toastService: ToastService,
    private cleanerService: CleanerService,
    private matDialogRef: MatDialogRef<ModalDeleteMovementComponent>,
    @Inject(MAT_DIALOG_DATA) matDialogData
  ) { this.id = matDialogData.id; }

  ngOnInit() { }

  closeModal(event: Event) {
    event.stopPropagation();
    this.matDialogRef.close(false);
  }

  deleteMovement() {
    this.movementService.deleteMovement(this.id).subscribe(
      (res) => {
        this.toastService.setCode = res.status;
      },
      (err) => {
        this.toastService.setCode = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral();
          this.deleteMovement();
        }
        if (err.status === 404) {
          this.toastService.setMessage = 'No sé encontró tu movimiento';
          this.toastService.toastGeneral();
        }
        if (err.status === 500) {
          this.toastService.setMessage = '¡Ha ocurrido un error al obtener tus movimientos!';
          this.toastService.toastGeneral();
        }
      },
      () => {
        this.cleanerService.cleanDashboardVariables();
        this.cleanerService.cleanBudgetsVariables();
        this.matDialogRef.close(true);
        this.toastService.setMessage =  'Se borró tu movimiento exitosamente';
        this.toastService.toastGeneral();
      }
    );
  }
}
