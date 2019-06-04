import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';

import { Movement } from '@interfaces/movement.interface';
import {ScrollPositionService} from '@services/scroll-position/scroll-position.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: [ './item-list.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit, AfterViewInit {
  @Input() movementList: Movement[];
  @Input() spinnerBoolean: boolean;

  constructor(
    private statefulMovementsService: StatefulMovementsService,
    private router: Router,
    private scrollPosition: ScrollPositionService,
    public viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.scrollPosition.scrollPositionValue) {
      this.viewportScroller.scrollToPosition(this.scrollPosition.scrollPositionValue);
      this.scrollPosition.scrollPositionValue = [0, 0];
    }
  }

  trackByFn = (index: number, movement: Movement) => movement.id;

  setMovement(movement: Movement) {
    this.scrollPosition.scrollPositionValue = this.viewportScroller.getScrollPosition();
    this.statefulMovementsService.setMovement = JSON.parse(JSON.stringify(movement));
    return this.router.navigateByUrl(`/app/movements/${movement.id}`);
  }

}
