import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-category-movement',
  templateUrl: './category-movement.component.html',
  styleUrls: ['./category-movement.component.css']
})
export class CategoryMovementComponent implements OnInit {
  @Input() categoryList: Category[];
  @Input() category: Category;
  @Input() editAvailable: boolean;

  @Output() statusModal: EventEmitter<boolean>;
  @Output() statusConcepts: EventEmitter<Category>;

  constructor() {
    this.statusModal = new EventEmitter();
    this.statusConcepts = new EventEmitter();
  }

  ngOnInit() {}

  updateCategory(category: Category) {
    // this.category = category;
    this.statusConcepts.emit(category);
  }
}
