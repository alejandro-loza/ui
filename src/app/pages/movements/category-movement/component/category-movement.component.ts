import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-category-movement',
  templateUrl: './category-movement.component.html',
  styleUrls: ['./category-movement.component.css']
})
export class CategoryMovementComponent implements OnInit {
  @Input() private categoryList: Category[];
  @Input() private category: Category;
  @Input() private editAvailable: boolean;

  @Output() private statusModal: EventEmitter<boolean>;
  @Output() private statusSubcategory: EventEmitter<Category>;

  constructor() {
    this.statusModal = new EventEmitter();
    this.statusSubcategory = new EventEmitter();
  }

  ngOnInit() {}

  updateCategory(category: Category) {
    this.category = category;
    this.statusSubcategory.emit(category);
  }
}
