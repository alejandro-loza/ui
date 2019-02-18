import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { ToastInterface } from '@interfaces/toast.interface';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-delete-movement',
  templateUrl: './delete-movement.component.html',
  styleUrls: ['./delete-movement.component.css']
})
export class DeleteMovementComponent implements OnInit {
  @Input() id: string;
  @Output() status: EventEmitter<boolean>;

  toastInterface: ToastInterface;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService
  ) {
    this.toastInterface = {};
    this.status = new EventEmitter();
  }

  ngOnInit() {}

  deleteMovement() {
    this.movementService.deleteMovement(this.id).subscribe(
      res => {
        this.status.emit(true);
        this.toastInterface.code = res.status;
      },
      err => {
        this.toastInterface.code = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral(this.toastInterface);
          this.deleteMovement();
        }
        if (err.status === 404) {
          this.toastInterface.message = 'No sé encontró tu movimiento';
          this.toastService.toastGeneral(this.toastInterface);
        }
        if (err.status === 500) {
          this.toastInterface.message =
            '¡Ha ocurrido un error al obterner tus movimiento!';
          this.toastService.toastGeneral(this.toastInterface);
        }
      },
      () => {
        this.toastInterface.message = 'Se borró su movimiento exitosamente';
        this.toastService.toastGeneral(this.toastInterface);
      }
    );
  }
}
