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


  endDate: Date;
  startDate: Date;

  constructor(
    private paramsMovementsService: ParamsMovementsService,
    private dateApiService: DateApiService,
  ) {
    this.filterMovementStatus = new EventEmitter();
    this.startDate = new Date();
    this.endDate = new Date();
    const year = new Date().getFullYear() - 1;
    this.startDate.setFullYear(year);
  }

  ngOnInit() {}

  ngAfterViewInit() { }

  filterMovement(ngform: NgForm) {
    this.paramsMovementsService.setCharges = ngform.value.charges;
    this.paramsMovementsService.setDeposits = ngform.value.deposits;
    this.paramsMovementsService.setDuplicates = ngform.value.duplicates;
    this.paramsMovementsService.setStartDate = this.startDate.toString();
    this.paramsMovementsService.setEndDate = this.endDate.toString();
    this.filterMovementStatus.emit(true);
  }
}
