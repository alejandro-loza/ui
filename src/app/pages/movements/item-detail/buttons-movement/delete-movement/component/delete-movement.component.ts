import {Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { ToastInterface } from '@interfaces/toast.interface';
import { CleanerService } from '@services/cleaner/cleaner.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-delete-movement',
  templateUrl: './delete-movement.component.html',
  styleUrls: [ './delete-movement.component.css' ]
})
export class DeleteMovementComponent implements OnInit, AfterViewInit {
  @Input() id: string;
  @Output() status: EventEmitter<boolean>;
  @ViewChild('deleteModal') modalElement: ElementRef;

  toastInterface: ToastInterface;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService,
    private cleanerService: CleanerService
  ) {
    this.toastInterface = {};
    this.status = new EventEmitter();
  }

  ngOnInit() {}
  ngAfterViewInit(): void {
    const modalInit = new M.Modal(this.modalElement.nativeElement, {});
  }

  deleteMovement() {
    this.movementService.deleteMovement(this.id).subscribe(
      (res) => {
        this.status.emit(true);
        this.toastInterface.code = res.status;
      },
      (err) => {
        this.toastInterface.code = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral(this.toastInterface);
          this.deleteMovement();
        }
        if (err.status === 404) {
          this.toastInterface.message = 'No sé encontró tu movimiento';
          this.toastService.toastGeneral(this.toastInterface);
        }
        if (err.status === 500) {
          this.toastInterface.message = '¡Ha ocurrido un error al obterner tus movimiento!';
          this.toastService.toastGeneral(this.toastInterface);
        }
      },
      () => {
        this.cleanerService.cleanDashboardVariables();
        this.cleanerService.cleanBudgetsVariables();
        this.toastInterface.message = 'Se borró su movimiento exitosamente';
        this.toastService.toastGeneral(this.toastInterface);
      }
    );
  }
}
