import {
  Component,
  OnInit,
  Input, EventEmitter, Output,
} from '@angular/core';
import { AccountService } from '@services/account/account.service';
import { Movement } from '@interfaces/movement.interface';
import {MovementsService} from '@services/movements/movements.service';
import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';
import {EditMovementListService} from '@services/movements/edit-list/edit-movement-list.service';
import {ToastService} from '@services/toast/toast.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit {
  @Input() movement: Movement;
  @Output() editMovement: EventEmitter<void>;

  traditionalImgSrc: string;
  manualAccountImgSrc: string;
  accountWithOutDefaults: string;

  constructor(
    private accountService: AccountService,
    private movementsService: MovementsService,
    private statefulMovementService: StatefulMovementsService,
    private editMovementListService: EditMovementListService,
    private toastService: ToastService,
  ) {
    this.editMovement = new EventEmitter();
  }

  ngOnInit() {
    this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults( this.movement.account.type );
    this.manualAccountImgSrc = `assets/media/img/manual_account/${this.accountWithOutDefaults}.svg`;
    this.traditionalImgSrc = `https://cdn.finerio.mx/banks/${this.movement.account.institution.code}_shield.png`;
  }

  onErrorFunc(type: string) {
    this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults(type);
    this.manualAccountImgSrc = `assets/media/img/manual_account/${this.accountWithOutDefaults}.svg`;
  }

  updateMovement(movement: Movement) {
    const auxMovement = { ...movement, duplicated: movement.duplicated };
    this.movementsService.updateMovement(auxMovement).subscribe(
      res => {
        this.statefulMovementService.setMovement = this.movement;
        this.toastService.setCode = res.status;
      },
      (err) => {
        this.toastService.setCode = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral();
          this.updateMovement(auxMovement);
        }
        if (err.status === 500) {
          this.toastService.setMessage = '¡Ha ocurrido un error al crear tu movimiento!';
          this.toastService.toastGeneral();
        }
      },
      () => {
        this.editMovementListService.editMovement();
        this.toastService.setMessage = 'Se editó su movimiento exitosamente';
        this.toastService.toastGeneral();
      }
    );
  }
}
