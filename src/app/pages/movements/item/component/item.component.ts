import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DateApiService } from '@services/date-api/date-api.service';
import { Movement } from '@interfaces/movement.interface';
import { Category } from '@interfaces/category.interface';
import {MovementsService} from '@services/movements/movements.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit {
  @Input() movement: Movement;
  @Input() categoryList: Category[];

  @Output() movementEdited: EventEmitter<Movement>;
  @Output() valueCategoryColor: EventEmitter<string>;

  constructor(
    private dateApi: DateApiService,
    private movementService: MovementsService
  ) {
    this.movementEdited = new EventEmitter();
    this.valueCategoryColor = new EventEmitter();
  }

  ngOnInit() {
    this.formatMovementDate();
  }

  formatMovementDate() {
    this.movement.customDate = this.dateApi.formatDateForAllBrowsers(this.movement.customDate.toString());
  }

  updateMovement(movement: Movement) {
    console.log(movement);
  }
}
