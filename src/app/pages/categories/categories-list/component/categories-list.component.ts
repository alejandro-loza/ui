import {Component, OnInit, Input, Output, EventEmitter, OnChanges, DoCheck} from '@angular/core';
import { Category } from '@interfaces/category.interface';
import {CategoriesBeanService} from '@services/categories/categories-bean.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, DoCheck {
  @Input() categories: Category[];
  @Input() stateCategories: boolean;
  @Input() statusCategory: boolean;
  @Output() stateCategoriesChange: EventEmitter<boolean>;
  @Output() statusCategoryChange: EventEmitter<boolean>;

  category: Category;

  constructor( private categoriesBeanService: CategoriesBeanService ) {
    this.stateCategoriesChange = new EventEmitter();
    this.statusCategoryChange = new EventEmitter();
  }

  ngOnInit() { }

  ngDoCheck(): void {
    if ( this.statusCategory ) {
      this.statusCategoryChange.emit(this.statusCategory);
    }
  }

  filterCategory(index: number) {
    this.category = JSON.parse(JSON.stringify(this.categories[index]));
    if ( this.category.subCategories.length > 0 ) {
      this.stateCategories = false;
      this.stateCategoriesChange.emit(this.stateCategories);
    } else {
      this.categoriesBeanService.setCategory = this.category;
      this.statusCategory = true;
      this.statusCategoryChange.emit(this.statusCategory);
    }
  }
}
