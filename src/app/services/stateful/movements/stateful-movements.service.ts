import { Injectable } from '@angular/core';
import {Movement} from '@interfaces/movement.interface';

@Injectable({
  providedIn: 'root'
})
export class StatefulMovementsService {
  private movements: Movement[];
  private movement: Movement;
  constructor() {}

  set setMovement(movement: Movement) {
    this.movement = movement;
  }

  get getMovement(): Movement {
    return this.movement;
  }

  set setMovements(movements: Movement[]) {
    this.movements = movements;
  }

  get getMovements(): Movement[] {
    return this.movements;
  }
}
