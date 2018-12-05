import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { ParamsMovements } from '@interfaces/paramsMovements.interface';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-movement-detail-med-and-up',
  templateUrl: './movement-detail-med-and-up.component.html',
  styleUrls: ['./movement-detail-med-and-up.component.css']
})
export class MovementDetailMedAndUpComponent implements OnInit {
  @Input() fecha: Date;
  @Input() type: string;
  @Input() name: string;
  @Input() idMovement: string;
  @Output() deleteMovementStatus: EventEmitter<boolean>;

  constructor(
    private movementService: MovementsService
  ) {
    this.deleteMovementStatus = new EventEmitter();
  }

  ngOnInit() {
  }

  deleteMovement(id: string) {
    this.movementService.deleteMovement(id).subscribe(
      res => this.deleteMovementStatus.emit(true),
      err => {
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
      });
  }

}
