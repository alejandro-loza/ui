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

  @ViewChild(CdkVirtualScrollViewport) scrollVirtual: CdkVirtualScrollViewport;
  @ViewChild('expansion') expansionElement: MatExpansionPanel;

  private firstStateMovement: Movement;
  private statusModal: boolean;

  auxMovement: Movement;
  index: number;
  keyEnter: boolean;
  panelOpenState: boolean;

  constructor(
    private renderer: Renderer2,
    private categoriesService: CategoriesService,
    private categoriesBeanService: CategoriesBeanService,
    private scrollDispatcher: ScrollDispatcher,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.index = undefined;

    this.keyEnter = false;
    this.statusModal = false;
    this.getMoreMovements = false;
    this.panelOpenState = false;

    this.getMoreMovementsChange = new EventEmitter();
    this.movementListChange = new EventEmitter();
  }

  ngOnInit(): void { }

  ngOnChanges(): void { }

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
  }

  private _isExpansionIndicator(target: HTMLElement, index: number): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    if ( (target.classList && target.classList.contains(expansionIndicatorClass) ) ) {
      this.auxMovement = JSON.parse(JSON.stringify(this.movementList[index]));
      this.movementList[index].editAvailable = true;
    }
    return (target.classList && target.classList.contains(expansionIndicatorClass) );
  }
}
