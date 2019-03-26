import { Injectable } from '@angular/core';
import { Category } from '@interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class EditMovementService {
  private index: number;
  private category: Category;
  constructor() {
    this.index = undefined;
    this.category = undefined;
  }
}
