import { Injectable } from '@angular/core';
import { Category } from '@app/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesBeanService {
  private categories: Category[] = [];

  constructor() {}

  public setCategories(data: Category[]) {
    this.categories = data;
  }

  public getCategories(): Category[] {
    return this.categories;
  }
}
