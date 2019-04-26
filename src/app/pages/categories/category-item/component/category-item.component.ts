import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Category } from '@interfaces/category.interface';
import {isUndefined} from 'util';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  @Input() categories: Category[];
  @Output() indexCategory: EventEmitter<number>;
  constructor() {
    this.indexCategory = new EventEmitter<number>();
  }

  ngOnInit() { }

  trackByFn(index: number, category: Category) {
    return category.id;
  }

  selectCategory(index: number) {
    this.indexCategory.emit(index);
  }
}
