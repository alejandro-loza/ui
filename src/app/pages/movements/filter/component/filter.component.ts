import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ParamsService } from "@services/movements/params/params.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
  @Input() charges: boolean;
  @Input() deposits: boolean;
  @Input() duplicates: boolean;

  @Output() filterMovementStatus: EventEmitter<boolean>;

  constructor(private paramsService: ParamsService) {
    this.filterMovementStatus = new EventEmitter();
  }

  ngOnInit() {}

  filterMovement(ngform: NgForm) {
    this.paramsService.setCharges = ngform.value.charges;
    this.paramsService.setDeposits = ngform.value.deposits;
    this.paramsService.setDuplicates = ngform.value.duplicates;
    this.filterMovementStatus.emit(true);
  }
}
