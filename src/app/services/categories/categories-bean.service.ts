import {Injectable} from '@angular/core';
import {Category} from '@app/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesBeanService {
  private category: Category;
  private categories: Category[] = [];

  constructor() {}

  public setCategories(data: Category[]) {
    this.categories = data;
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  set setCategory(category: Category) {
    this.category = category;
  }

  get getCategory(): Category {
    return this.category;
  }
}
