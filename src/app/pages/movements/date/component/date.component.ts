import { DateApiService } from '@services/date-api/date-api.service';
import {
  Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {DomEventsService} from "@services/dom-events/dom-events.service";

declare var M;
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: [ './date.component.css' ]
})
export class DateComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() date: Date;
  @Input() formatDate: string;
  @Input() name: string;
  @Input() classes: string;
  @Input() type: string;
  @Input() id: string;
  @Input() reset: boolean;

  @Output() valueDate: EventEmitter<Date>;
  @Output() valueFormatDate: EventEmitter<string>;

  @ViewChild('datepicker') elementDatePicker: ElementRef;

  constructor(
    private dateApiService: DateApiService,
    private domEventsService: DomEventsService
  ) {
    this.date = new Date();
    this.valueDate = new EventEmitter();
    this.valueFormatDate = new EventEmitter();
  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.reset === true) {
      this.formatDate = 'Otro...';
      this.date = new Date();
      this.reset = false;
    }
  }

  ngAfterContentInit() {
    const initDatepicker = new M.Datepicker(this.elementDatePicker.nativeElement, {
      autoClose: true,
      format: 'dd mmm',
      showDaysInNextAndPreviousMonths: true,
      container: 'body',
      i18n: {
        months: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
        monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ags', 'Sep', 'Oct', 'Nov', 'Dic' ],
        weekdays: [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ],
        weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
        weekdaysAbbrev: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ]
      },
      maxDate: new Date(),
      onDraw: (datepicker) => {
        this.formatDate = this.dateApiService.dateFormatMovement(datepicker.date);
        this.valueDate.emit(datepicker.date);
        this.valueFormatDate.emit(this.formatDate);
      }
    });
    const instanceDatepicker = new M.Datepicker.getInstance(this.elementDatePicker.nativeElement);
    instanceDatepicker.setDate(this.date);
  }

  stopEvents(event: Event) {
    this.domEventsService.stopEvents(event);
  }
}
