import { Component, OnInit, Input } from '@angular/core';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  @Input() private categoryList: Category[];
  constructor() { }

  ngOnInit() {
  }

}
