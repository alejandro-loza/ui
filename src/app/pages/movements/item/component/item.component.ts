import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movement } from '@interfaces/movement.interface';
import { Category } from '@interfaces/category.interface';
import { Concept } from '@app/interfaces/concept.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() movement: Movement;
  @Input() categoryList: Category[];

  @Output() movementEdited: EventEmitter<Movement>;
  @Output() private statusModal: EventEmitter<boolean>;
  @Output() private valueCategoryColor: EventEmitter<string>;

  constructor() {
    this.movementEdited = new EventEmitter();
    this.statusModal = new EventEmitter();
    this.valueCategoryColor = new EventEmitter();
  }

  ngOnInit() {}

  updateConcepts(concepts: Concept[]) {
    this.movement.concepts = concepts;
    // this.movementEdited.emit(this.movement);
  }
}
