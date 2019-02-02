import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { ParamsService } from '@services/movements/params/params.service';
import { MovementsService } from '@services/movements/movements.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  status: boolean;
  filterflag: boolean;
  paramsMovements: ParamsMovements;

  constructor(
    private paramsService: ParamsService,
    private movementService: MovementsService
  ) {
    this.status = false;
    this.filterflag = false;
    this.paramsMovements = {
      charges: this.paramsService.getCharges,
      deposits: this.paramsService.getDeposits,
      duplicates: this.paramsService.getDuplicates
    };
  }

  ngOnInit() {}

  /**
   * @function statusMovement() - Esto es la función del output en los componentes. Esto es para notificar a los demás componentes
   * @param {boolean} status - La bandera que actualiza la variable status
   *
   * En esta función se le agregó un setTimeout() debido a que la comunicación entre componentes es tan rápida que manda error de que los valores
   * se han cambiado antes de ser enviados, y la única forma es enviar un estado genérico en la app ( Redux/RXJS (reduce) ) o enviando un
   * setTimeout
   */
  statusMovement(status: boolean) {
    setTimeout(() => {
      this.status = status;
      this.filterflag = false;
    }, 0);
  }

  getMovement() {
    this.movementService.getMovements().subscribe(
      res => {

      },
      err => {

      },
      () => {

      }
    );
  }
}
