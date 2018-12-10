import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MovementsService } from '@services/movements/movements.service';

import { ParamsMovement } from '@app/shared/interfaces/paramsMovement.interface';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.component.html',
  styleUrls: ['./new-movement.component.css']
})
export class NewMovementComponent implements OnInit, AfterViewInit {
  @ViewChild('duplicated') checkboxDuplicate: ElementRef;
  @ViewChild('monto') montoSigno: ElementRef;
  @ViewChild('modal') modalElement: ElementRef;
  @Output() createMovementStatus: EventEmitter<boolean>;

  date: Date;
  typeIngresoGasto: string;
  duplicated: boolean;
  movement: ParamsMovement = {
    amount: 0,
    balance: 0,
    customDate: '',
    customDescription: '',
    date: '',
    description: '',
    duplicated: this.duplicated,
    type: this.typeIngresoGasto
  };

  constructor(
    private renderer: Renderer2,
    private movementService: MovementsService
  ) {
    this.date = new Date();
    this.createMovementStatus = new EventEmitter();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const initModal = new M.Modal(this.modalElement.nativeElement, {
      startingTop: '10%',
      endingTop: '10%'
    });
  }

  createMovement(form: NgForm) {
    const date = new Date(form.value.date).getDate();
    const datevalue = (Array(2 + 1).join('0') + date).slice(-2);
    this.movement.amount = form.value.amount;
    this.movement.customDate =
      `${form.value.date.getFullYear()}-${form.value.date.getMonth() + 1}-${datevalue}T` +
      `${form.value.date.getHours()}:${form.value.date.getMinutes()}:${form.value.date.getSeconds()}` +
      this.timezone();
    this.movement.customDescription = form.value.description;
    this.movement.date =
      `${form.value.date.getFullYear()}-${form.value.date.getMonth() + 1}-${datevalue}T` +
      `${form.value.date.getHours()}:${form.value.date.getMinutes()}:${form.value.date.getSeconds()}` +
      this.timezone();
    this.movement.description = form.value.description;
    this.movement.duplicated = form.value.duplicated;
    this.movement.type = form.value.typeAmmount;

    console.log(this.movement);

    this.movementService.createMovement(this.movement).subscribe(
      res => {
        this.createMovementStatus.emit(true);
      },
      err => {
        console.log(err);
      },
      () => {
        form.reset();
        const instaceModal = M.Modal.getInstance(this.modalElement.nativeElement);
        instaceModal.close();
        M.toast({
          html: `
          <span>Se creó su movimiento exitosamente</span>
          <button
            class="btn-flat toast-action"
            onClick="
            const toastElement = docu  ment.querySelector('.toast');
            const toastInstance = M.Toast.getInstance(toastElement);
            toastInstance.dismiss();">
            <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
          </button>`,
          classes: 'grey darken-2 grey-text text-lighten-5',
          displayLength: 1500
        });
      }
    );
  }

  valueIngresoGasto(type: string) {
    this.typeIngresoGasto = type;
    if (type === 'CHARGE') {
      this.renderer.removeClass(this.montoSigno.nativeElement, 'deposit');
      this.renderer.addClass(this.montoSigno.nativeElement, 'charge');
    } else {
      this.renderer.removeClass(this.montoSigno.nativeElement, 'charge');
      this.renderer.addClass(this.montoSigno.nativeElement, 'deposit');
    }
  }

  valueDate(date: Date) {
    this.date = date;
  }

  timezone() {
    const tmzOffset = new Date().getTimezoneOffset() / 60;
    const str = '' + tmzOffset;
    const hour = (Array(2 + 1).join('0') + str).slice(-2);
    const tmz = (tmzOffset > 0 ? '-' : '+') + hour + '00';

    return tmz;
  }
}
