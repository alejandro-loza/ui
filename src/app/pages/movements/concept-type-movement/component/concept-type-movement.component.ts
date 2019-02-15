import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Concept } from '@interfaces/concept.interface';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-concept-type-movement',
  templateUrl: './concept-type-movement.component.html',
  styleUrls: ['./concept-type-movement.component.css']
})
export class ConceptTypeMovementComponent implements OnInit {
  @Input() private concepts: Concept[];
  @Input() private categoryList: Category[];

  @Output() private statusModal: EventEmitter<boolean>;
  constructor() {
    this.statusModal = new EventEmitter();
  }

  ngOnInit() {
  }

}
