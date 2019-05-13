import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cancel-movement',
  templateUrl: './cancel-movement.component.html',
  styleUrls: ['./cancel-movement.component.css']
})
export class CancelMovementComponent implements OnInit {
  @Output() statusCancel: EventEmitter<boolean>;
  constructor() {
    this.statusCancel = new EventEmitter();
  }

  ngOnInit() { }

  emitCancelEvent(event: Event) {
    event.stopPropagation();
    this.statusCancel.emit( true );
  }

}
