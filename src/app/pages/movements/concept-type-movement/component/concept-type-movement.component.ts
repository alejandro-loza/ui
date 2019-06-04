import { Component, OnInit, Input } from '@angular/core';

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
  @Input() concepts: Concept[];

  constructor() {
    this.multiCategory = { id: 'multi', color: '#212121', name: 'Multi Categoria', textColor: '#fafafa' };
    this.noCategory = { id: 'finerio-icon', color: '#757575', name: 'Sin Categoría', textColor: '#fafafa' };
  }

  ngOnInit() {}

}
