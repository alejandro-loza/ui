import { Injectable } from '@angular/core';
import {Movement} from '@interfaces/movement.interface';
import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';
import {DateApiService} from '@services/date-api/date-api.service';

@Injectable({
  providedIn: 'root'
})
export class EditMovementListService {
  private movementList: Movement[];
  private movement: Movement;
  private index: number;
  private dateChanged: boolean;
  constructor(
    private statefulMovementsService: StatefulMovementsService,
    private dateApiService: DateApiService,
  ) {
    this.dateChanged = false;
  }

  editMovement() {
    this.movement = this.statefulMovementsService.getMovement;
    this.movementList = this.statefulMovementsService.getMovements;

    this.movementList = this.movementList.map(movement => {
      if (movement.id === this.movement.id) {
        // toDO Se debe validar que el valor de la propiedad haya cambiado, en tal caso se crea una nueva instancia de esa propiedad.

        const currentlyDate = movement.customDate;
        const newDate = this.dateApiService.formatDateForAllBrowsers(this.movement.customDate.toString());

        if (movement.amount !== this.movement.amount) {
          movement = { ...movement, amount: this.movement.amount };
        }

        if (currentlyDate.getTime() !== newDate.getTime()) {
          movement = { ...movement, customDate: newDate };
          this.dateChanged = true;
        }

        if (movement.customDescription !== this.movement.customDescription) {
          movement = { ...movement, customDescription: this.movement.customDescription };
        }

        if (movement.duplicated !== this.movement.duplicated) {
          movement = { ...movement, duplicated: this.movement.duplicated };
        }

        if (movement.inBalance && movement.inBalance !== this.movement.inBalance) {
          movement = {...movement, inBalance: this.movement.inBalance};
        }

        if (movement.type !== this.movement.type) {
          movement = { ...movement, type: this.movement.type };
        }

        if (movement.concepts[0].category && movement.concepts[0].category.id !== this.movement.concepts[0].category.id) {
          movement.concepts[0] = { ...movement.concepts[0], category: this.movement.concepts[0].category };
        }

        if (movement.account.id !== this.movement.account.id ) {
          movement =  { ...movement, account: this.movement.account };
        }
      }
      return  movement;
    });
    (this.dateChanged) ? this.statefulMovementsService.setMovements = undefined : this.statefulMovementsService.setMovements = this.movementList;
    this.dateChanged = false;
  }

  deleteMovement() {
    this.movement = this.statefulMovementsService.getMovement;
    this.movementList = this.statefulMovementsService.getMovements;

    this.movementList = this.movementList.filter(movement => movement.id !== this.movement.id);
    this.statefulMovementsService.setMovements = this.movementList;
  }

  get getIndex(): number {
    return  this.index;
  }
}
