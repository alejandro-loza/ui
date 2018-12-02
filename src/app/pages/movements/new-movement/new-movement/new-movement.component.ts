import { Component,
         OnInit,
         ViewChild,
         ElementRef,
         Renderer2 } from         '@angular/core';
import { NgForm } from            '@angular/forms';
import { NewMovement } from       '@interfaces/newMovement.interface';
import { MovementsService } from  '@services/movements/movements.service';

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.component.html',
  styleUrls: ['./new-movement.component.css']
})
export class NewMovementComponent implements OnInit {
  @ViewChild('duplicated') checkboxDuplicate: ElementRef;
  @ViewChild('monto') montoSigno: ElementRef;

  date: Date;
  typeIngresoGasto: string;
  duplicated: boolean;
  movement: NewMovement = {
    amount: 0,
    balance: 0,
    customDate: this.date,
    customDescription: '',
    date: this.date,
    description: '',
    duplicated: this.duplicated,
    type: this.typeIngresoGasto
  };

  constructor(
    private renderer: Renderer2,
    private movementService: MovementsService
  ) {
    this.date = new Date();
  }

  ngOnInit() { }

  createMovement(form: NgForm) {
    this.movement.amount = form.value.amount;
    this.movement.customDate = form.value.date.toISOString();
    this.movement.customDescription = form.value.description;
    this.movement.date = form.value.date.toISOString();
    this.movement.description = form.value.description;
    this.movement.duplicated = form.value.duplicated;
    this.movement.type = form.value.typeAmmount;

    console.log(this.movement);

    this.movementService.newMovement(this.movement).subscribe(
      res => console.log(res),
      err => console.log(err),
      () => { }
    )
  }

  valueIngresoGasto(type: string) {
    this.typeIngresoGasto = type;
    if ( type === 'CHARGE') {
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

}
