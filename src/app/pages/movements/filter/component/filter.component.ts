import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateApiService } from '@services/date-api/date-api.service';
import { ParamsMovementsService } from '@services/movements/params-movements/params-movements.service';
import { ParamsMovements } from '@app/interfaces/paramsMovements.interface';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Input() charges: boolean;
  @Input() deposits: boolean;
  @Input() duplicates: boolean;

  @Output() filterMovementStatus: EventEmitter<boolean>;

  params: ParamsMovements;
  endDate: Date;
  startDate: Date;
  private changeDate: boolean;

  constructor(
    private paramsMovementsService: ParamsMovementsService,
    private dateApiService: DateApiService,
  ) {
    this.filterMovementStatus = new EventEmitter();
    this.startDate = new Date();
    this.endDate = new Date();
    const year = new Date().getFullYear() - 1;
    this.startDate.setFullYear(year);
    this.changeDate = false;
  }

  ngOnInit() {
    this.params = this.paramsMovementsService.getParamsMovements;
  }

  ngAfterViewInit() { }

  filterMovement(ngform: NgForm) {
    this.paramsMovementsService.setCharges = ngform.value.charges;
    this.paramsMovementsService.setDeposits = ngform.value.deposits;
    this.paramsMovementsService.setDuplicates = ngform.value.duplicates;
    this.filterMovementStatus.emit(true);
  }

  changedStartDate(date: string) {
    const auxStart = this.dateApiService.dateApi(this.startDate);
    if (  auxStart !== date ) {
      this.paramsMovementsService.setStartDate = date;
    }
  }

  changedEndDate(date: string) {
    const auxEnd = this.dateApiService.dateApi(this.endDate);
    if (  auxEnd !== date ) {
      this.paramsMovementsService.setEndDate = date;
    }
  }
}
