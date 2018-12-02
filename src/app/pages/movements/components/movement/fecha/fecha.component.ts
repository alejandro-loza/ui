import { Component,
         OnInit,
         AfterContentInit,
         ElementRef,
         ViewChild,
         Input,
         Renderer2,
         Output,
         EventEmitter, } from       '@angular/core';
import { FormControl } from     '@angular/forms';
import * as M from              'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit, AfterContentInit {
  @Input() date: Date;
  @Output() valueDate: EventEmitter<Date>;
  @ViewChild('datepicker') elDatePickker: ElementRef;
  dateMovement = new FormControl();

  constructor( private renderer: Renderer2 ) {
    this.valueDate = new EventEmitter();
  }

  ngOnInit() {
    this.dateMovement.setValue(new Date(this.date).toLocaleDateString(navigator.language, {day: '2-digit', month: 'long'}));
  }

  ngAfterContentInit() {
    const initDatepicker = new M.Datepicker(this.elDatePickker.nativeElement, {
      format: 'dd-mmmm'.toLowerCase(),
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
      defaultDate: this.date,
      maxDate: new Date(),
      onDraw: datepicker => {
        this.date = datepicker.date;
      },
      onClose: datepicker => {
        this.valueDate.emit(this.date);
      }
    });
    const instanceDatePicker = M.Datepicker.getInstance(this.elDatePickker.nativeElement);
  }

  setDate() {
    this.valueDate.emit(this.date);
  }

}
