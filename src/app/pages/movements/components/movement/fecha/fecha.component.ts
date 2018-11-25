import { Component,
         OnInit,
         AfterContentInit,
         ElementRef,
         ViewChild,
         Input,
         Renderer2 } from       '@angular/core';
import { FormControl } from     '@angular/forms';
import * as M from              'materialize-css/dist/js/materialize';

declare const $: any;
@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit, AfterContentInit {
  @Input() fecha: Date;
  @ViewChild('datepicker') elDatePickker: ElementRef;
  dateMovement = new FormControl();
  constructor( private renderer: Renderer2 ) { }

  ngOnInit() {
    this.dateMovement.setValue(new Date(this.fecha).toLocaleDateString(navigator.language, {day: '2-digit', month: 'long'}));
  }

  ngAfterContentInit() {
    const initDatepicker = new M.Datepicker(this.elDatePickker.nativeElement, {
      format: 'dd-mmmm',
      showClearBtn: true,
      showDaysInNextAndPreviousMonths: true,
      i18n: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul', 'Ags', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
      },
      setDefaultDate: true,
      defaultDate: this.fecha
    });
    const instanceDatePicker = M.Datepicker.getInstance(this.elDatePickker.nativeElement);
  }

}
