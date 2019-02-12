import { Component, OnInit, Input } from '@angular/core';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  @Input() private category: Category;
  constructor() { }

  ngOnInit() {
  }

  // filterSubcategories(index: number) {
  //   this.auxCategoryList = this.categoryList;
  //   this.flagSubcategories = true;
  //   if (this.categoryList[index].subCategories) {
  //     this.categoryList = this.categoryList[index].subCategories;
  //   } else {
  //     this.instanceModal.close();
  //   }
  // }

}
