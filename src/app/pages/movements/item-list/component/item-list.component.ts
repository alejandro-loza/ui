import {
  Component, EventEmitter,
  Input,
  OnInit, Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {MatExpansionPanel} from '@angular/material';

import {Movement} from '@interfaces/movement.interface';
import {Category} from '@interfaces/category.interface';

import {isNull, isUndefined} from 'util';

import {CategoriesService} from '@services/categories/categories.service';
import {CategoriesBeanService} from '@services/categories/categories-bean.service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() movementList: Movement[];
  @Input() categoryList: Category[];
  @Input() spinnerBoolean: boolean;

  @ViewChild('cdkVirtualScrollViewport') scrollVirtual: CdkVirtualScrollViewport;
  @ViewChild('expansion') expansionElement: MatExpansionPanel;

  @Output() movementListChange: EventEmitter<Movement[]>;

  private auxMovement: Movement;
  private firstStateMovement: Movement;
  private statusModal: boolean;
  expandedState: boolean;

  index: number;
  keyEnter: boolean;

  constructor(
    private renderer: Renderer2,
    private categoriesService: CategoriesService,
    private categoriesBeanService: CategoriesBeanService
  ) {
    this.keyEnter = false;
    this.statusModal = false;
    this.index = undefined;
    this.expandedState = false;
    this.movementListChange = new EventEmitter();
  }

  ngOnInit(): void { }

  statusCategory(status: boolean): void {
    if (status === true) {
      this.auxMovement.concepts[0].category = this.categoriesBeanService.getCategory;
      this.statusModal = false;
    }
    this.auxMovement.editAvailable = true;
  }

  collapsibleCancel(index: number): void {
    this.movementList[index] = this.firstStateMovement;
    this.movementList[index].editAvailable = false;
    this.keyEnter = false;
  }

  collapsibleClose(index: number): void {
    if ( this.auxMovement.customDescription === '' || this.auxMovement.customDescription === null ) {
      this.auxMovement.customDescription = this.firstStateMovement.customDescription;
    }
    if (isNull(this.auxMovement.customDate)) {
      this.auxMovement.customDate = this.firstStateMovement.date;
    }
    if (isNull(this.auxMovement.amount)) {
      this.auxMovement.amount = this.firstStateMovement.amount;
    }
    this.auxMovement.editAvailable = false;
    this.keyEnter = false;
  }

  deleteMovement(index: number): void {
    this.collapsibleClose(index);
    this.movementList.splice(index, 1);
  }

  isScrolling(scroll: CdkVirtualScrollViewport) {
    const heightDiv = Math.round(scroll.getElementRef().nativeElement.getBoundingClientRect().height * .7);
    const percent = scroll.measureScrollOffset('top');
    if ( percent >= heightDiv) {
      this.movementListChange.emit(this.movementList);
    }
  }
}
