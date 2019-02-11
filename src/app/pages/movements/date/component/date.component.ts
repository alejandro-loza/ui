import { DateApiService } from '@services/date-api/date-api.service';
import { Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter, } from          '@angular/core';

declare var M;
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, AfterContentInit {
  @Input() date: Date;
  @Input() formatDate: string;
  @Input() name: string;
  @Input() classes: string;
  @Input() type: string;

  @Output() valueDate: EventEmitter<string>;

  @ViewChild('datepicker') elementDatePicker: ElementRef;

  constructor(
    private dateApiService: DateApiService
  ) {
    this.date = new Date();
    this.valueDate = new EventEmitter();
  }

  ngOnInit() { }

  ngAfterContentInit() {
    const initDatepicker = new M.Datepicker(this.elementDatePicker.nativeElement, {
      autoClose: true,
      format: 'dd mmm',
      showDaysInNextAndPreviousMonths: true,
      i18n: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul', 'Ags', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      },
      maxDate: new Date(),
      onDraw: datepicker => {
        const dateApi = this.dateApiService.dateApi(datepicker.date);
        this.valueDate.emit(dateApi);
      }
    });
    const instanceDatepicker = new M.Datepicker.getInstance(this.elementDatePicker.nativeElement);
    instanceDatepicker.setDate(this.date);
  }

}
