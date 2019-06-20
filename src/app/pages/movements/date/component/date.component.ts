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
import {ActivatedRoute} from '@angular/router';

import { DateApiService } from '@services/date-api/date-api.service';
import * as M from 'materialize-css/dist/js/materialize';
import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: [ './date.component.css' ]
})
export class DateComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() date: Date;
  @Input() name: string;
  @Input() classes: string;
  @Input() dateID: string;
  @Input() reset: boolean;

  private id: string;
  formatDate: string;

  @Output() dateChange: EventEmitter<Date>;

  @ViewChild('datepicker', {static: false}) elementDatePicker: ElementRef;

  constructor(
    private dateApiService: DateApiService,
    private activatedRoute: ActivatedRoute,
    private statefulMovementService: StatefulMovementsService,
  ) {
    this.activatedRoute.params.subscribe( res =>  this.id = res.id );
    this.dateChange = new EventEmitter();
  }

  ngOnInit() {
    if (this.id === 'new-movement') {
      this.formatDate = 'Otro...';
      this.date = new Date();
    } else {
      this.formatDate = this.dateApiService.dateFormatMovement(this.statefulMovementService.getMovement.customDate);
    }
  }

  ngOnChanges() {
    if (this.reset) {
      this.formatDate = 'Otro...';
      this.date = new Date();
    }
  }

  ngAfterContentInit() {
    const initDatepicker = new M.Datepicker(this.elementDatePicker.nativeElement, {
      autoClose: true,
      container: 'body',
      defaultDate: new Date(),
      format: 'dd mmm',
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
        this.dateChange.emit(datepicker.date);
      },
      showDaysInNextAndPreviousMonths: true,
      setDefaultDate: true
    });
    const instanceDatepicker = M.Datepicker.getInstance(this.elementDatePicker.nativeElement);
    instanceDatepicker.setDate(this.date);
    instanceDatepicker.gotoDate(this.date);
  }
}
