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
  @Input() private modalTrigger: string;
  @Input() private categoryList: Category[];

  @Output() private statusModal: EventEmitter<boolean>;
  @Output() private statusCategory: EventEmitter<Category>;

  @ViewChild('modalCateogry') modalCategory: ElementRef;

  private auxCategoryList: Category[];
  private instanceModal;
  private backCategories: boolean;
  constructor() {
    this.backCategories = false;
    this.statusModal = new EventEmitter();
    this.statusCategory = new EventEmitter();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const initModal = new M.Modal(this.modalCategory.nativeElement, {
      onOpenStart: () => { this.statusModal.emit(true); },
      onCloseStart: () => {
        this.backCategories = false;
        this.statusModal.emit(false);
      }
    });
    this.instanceModal = M.Modal.getInstance( this.modalCategory.nativeElement );
  }

  getSubcategory (subcategory: Category) {
    this.instanceModal.close();
    this.statusCategory.emit(subcategory);
  }

}
