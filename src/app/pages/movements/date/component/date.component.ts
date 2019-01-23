import { Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter, } from          '@angular/core';

import { DateApiService } from  '@services/date-api/date-api.service';

declare var M;
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, AfterContentInit {
  @Input() date: Date;
  @Input() name: string;
  @Input() classes: string;
  @Input() type: string;

  @Output() valueDate: EventEmitter<Date>;

  @ViewChild('datepicker') elementDatePicker: ElementRef;

  options = {
    day: '2-digit',
    month: 'short'
  }

  constructor( private dateApiService: DateApiService ) {
    this.valueDate = new EventEmitter();
  }

  ngOnInit() { }

  ngAfterContentInit() {
    const initDatepicker = new M.Datepicker(this.elementDatePicker.nativeElement, {
      autoClose: true,
      format: 'dd mmm',
      showClearBtn: true,
      showDaysInNextAndPreviousMonths: true,
      i18n: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul', 'Ags', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        cancel: 'Cancelar',
        clear: 'Borrar'
      },
      maxDate: new Date(),
      onDraw: () => {
        this.valueDate.emit(this.date);
      },
      onClose: () => {
      }
    });
  }

  dateFormat(date: Date) {
    const dateFormat = date;
    let format = new Date(dateFormat).toLocaleDateString(window.navigator.language, this.options).toString().toLowerCase();
    const lastChars = format[ format.length - 2 ];
    format = format.replace(format[format.length - 2], lastChars.toUpperCase() );
    return format;
  }

}
