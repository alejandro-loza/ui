import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Movement } from '@interfaces/movement.interface';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() movement: Movement;
  @Input() statusUpdate: boolean;
  @Input() keyEnter: boolean;

  @Output() status: EventEmitter<boolean>;
  @Output() statusDelete: EventEmitter<boolean>;
  @Output() keyEnterPressed: EventEmitter<boolean>;

  constructor( ) {
    this.status = new EventEmitter();
    this.statusDelete = new EventEmitter();
    this.keyEnterPressed = new EventEmitter();
  }

  ngOnInit() {}

}
