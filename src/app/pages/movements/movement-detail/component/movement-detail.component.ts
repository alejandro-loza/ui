import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';

import { ToastInterface } from '@interfaces/toast.interface';
import { Movement } from '@interfaces/movement.interface';

import { ParamsMovement } from '@interfaces/paramsMovement.interface';

@Component({
  selector: 'app-movement-detail',
  templateUrl: './movement-detail.component.html',
  styleUrls: ['./movement-detail.component.css']
})
export class MovementDetailComponent implements OnInit {
  @Input() movement: Movement;
  @Input() auxMovement: ParamsMovement;
  @Input() statusUpdate: boolean;

  @Output() status: EventEmitter<boolean>;

  toastInterface: ToastInterface;

  flagInfo: boolean;

  constructor(
    private movementService: MovementsService,
    private toastService: ToastService
  ) {
    this.status = new EventEmitter();
    this.toastInterface = { code: null, classes: null, message: null };
    this.flagInfo = false;
  }

  ngOnInit() { }

}
