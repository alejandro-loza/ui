import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Concept } from '@interfaces/concept.interface';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-concept-type-movement',
  templateUrl: './concept-type-movement.component.html',
  styleUrls: ['./concept-type-movement.component.css']
})
export class ConceptTypeMovementComponent implements OnInit {
  private multiCategory: Category;
  private noCategory: Category;
  @Input() private concepts: Concept[];
  @Input() private editAvailable: boolean;
  @Input() private categoryList: Category[];

  @Output() private statusModal: EventEmitter<boolean>;
  @Output() private statusConcepts: EventEmitter<Concept[]>;
  @Output() private valueCategoryColor: EventEmitter<string>;

  constructor() {
    this.statusModal = new EventEmitter();
    this.statusConcepts = new EventEmitter();
    this.valueCategoryColor = new EventEmitter();
    this.multiCategory = {
      id: 'multi',
      color: '#212121',
      name: 'Multi Categoria',
      textColor: '#fafafa'
    };
    this.noCategory = {
      id: 'finerio-icon',
      color: '#757575',
      name: 'Sin Categoría',
      textColor: '#fafafa'
    };
  }

  ngOnInit() {}

  updateConcepts(category: Category) {
    this.concepts[0].category = category;
    console.log(this.concepts);
    this.statusConcepts.emit(this.concepts);
  }
}
