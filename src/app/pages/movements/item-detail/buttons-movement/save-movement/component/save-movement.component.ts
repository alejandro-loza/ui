import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { retry } from 'rxjs/operators';
import { ToastInterface } from '@interfaces/toast.interface';
import { ParamsMovement } from '@interfaces/paramsMovement.interface';

@Component({
  selector: 'app-save-movement',
  templateUrl: './save-movement.component.html',
  styleUrls: ['./save-movement.component.css']
})
export class SaveMovementComponent implements OnInit {
  @Input() movement: ParamsMovement;
  @Output() status: EventEmitter<boolean>;

  toastInterface: ToastInterface;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService
  ) {
    this.status = new EventEmitter();
    this.toastInterface = {};
  }

  ngOnInit() {}

  updateMovement() {
    this.movementService
      .updateMovement(this.movement)
      .pipe(retry(2))
      .subscribe(
        res => {
          this.status.emit(true);
          this.toastInterface.code = res.status;
        },
        err => {
          this.toastInterface.code = err.status;
          if (err.status === 401) {
            this.toastService.toastGeneral(this.toastInterface);
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
          this.toastInterface.message =
            'Se actualizó su movimiento exitosamente';
          this.toastService.toastGeneral(this.toastInterface);
        }
      );
  }
}
