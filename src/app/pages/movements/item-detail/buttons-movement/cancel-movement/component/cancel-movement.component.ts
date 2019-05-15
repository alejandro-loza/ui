import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {StateMovementsService} from '@services/movements/state-movements/state-movements.service';

@Component({
  selector: 'app-cancel-movement',
  templateUrl: './cancel-movement.component.html',
  styleUrls: ['./cancel-movement.component.css']
})
export class CancelMovementComponent implements OnInit {
  @Output() statusCancel: EventEmitter<boolean>;
  constructor(
    private stateMovementsService: StateMovementsService
  ) {
    this.statusCancel = new EventEmitter();
  }

  ngOnInit() { }

  emitCancelEvent(event: Event) {
    event.stopPropagation();
    this.stateMovementsService.stateMovement.emit(true);
  }

}
