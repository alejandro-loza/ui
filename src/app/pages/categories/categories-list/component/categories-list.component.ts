import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '@interfaces/category.interface';
import {isNull, isUndefined} from 'util';
import {CategoriesBeanService} from '@services/categories/categories-bean.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  @Input() categoryList: Category[];
  @Input() flagCategory: boolean;
  @Output() filterStatus: EventEmitter<boolean>;
  @Output() statusCategory: EventEmitter<boolean>;

  private category: Category;

  constructor(
    private categoriesBeanService: CategoriesBeanService
  ) {
    this.filterStatus = new EventEmitter();
    this.statusCategory = new EventEmitter();
  }

  ngOnInit() {
  }

  filterCategories(index: number) {
    this.category = this.categoryList[index];
    if ( this.category.subCategories.length === 0 ) {
      this.categoriesBeanService.setCategory = this.category;
      this.statusCategory.emit(true);
    }
    this.flagCategory = true;
    this.filterStatus.emit(this.flagCategory);
  }
}
