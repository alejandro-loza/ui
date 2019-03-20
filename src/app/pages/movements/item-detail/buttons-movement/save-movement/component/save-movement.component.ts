import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { ToastInterface } from '@interfaces/toast.interface';
import { Movement } from '@interfaces/movement.interface';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { isNull } from 'util';

@Component({
  selector: 'app-save-movement',
  templateUrl: './save-movement.component.html',
  styleUrls: ['./save-movement.component.css']
})
export class SaveMovementComponent implements OnInit, OnChanges {
  @Input() movement: Movement;
  @Input() keyEnter: boolean;
  @Output() status: EventEmitter<boolean>;
  @Output() keyEnterPressed: EventEmitter<boolean>;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService,
    private cleanerService: CleanerService
  ) {
    this.status = new EventEmitter();
    this.keyEnterPressed = new EventEmitter();
  }

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.keyEnter === true) {
      this.updateMovement();
    }
  }

  updateMovement() {
    if (
      this.movement.customDescription === '' ||
      this.movement.customDescription === null
    ) {
      this.movement.customDescription = this.movement.description;
    }
    if (isNull(this.movement.customDate)) {
      this.movement.customDate = this.movement.date;
    }
    if (isNull(this.movement.customAmount)) {
      this.movement.customAmount = this.movement.amount;
    }
    this.movementService.updateMovement(this.movement).subscribe(
      res => {
        this.toastService.setCode = res.status;
      },
      err => {
        this.toastService.setCode = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral();
          this.updateMovement();
        }
        if (err.status === 404) {
          this.toastService.setMessage = 'No sé encontró tu movimiento';
          this.toastService.toastGeneral();
        }
        if (err.status === 500) {
          this.toastService.setMessage = '¡Ha ocurrido un error al obterner tus movimiento!';
          this.toastService.toastGeneral();
        }
      },
      () => {
        this.cleanerService.cleanBudgetsVariables();
        this.cleanerService.cleanDashboardVariables();
        this.toastService.setMessage = 'Se actualizó su movimiento exitosamente';
        this.toastService.toastGeneral();
        this.status.emit(true);
        this.keyEnterPressed.emit(false);
      }
    );
  }
}
