import {Component, OnInit, Input} from '@angular/core';

import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-category-movement',
  templateUrl: './category-movement.component.html',
  styleUrls: ['./category-movement.component.css']
})
export class CategoryMovementComponent implements OnInit {
  @Input() category: Category;

  constructor( ) { }

  ngOnInit() { }

}
