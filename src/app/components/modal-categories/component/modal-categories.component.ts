import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Input,
  Output,
  DoCheck
} from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { Category } from '@interfaces/category.interface';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.css']
})
export class ModalCategoriesComponent implements OnInit, DoCheck, AfterViewInit {
  @Input() modalTrigger: string;
  @Input() categoryList: Category[];

  @Output() statusModal: EventEmitter<boolean>;
  @Output() statusCategory: EventEmitter<boolean>;

  @ViewChild('modalCateogry') modalCategory: ElementRef;

  backCategories: boolean;
  private instanceModal;
  private initModal: M.Modal;
  constructor() {
    this.backCategories = false;
    this.statusModal = new EventEmitter();
    this.statusCategory = new EventEmitter();
  }

  ngOnInit() {}

  ngDoCheck() {
    /**
     * Se valida si existe la variable _initModal_, después se hace
     * otra validación si la propiedad _isOpen_ es verdadera, si lo es,
     * se emite la varible statusModal con la propierda _isOpen_
     */
    if (this.initModal) {
      if ( this.initModal.isOpen === true ) {
        this.statusModal.emit(this.initModal.isOpen);
      }
    }
  }

  ngAfterViewInit() {
    this.initModal = new M.Modal(this.modalCategory.nativeElement, {
      onCloseEnd: () => {
        this.backCategories = false;
        this.statusModal.emit(this.initModal.isOpen);
      }
    });
    this.instanceModal = M.Modal.getInstance(this.modalCategory.nativeElement);
  }

  statusCategoryChange(flag: boolean) {
    this.statusCategory.emit(flag);
    if ( flag === true ) {
      this.initModal.close();
    }
  }
}
