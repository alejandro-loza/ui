import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { Movement } from '@interfaces/movement.interface';
import { ParamsMovement } from '@interfaces/paramsMovement.interface';
import { ToastInterface } from '@interfaces/toast.interface';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
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
