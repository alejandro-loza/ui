import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material';

import { Movement } from '@interfaces/movement.interface';
import { Category } from '@interfaces/category.interface';

import { isNull } from 'util';

import { CategoriesService } from '@services/categories/categories.service';
import { AccountsBeanService } from '@services/account/accounts-bean.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import {StateMovementsService} from '@services/movements/state-movements/state-movements.service';

import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: [ './item-list.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit, OnChanges, DoCheck, AfterViewInit {
  @Input() movementList: Movement[];
  @Input() categoryList: Category[];
  @Input() spinnerBoolean: boolean;
  @Input() getMoreMovements: boolean;

  @Output() getMoreMovementsChange: EventEmitter<boolean>;
  @Output() testChange: EventEmitter<Movement>;
  @Output() movementListChange: EventEmitter<Movement[]>;
  @Output() refreshMovementList: EventEmitter<boolean>;

  @ViewChild(CdkVirtualScrollViewport) scrollVirtual: CdkVirtualScrollViewport;
  private expansionElement: MatExpansionPanel;
  private expansionEvent: Event;

  private index: number;

  auxMovement: Movement;
  panelOpenState: boolean;

  constructor(
    private renderer: Renderer2,
    private categoriesService: CategoriesService,
    private categoriesBeanService: CategoriesBeanService,
    private scrollDispatcher: ScrollDispatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private accountsBeanService: AccountsBeanService,
    private stateMovementsService: StateMovementsService
  ) {
    this.index = undefined;
    this.getMoreMovements = false;
    this.panelOpenState = false;

    this.getMoreMovementsChange = new EventEmitter();
    this.testChange = new EventEmitter();
    this.movementListChange = new EventEmitter();
    this.refreshMovementList = new EventEmitter();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.categoriesBeanService.changeCategory.subscribe((res) => {
        if (res) {
          this.movementList[this.index].concepts[0].category = this.categoriesBeanService.getCategory;
        }
      },
      err => err,
      () => {
        this.changeDetectorRef.detectChanges();
        this.categoriesBeanService.changeCategory.emit(false);
      }
    );
    this.stateMovementsService.stateMovement.subscribe(res => {
        if ( res ) {
          this.movementList[this.index] = this.stateMovementsService.getMovement;
        }
      },
      err => err,
      () => {
        this.stateMovementsService.stateMovement.emit(false);
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  ngDoCheck(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.scrollVirtual) {
      this.scrollDispatcher
        .scrolled()
        .pipe(
          filter(() => {
            if (this.scrollVirtual.getRenderedRange().end === this.scrollVirtual.getDataLength()) {
              return true;
            }
          })
        )
        .subscribe((res: CdkVirtualScrollViewport) => {
          this.getMoreMovementsChange.emit(true);
        });
    }
  }

  trackByFn(index: number, movement: Movement) {
    return movement.id;
  }

  collapsibleCancel(index: number): void {
    console.log('%c item-list.component: Movement from Array: ', 'color: #7986CB', this.movementList[index]);
    // this.movementList[index] = this.auxMovement;
    // this.movementList[index].editAvailable = false;
    this.expansionElement.toggle();
  }

  collapsibleClose(index: number): void {
    if (this.movementList[index].customDescription === '' || this.movementList[index].customDescription === null) {
      this.movementList[index].customDescription = this.auxMovement.customDescription;
    }
    if (isNull(this.movementList[index].customDate)) {
      this.movementList[index].customDate = this.auxMovement.date;
    }
    if (isNull(this.movementList[index].amount)) {
      this.movementList[index].amount = this.auxMovement.amount;
    }
    this.movementList[index].editAvailable = false;
    this.expansionElement.toggle();
  }

  deleteMovement(index: number): void {
    this.refreshMovementList.emit(true);
  }

  handleSpacebar(ev) {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
  }

}
