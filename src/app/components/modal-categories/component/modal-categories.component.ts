import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.css']
})
export class ModalCategoriesComponent implements OnInit, AfterViewInit {
  @Input() modalTrigger: string;
  @Input() categoryList: Category[];

  @Output() statusModal: EventEmitter<boolean>;
  @Output() statusCategory: EventEmitter<Category>;

  @ViewChild('modalCateogry') modalCategory: ElementRef;

  auxCategoryList: Category[];
  instanceModal;
  backCategories: boolean;
  constructor() {
    this.backCategories = false;
    this.statusModal = new EventEmitter();
    this.statusCategory = new EventEmitter();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const initModal = new M.Modal(this.modalCategory.nativeElement, {
      onOpenStart: () => {
        this.statusModal.emit(true);
      },
      onCloseEnd: () => {
        this.backCategories = false;
        this.statusModal.emit(false);
      }
    });
    this.instanceModal = M.Modal.getInstance(this.modalCategory.nativeElement);
  }

  updateCategory(category: Category) {
    this.instanceModal.close();
    this.statusCategory.emit(category);
  }
}
