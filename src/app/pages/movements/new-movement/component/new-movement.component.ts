import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  Renderer2
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';

import { ToastInterface } from '@interfaces/toast.interface';
import { ParamsMovement } from '@interfaces/paramsMovement.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { retry } from 'rxjs/operators';
@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.component.html',
  styleUrls: ['./new-movement.component.css']
})
export class NewMovementComponent implements OnInit, AfterViewInit {
  @ViewChild('duplicated') checkboxDuplicate: ElementRef;
  @ViewChild('modal') modalElement: ElementRef;
  @ViewChild('datepicker') elDatePickker: ElementRef;
  @ViewChild('btnSubmit') buttonSubmit: ElementRef;

  @Output() createMovementStatus: EventEmitter<boolean>;

  newMovement: ParamsMovement;
  formatDate: string;
  date: Date;
  toastInterface: ToastInterface;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService,
    private renderer: Renderer2
  ) {
    this.newMovement = {
      type: 'charge'
    };
    this.date = new Date();
    this.createMovementStatus = new EventEmitter();
    this.toastInterface = { code: null, message: null };
  }

  ngOnInit() {
    this.formatDate = this.movementService.dateFormat(this.date);
  }

  ngAfterViewInit() {
    const initModal = new M.Modal(this.modalElement.nativeElement, {
      startingTop: '0%'
    });
  }

  createMovement(form: NgForm) {
    this.renderer.addClass(this.buttonSubmit.nativeElement, 'disabled');
    form.value.date = this.date;
    form.value.type = this.newMovement.type;
    this.movementService
      .createMovement(form.value)
      .pipe(retry(2))
      .subscribe(
        res => {
          this.createMovementStatus.emit(true);
          this.toastInterface.code = res.status;
        },
        err => {
          this.toastInterface.code = err.status;
          if (err.status === 401) {
            this.toastService.toastGeneral(this.toastInterface);
          }
          if (err.status === 500) {
            this.toastInterface.message =
              '¡Ha ocurrido un error al obterner tus movimiento!';
            this.toastService.toastGeneral(this.toastInterface);
          }
        },
        () => {
          form.reset();
          this.date = new Date();
          const instaceModal = M.Modal.getInstance(
            this.modalElement.nativeElement
          );
          instaceModal.close();
          this.renderer.removeClass(this.buttonSubmit.nativeElement, 'disabled');
          this.toastInterface.message = 'Se creó su movimiento exitosamente';
          this.toastService.toastGeneral(this.toastInterface);
        }
      );
  }

  valueType(ngModel: string) {
    if (ngModel === 'deposit') {
      document.getElementById('charge').classList.remove('active');
      document.getElementById('deposit').classList.add('active');
    } else {
      document.getElementById('deposit').classList.remove('active');
      document.getElementById('charge').classList.add('active');
    }
    this.newMovement.type = ngModel;
  }

  valueDate(date: Date) {
    this.newMovement.date = date;
  }
}
