import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as M from 'materialize-css/dist/js/materialize';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-category-movement',
  templateUrl: './category-movement.component.html',
  styleUrls: ['./category-movement.component.css']
})
export class CategoryMovementComponent implements OnInit {
  @Input() modalTrigger: string;
  @Input() bckgrndColor: string;
  @Input() frgrndColor: string;
  @Input() categoryName: string;
  @Input() categoryParent: string;
  @Input() categoryList: Category[];
  @Input() category: Category;

  @Output() private statusModal: EventEmitter<boolean>;


  constructor() {
    this.statusModal = new EventEmitter();
  }

  ngOnInit() { }

}
