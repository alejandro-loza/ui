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

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService,
    private cleanerService: CleanerService
  ) {
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
        this.toastService.setCode = res.status;
      },
      (err) => {
        this.toastService.setCode = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral();
          this.deleteMovement();
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
        this.cleanerService.cleanDashboardVariables();
        this.cleanerService.cleanBudgetsVariables();
        this.toastService.setMessage =  'Se borró su movimiento exitosamente';
        this.toastService.toastGeneral();
      }
    );
  }
}
