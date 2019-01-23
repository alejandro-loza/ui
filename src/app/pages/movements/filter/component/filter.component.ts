import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParamsService } from '@services/movements/params/params.service';
import { ViewChild } from '@angular/core';

import { M } from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @ViewChild('startDate') elDatePickker: ElementRef;
  @Input() charges: boolean;
  @Input() deposits: boolean;
  @Input() duplicates: boolean;

  @Output() filterMovementStatus: EventEmitter<boolean>;

  date: Date;

  constructor(private paramsService: ParamsService) {
    this.filterMovementStatus = new EventEmitter();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const initDatepicker = new M.Datepicker(this.elDatePickker.nativeElement, {
      autoClose: true,
      format: `dd - mmm - yyyy`,
      showDaysInNextAndPreviousMonths: true,
      i18n: {
        months: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ],
        monthsShort: [
          'Ene',
          'Feb',
          'Marz',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ags',
          'Sep',
          'Oct',
          'Nov',
          'Dic'
        ],
        weekdays: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miercoles',
          'Jueves',
          'Viernes',
          'Sabado'
        ],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
      },
      setDefaultDate: true,
      defaultDate: new Date(),
      maxDate: new Date(),
      onDraw: datepicker => {
        this.date = datepicker.date;
      }
    });
  }

  filterMovement(ngform: NgForm) {
    this.paramsService.setCharges = ngform.value.charges;
    this.paramsService.setDeposits = ngform.value.deposits;
    this.paramsService.setDuplicates = ngform.value.duplicates;
    this.filterMovementStatus.emit(true);
  }
}
