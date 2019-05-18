import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';

import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';

import { Movement } from '@interfaces/movement.interface';

import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: [ './item-list.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit, AfterViewInit {
  @Input() movementList: Movement[];
  @Input() spinnerBoolean: boolean;
  @Input() getMoreMovements: boolean;

  @Output() getMoreMovementsChange: EventEmitter<boolean>;
  @Output() movementListChange: EventEmitter<Movement[]>;
  @Output() refreshMovementList: EventEmitter<boolean>;

  @ViewChild(CdkVirtualScrollViewport) scrollVirtual: CdkVirtualScrollViewport;

  private index: number;
  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private statefulMovementsService: StatefulMovementsService,
    private router: Router
  ) {
    this.index = 0;
    this.getMoreMovements = false;

    this.getMoreMovementsChange = new EventEmitter();
    this.movementListChange = new EventEmitter();
    this.refreshMovementList = new EventEmitter();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.scrollVirtual) {
      this.scrollDispatcher.scrolled() .pipe(
        filter(() => {
          if (this.scrollVirtual.getRenderedRange().end === this.scrollVirtual.getDataLength()) { return true; }
        })
      ).subscribe(() => this.getMoreMovementsChange.emit(true));
    }
  }

  trackByFn = (index: number, movement: Movement) => movement.id;

  setMovement(event: Event, movement: Movement): Promise<boolean> {
    event.stopPropagation();
    this.statefulMovementsService.setMovement = movement;
    return this.router.navigate([movement.id]);
  }
}
