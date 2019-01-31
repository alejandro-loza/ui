import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-category-movement',
  templateUrl: './category-movement.component.html',
  styleUrls: ['./category-movement.component.css']
})
export class CategoryMovementComponent implements OnInit, AfterViewInit {
  @Input() bckgrndColor: string;
  @Input() frgrndColor: string;
  @Input() categoryName: string;
  @Input() categoryParent: string;

  @ViewChild('modalCateogry') modalCateogry: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const initModal = new M.Modal(this.modalCateogry.nativeElement, {
      endingTop: '35%'
    });
  }

}
