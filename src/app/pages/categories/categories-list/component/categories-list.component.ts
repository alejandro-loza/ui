import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  @Input() private categoryList: Category[];
  @Input() private flagCategory: boolean;
  @Output() private categoryStatus: EventEmitter<boolean>;
  @Output() private subcategory: EventEmitter<Category>;

  private category: Category;

  constructor() {
    this.categoryStatus = new EventEmitter();
    this.subcategory = new EventEmitter();
  }

  ngOnInit() {
  }

  filterCategories(index: number) {
    this.category = this.categoryList[index];
    this.flagCategory = true;
    this.categoryStatus.emit(this.flagCategory);
  }
}
