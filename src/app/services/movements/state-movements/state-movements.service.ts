import {EventEmitter, Injectable, Output} from '@angular/core';
import {Movement} from '@interfaces/movement.interface';

@Injectable({
  providedIn: 'root'
})
export class StateMovementsService {
  @Output() stateMovement: EventEmitter<boolean>;
  private movement: Movement;
  constructor() {
    this.stateMovement = new EventEmitter();
  }

  set setMovement(movement: Movement) {
    this.movement = movement;
  }

  get getMovement(): Movement {
    return this.movement;
  }
}
