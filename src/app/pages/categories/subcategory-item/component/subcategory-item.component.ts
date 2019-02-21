import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-subcategory-item',
  templateUrl: './subcategory-item.component.html',
  styleUrls: ['./subcategory-item.component.css']
})
export class SubcategoryItemComponent implements OnInit {
  @Input() category: Category;
  @Output() statusCategory: EventEmitter<Category>;
  @ViewChild('btnSubcategory') btnSubcategory: ElementRef;
  constructor(private renderer: Renderer2) {
    this.statusCategory = new EventEmitter();
  }

  ngOnInit() {
    this.category.subCategories.sort((currentCategory, nextCategory) => {
      if (currentCategory.color > nextCategory.color) {
        return 1;
      } else if (currentCategory.color < nextCategory.color) {
        return -1;
      } else {
        return 0;
      }
    });
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
    this.renderer.removeStyle(
      document.getElementById(this.category.subCategories[i].id),
      'background-color'
    );
    this.renderer.removeStyle(
      document.getElementById(this.category.subCategories[i].id),
      'color'
    );
  }

  selectCategory(i: number) {
    const auxcategory = this.category.subCategories[i];
    auxcategory.parent.id = this.category.id;
    this.statusCategory.emit(auxcategory);
  }

  trackByFn(index: number, category: Category) {
    return category.id;
  }
}
