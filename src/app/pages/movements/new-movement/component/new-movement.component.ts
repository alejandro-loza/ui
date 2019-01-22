import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";

import { DateApiService } from "@services/date-api/date-api.service";
import { MovementsService } from "@services/movements/movements.service";
import { ToastService } from "@services/toast/toast.service";

import { ToastInterface } from "@interfaces/toast.interface";
import { ParamsMovement } from "@interfaces/paramsMovement.interface";

import * as M from "materialize-css/dist/js/materialize";
import { retry } from "rxjs/operators";
@Component({
  selector: "app-new-movement",
  templateUrl: "./new-movement.component.html",
  styleUrls: ["./new-movement.component.css"]
})
export class NewMovementComponent implements OnInit, AfterViewInit {
  @ViewChild("duplicated") checkboxDuplicate: ElementRef;
  @ViewChild("modal") modalElement: ElementRef;
  @ViewChild("datepicker") elDatePickker: ElementRef;

  @Output() createMovementStatus: EventEmitter<boolean>;

  newMovement: ParamsMovement;
  date: Date;
  toastInterface: ToastInterface;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService
  ) {
    this.newMovement = {
      type: "charge"
    };
    this.date = new Date();
    this.createMovementStatus = new EventEmitter();
    this.toastInterface = { code: null, message: null };
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const initModal = new M.Modal(this.modalElement.nativeElement, {
      startingTop: "0%"
    });
    const initDatepicker = new M.Datepicker(this.elDatePickker.nativeElement, {
      autoClose: true,
      format: `dd - mmm`,
      showDaysInNextAndPreviousMonths: true,
      i18n: {
        months: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ],
        monthsShort: [
          "Ene",
          "Feb",
          "Marz",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ags",
          "Sep",
          "Oct",
          "Nov",
          "Dic"
        ],
        weekdays: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado"
        ],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"]
      },
      setDefaultDate: true,
      defaultDate: new Date(),
      maxDate: new Date(),
      onDraw: datepicker => {
        this.date = datepicker.date;
      }
    });
  }

  createMovement(form: NgForm) {
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
              "¡Ha ocurrido un error al obterner tus movimiento!";
            this.toastService.toastGeneral(this.toastInterface);
          }
        },
        () => {
          form.reset();
          const instaceModal = M.Modal.getInstance(
            this.modalElement.nativeElement
          );
          instaceModal.close();
          this.toastInterface.message = "Se creó su movimiento exitosamente";
          this.toastService.toastGeneral(this.toastInterface);
        }
      );
  }

  valueType(ngModel: string) {
    if (ngModel === "deposit") {
      document.getElementById("charge").classList.remove("active");
      document.getElementById("deposit").classList.add("active");
    } else {
      document.getElementById("deposit").classList.remove("active");
      document.getElementById("charge").classList.add("active");
    }
    this.newMovement.type = ngModel;
  }

  valueDate(date: Date) {
    this.date = date;
  }
}
