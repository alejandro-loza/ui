import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { MovementsService } from "@services/movements/movements.service";
import { ToastService } from "@services/toast/toast.service";

import { ParamsMovement } from "@interfaces/paramsMovement.interface";
import { ToastInterface } from "@interfaces/toast.interface";

import { retry } from "rxjs/operators";

@Component({
  selector: "app-movement-detail",
  templateUrl: "./movement-detail.component.html",
  styleUrls: ["./movement-detail.component.css"]
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
  @Output() status: EventEmitter<boolean>;

  flagInfo: boolean;

  toastInterface: ToastInterface;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService
  ) {
    this.status = new EventEmitter();
    this.ingresogastoStatus = new EventEmitter();
    this.toastInterface = { code: null, classes: null, message: null };
    this.flagInfo = false;
  }

  ngOnInit() {}

  ingresogastoValue(type: string) {
    this.ingresogastoStatus.emit(type.toUpperCase());
  }

  updateMovement(movement: ParamsMovement) {
    this.movementService
      .updateMovement(movement)
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
          } else if (err.status === 404) {
            this.toastInterface.message = "No sé encontró tu movimiento";
            this.toastService.toastGeneral(this.toastInterface);
          } else if (err.status === 500) {
            this.toastInterface.message =
              "¡Ha ocurrido un error al obterner tus movimiento!";
            this.toastService.toastGeneral(this.toastInterface);
          }
        },
        () => {
          this.toastInterface.message = "Se editó su movimiento exitosamente";
          this.toastService.toastGeneral(this.toastInterface);
        }
      );
  }

}
