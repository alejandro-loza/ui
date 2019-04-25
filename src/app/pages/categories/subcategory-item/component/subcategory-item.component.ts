import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Category} from '@interfaces/category.interface';
import {CategoriesBeanService} from '@services/categories/categories-bean.service';

@Component({
  selector: 'app-subcategory-item',
  templateUrl: './subcategory-item.component.html',
  styleUrls: [ './subcategory-item.component.css' ]
})
export class SubcategoryItemComponent implements OnInit {
  @Input() category: Category;
  @Input() statusCategory: boolean;
  @Output() statusCategoryChange: EventEmitter<boolean>;
  constructor(
    private renderer: Renderer2,
    private categoriesBeanService: CategoriesBeanService
  ) {
    this.statusCategoryChange = new EventEmitter();
  }

  ngOnInit() {
    this.findAllCategoriesFromJsonArray(this.category);
  }

  overSubcategory(i: number) {
    this.renderer.setStyle(
      document.getElementById(this.category.subCategories[i].id),
      'background-color',
      this.category.subCategories[i].color
    );
    this.renderer.setStyle(
      document.getElementById(this.category.subCategories[i].id),
      'color',
      this.category.subCategories[i].textColor
    );
  }

  outSubcategory(i: number) {
    this.renderer.removeStyle(document.getElementById(this.category.subCategories[i].id), 'background-color');
    this.renderer.removeStyle(document.getElementById(this.category.subCategories[i].id), 'color');
  }

  selectCategory(i: number, event: Event) {
    event.stopPropagation();
    this.categoriesBeanService.setCategory = this.category.subCategories[i];
    this.statusCategory = true;
    this.statusCategoryChange.emit(this.statusCategory);
  }

  trackByFn(index: number, category: Category) {
    return category.id;
  }

  orderCategoriesByColor(category: Category) {
    category.subCategories.sort((currentCategory, nextCategory) => {
      if (currentCategory.color > nextCategory.color) {
        return 1;
      } else if (currentCategory.color < nextCategory.color) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  private findAllCategoriesFromJsonArray(category: Category) {
    this.orderCategoriesByColor(category);
    for (let i = 0; i < category.subCategories.length; i++) {
      const subcategory = category.subCategories[i];
      subcategory.parent = {
        id: category.id
      };
    }
  }
}
