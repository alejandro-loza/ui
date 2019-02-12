import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.css']
})
export class ModalCategoriesComponent implements OnInit, AfterViewInit {
  @Input() private modalTrigger: string;
  @Input() private categoryList: Category[];

  @ViewChild('modalCateogry') modalCategory: ElementRef;
  private auxCategoryList: Category[];
  private instanceModal;
  private flagSubcategories: boolean;
  constructor() {
    this.flagSubcategories = false;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const initModal = new M.Modal(this.modalCategory.nativeElement, {
      onCloseEnd: () => {
        if ( this.auxCategoryList ) {
          this.categoryList = this.auxCategoryList;
        }
      }
    });
    this.instanceModal = M.Modal.getInstance(this.modalCategory.nativeElement);
  }

  backCategories() {
    this.flagSubcategories = false;
    this.categoryList = this.auxCategoryList;
  }
}
