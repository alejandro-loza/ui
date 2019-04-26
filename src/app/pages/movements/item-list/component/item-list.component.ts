import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {MatExpansionPanel} from '@angular/material';

import {Movement} from '@interfaces/movement.interface';
import {Category} from '@interfaces/category.interface';

import {isNull} from 'util';

import {CategoriesService} from '@services/categories/categories.service';
import {CategoriesBeanService} from '@services/categories/categories-bean.service';
import {CdkVirtualScrollViewport, ScrollDispatcher} from '@angular/cdk/scrolling';
import {filter} from 'rxjs/operators';
import {DashboardStatesService} from '@services/dashboard/dashboard-states.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ItemListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() movementList: Movement[];
  @Input() categoryList: Category[];
  @Input() spinnerBoolean: boolean;
  @Input() getMoreMovements: boolean;

  @Output() getMoreMovementsChange: EventEmitter<boolean>;
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
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.index = undefined;
    this.getMoreMovements = false;
    this.panelOpenState = false;

    this.getMoreMovementsChange = new EventEmitter();
    this.movementListChange = new EventEmitter();
    this.refreshMovementList = new EventEmitter();
  }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.categoriesBeanService.changeCategory
      .subscribe( res => {
        if ( res ) {
          this.movementList[this.index].concepts[0].category = this.categoriesBeanService.getCategory;
          this.changeDetectorRef.detectChanges();
          this.categoriesBeanService.changeCategory.emit(false);
        }
      });
  }

  ngAfterViewInit(): void {
    if ( this.scrollVirtual ) {
      this.scrollDispatcher.scrolled().pipe(
        filter(() => {
          if (this.scrollVirtual.getRenderedRange().end === this.scrollVirtual.getDataLength()) {
            return true;
          }
        })
      ).subscribe((res: CdkVirtualScrollViewport) => {
        this.getMoreMovementsChange.emit(true);
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  trackByFn(index: number, movement: Movement) {
    return movement.id;
  }

  collapsibleCancel(index: number): void {
    console.log(this.auxMovement.concepts[0].category);
    console.log(this.movementList[index].concepts[0].category);
    this.movementList[index] = this.auxMovement;
    this.movementList[index].editAvailable = false;
    this.expansionElement.toggle();
    this.changeDetectorRef.detectChanges();
  }

  collapsibleClose(index: number): void {
    if ( this.movementList[index].customDescription === '' || this.movementList[index].customDescription === null ) {
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
    this.changeDetectorRef.detectChanges();
  }

  deleteMovement(index: number): void {
    this.refreshMovementList.emit(true);
  }

  handleSpacebar(ev) {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event, index: number): void {
    event.stopPropagation(); // Preventing event bubbling
    if (!this._isExpansionIndicator(event.target as HTMLElement, index)) {
      matExpansionPanel.toggle(); // Here's the magic
    }
    this.expansionElement = matExpansionPanel;
    this.expansionEvent = event;
  }

  private _isExpansionIndicator(target: HTMLElement, index: number): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    if ( (target.classList && target.classList.contains(expansionIndicatorClass) ) ) {
      this.auxMovement = JSON.parse(JSON.stringify(this.movementList[index]));
      this.movementList[index].editAvailable = true;
      this.auxMovement.editAvailable = true;
      this.index = index;
    }
    return (target.classList && target.classList.contains(expansionIndicatorClass) );
  }
}
