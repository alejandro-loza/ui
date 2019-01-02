import { AfterViewInit,
         Component,
         ElementRef,
         EventEmitter,
         OnInit,
         Output,
         Renderer2,
         ViewChild, } from       '@angular/core';
import { NgForm } from           '@angular/forms';

import { ConfigService } from    '@services/config/config.service';
import { DateApiService } from   '@services/date-api/date-api.service';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from     '@services/toast/toast.service';

import { retry } from            'rxjs/operators';

import { ParamsMovement } from   '@app/shared/interfaces/paramsMovement.interface';

import * as M from               'materialize-css/dist/js/materialize';

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
    private dateApi: DateApiService,
    private configService: ConfigService,
    private renderer: Renderer2,
    private movementService: MovementsService,
    private toastService: ToastService,
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
    this.movement.type = 'CHARGE';
    this.movement.amount = form.value.amount;
    this.movement.customDate = this.dateApi.dateApi(form.value.date);
    this.movement.customDescription = form.value.description;
    this.movement.date = this.dateApi.dateApi(form.value.date);
    this.movement.description = form.value.description;
    this.movement.duplicated = form.value.duplicated;
    this.movement.type = form.value.typeAmmount;

    this.movementService.createMovement(this.movement)
    .pipe(
      retry(2)
    ).subscribe(
      res => this.createMovementStatus.emit(true),
      err => {
        if ( err.status === 401 ) {
          this.toastService.toastCode401();
          this.movementService.createMovement(this.movement);
        } else {
          this.toastService.setMessage = 'Ocurrió un error al crear tu movimiento';
          this.toastService.toastCode400();
        }
      },
      () => {
        form.reset();
        const instaceModal = M.Modal.getInstance(this.modalElement.nativeElement);
        instaceModal.close();
        this.toastService.toastCode200('Se creó su movimiento exitosamente');
      }
    );
  }

  valueIngresoGasto(type: string = 'CHARGE') {
    if (type === 'CHARGE') {
      this.renderer.removeClass(this.montoSigno.nativeElement, 'deposit');
      this.renderer.addClass(this.montoSigno.nativeElement, 'charge');
    } else {
      this.renderer.removeClass(this.montoSigno.nativeElement, 'charge');
      this.renderer.addClass(this.montoSigno.nativeElement, 'deposit');
    }
    this.typeIngresoGasto = type;
  }

  valueDate(date: Date) {
    this.date = date;
  }

}
