import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Concept } from '@interfaces/concept.interface';
import { Category } from '@interfaces/category.interface';
import { Movement } from '@interfaces/movement.interface';

@Component({
  selector: 'app-concept-type-movement',
  templateUrl: './concept-type-movement.component.html',
  styleUrls: ['./concept-type-movement.component.css']
})
export class ConceptTypeMovementComponent implements OnInit {
  private multiCategory: Category;
  private noCategory: Category;
  @Input() concepts: Concept[];
  @Input() editAvailable: boolean;
  @Input() categoryList: Category[];

  @Output() statusModal: EventEmitter<boolean>;
  @Output() statusCategory: EventEmitter<boolean>;
  @Output() valueCategoryColor: EventEmitter<string>;

  constructor() {
    this.statusModal = new EventEmitter();
    this.statusCategory = new EventEmitter();
    this.valueCategoryColor = new EventEmitter();

    this.multiCategory = { id: 'multi', color: '#212121', name: 'Multi Categoria', textColor: '#fafafa' };
    this.noCategory = { id: 'finerio-icon', color: '#757575', name: 'Sin Categoría', textColor: '#fafafa' };
  }

  ngOnInit() {}

}
