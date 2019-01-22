import { Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter, } from          '@angular/core';
import { NgModel } from         '@angular/forms';

import { DateApiService } from  '@services/date-api/date-api.service';

import * as M from              'materialize-css/dist/js/materialize';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, AfterContentInit {
  @Input() date: Date;
  @Output() valueDate: EventEmitter<Date>;
  @ViewChild('datepicker') elDatePickker: ElementRef;
  @ViewChild('inputDatepicker') inputDatepicker: NgModel;

  constructor( private dateApiService: DateApiService ) {
    this.valueDate = new EventEmitter();
  }

  ngOnInit() { }

  ngAfterContentInit() {
    const initDatepicker = new M.Datepicker(this.elDatePickker.nativeElement, {
      format: `dd - mmm`,
      showClearBtn: true,
      showDaysInNextAndPreviousMonths: true,
      i18n: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul', 'Ags', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      },
      setDefaultDate: true,
      defaultDate: new Date(),
      maxDate: new Date(),
      onDraw: datepicker => {
        this.valueDate.emit(datepicker.date);
      }
    });
  }

}
