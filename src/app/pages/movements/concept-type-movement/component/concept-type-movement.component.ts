import { Component, OnInit, Input } from '@angular/core';
import { Concept } from '@interfaces/concept.interface';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-concept-type-movement',
  templateUrl: './concept-type-movement.component.html',
  styleUrls: ['./concept-type-movement.component.css']
})
export class ConceptTypeMovementComponent implements OnInit {
  @Input() concepts: Concept[];
  @Input() categoryList: Category[];
  constructor() { }

  ngOnInit() {
  }

}
