import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParamsService } from '@services/movements/params/params.service';
import { DateApiService } from '@services/date-api/date-api.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() charges: boolean;
  @Input() deposits: boolean;
  @Input() duplicates: boolean;

  @Output() filterMovementStatus: EventEmitter<boolean>;

  endDate: Date;
  startDate: Date;

  constructor(
    private paramsService: ParamsService,
    private dateApiService: DateApiService
  ) {
    this.filterMovementStatus = new EventEmitter();
    this.startDate = new Date();
    this.endDate = new Date();
    const year = new Date().getFullYear() - 1;
    this.startDate.setFullYear(year);
  }

  ngOnInit() {}

  filterMovement(ngform: NgForm) {
    this.paramsService.setCharges = ngform.value.charges;
    this.paramsService.setDeposits = ngform.value.deposits;
    this.paramsService.setDuplicates = ngform.value.duplicates;
    this.paramsService.setStartDate = this.dateApiService.dateWithFormat(this.startDate);
    this.paramsService.setEndDate = this.dateApiService.dateWithFormat(this.endDate);
    this.filterMovementStatus.emit(true);
  }
}
