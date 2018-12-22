import { Component,
         EventEmitter,
         Input,
         OnInit,
         Output } from             '@angular/core';

import { MovementsService } from   '@services/movements/movements.service';
import { ToastService } from       '@services/toast/toast.service';

import { ParamsMovement } from     '@interfaces/paramsMovement.interface';

import { retry } from              'rxjs/operators';

@Component({
  selector: 'app-movement-detail',
  templateUrl: './movement-detail.component.html',
  styleUrls: ['./movement-detail.component.css']
})
export class MovementDetailComponent implements OnInit {
  @Input() movement: ParamsMovement;
  @Input() flag: boolean;
  @Input() fecha: Date;
  @Input() idMovement: string;
  @Input() name: string;
  @Input() type: string;
  @Input() descriptionOriginal: any;
  @Input() dateOriginal: any;

  @Output() ingresogastoStatus: EventEmitter<string>;
  @Output() movementStatus: EventEmitter<boolean>;

  flagInfo: boolean;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService
  ) {
    this.movementStatus = new EventEmitter();
    this.ingresogastoStatus = new EventEmitter();
  }

  ngOnInit() {}

  deleteMovement(id: string) {
    this.movementService.deleteMovement(id)
    .pipe( retry(2) )
    .subscribe(
      res => this.movementStatus.emit(true),
      err => {
        if ( err.status === 401) {
          this.toastService.toastCode401();
          this.movementService.deleteMovement(id);
        }
        if ( err.status === 404) {
          this.toastService.setMessage = 'No sé encontró tu movimiento';
          this.toastService.toastCode400();
        }
        if (err.status === 500) {
          this.toastService.setMessage = 'Ocurrió un error al borrar tu movimiento';
          this.toastService.toastCode500Custom();
        }
      },
      () => {
        this.toastService.setMessage = 'Se borró su movimiento exitosamente';
        this.toastService.toastCode200();
      }
    );
  }

  ingresogastoValue(type: string) {
    this.ingresogastoStatus.emit(type.toUpperCase());
  }

  updateMovement(movement: ParamsMovement) {
    this.movementService
      .updateMovement(movement)
      .pipe(retry(2))
      .subscribe(
        res => this.movementStatus.emit(true),
        err => {
          if ( err.status === 401) {
            this.toastService.toastCode401();
            this.movementService.updateMovement(movement);
          }
          if ( err.status === 404) {
            this.toastService.setMessage = 'No sé encontró tu movimiento';
            this.toastService.toastCode400();
          }
          if (err.status === 500) {
            this.toastService.setMessage = 'Ocurrió un error al actualizar tu movimiento';
            this.toastService.toastCode500Custom();
          }
        },
        () => {
          this.toastService.setMessage = 'Se actualizó su movimiento exitosamente';
          this.toastService.toastCode200();
        }
      );
  }
}
