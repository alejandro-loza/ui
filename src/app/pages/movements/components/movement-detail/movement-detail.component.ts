import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MovementsService } from '@services/movements/movements.service';

import { ParamsMovement } from '@interfaces/paramsMovement.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { retry } from 'rxjs/operators';

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

  constructor(private movementService: MovementsService) {
    this.movementStatus = new EventEmitter();
    this.ingresogastoStatus = new EventEmitter();
  }

  ngOnInit() {}

  deleteMovement(id: string) {
    this.movementService.deleteMovement(id).subscribe(
      res => this.movementStatus.emit(true),
      err => {
        if (err.status === 500) {
          M.toast({
            html: `
            <span>Ocurrió un error al borrar tu movimiento</span>
            <button
              class="btn-flat toast-action"
              onClick="
              const toastElement = document.querySelector('.toast');
              const toastInstance = M.Toast.getInstance(toastElement);
              toastInstance.dismiss();">
              <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
            </button>`,
            classes: 'red darken-3 grey-text text-lighten-5'
          });
        }
      },
      () => {
        M.toast({
          html: `
          <span>Se borró su movimiento exitosamente</span>
          <button
            class="btn-flat toast-action"
            onClick="
            const toastElement = document.querySelector('.toast');
            const toastInstance = M.Toast.getInstance(toastElement);
            toastInstance.dismiss();">
            <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
          </button>`,
          classes: 'grey darken-2 grey-text text-lighten-5'
        });
      }
    );
  }

  ingresogastoValue(type: string) {
    this.ingresogastoStatus.emit(type.toUpperCase());
  }

  updateMovement(movement: ParamsMovement) {
    console.log(movement);
    this.movementService
      .updateMovement(movement)
      .pipe(retry(2))
      .subscribe(
        res => this.movementStatus.emit(true),
        err => {
          if (err.status === 500) {
            M.toast({
              html: `
              <span>Ocurrió un error al borrar tu movimiento</span>
              <button
                class="btn-flat toast-action"
                onClick="
                const toastElement = document.querySelector('.toast');
                const toastInstance = M.Toast.getInstance(toastElement);
                toastInstance.dismiss();">
                <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
              </button>`,
              classes: 'red darken-3 grey-text text-lighten-5'
            });
          }
        },
        () => {
          M.toast({
            html: `
            <span>Se actualizó su movimiento exitosamente</span>
            <button
              class="btn-flat toast-action"
              onClick="
              const toastElement = document.querySelector('.toast');
              const toastInstance = M.Toast.getInstance(toastElement);
              toastInstance.dismiss();">
              <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
            </button>`,
            classes: 'grey darken-2 grey-text text-lighten-5'
          });
        }
      );
  }
}
