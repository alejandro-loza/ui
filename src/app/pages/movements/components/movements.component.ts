import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgModel } from '@angular/forms';

import { DateApiService } from '@services/date-api/date-api.service';
import { MovementsService } from '@services/movements/movements.service';
import { ParamsService } from '@services/movements/params/params.service';
import { ToastService } from '@services/toast/toast.service';

import { Movement } from '@interfaces/movement.interface';
import { ParamsMovement } from '@interfaces/paramsMovement.interface';
import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { ToastInterface } from '@interfaces/toast.interface';

import { retry } from 'rxjs/operators';

import * as M from 'materialize-css/dist/js/materialize';

declare const $: any;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('collapsible') elcollapsible: ElementRef;
  @ViewChild('collapsibleBody') eleCollapsibleBody: ElementRef;
  @ViewChild('spinner') elSpinner: ElementRef;
  @ViewChild('inputDescription') inputDescription: NgModel;

  description: string;
  ingresogasto: string;
  instanceCollapsible;
  editMovementFlag: boolean;
  filterflag: boolean;
  editMovement: ParamsMovement;
  toastInterface: ToastInterface;

  movementsList: Movement[];
  paramsMovements: ParamsMovements;

  constructor(
    public renderer: Renderer2,
    private dateApiService: DateApiService,
    private movementsService: MovementsService,
    private toastService: ToastService
  ) {
    this.paramsMovements = {
      charges: true,
      deep: true,
      deposits: true,
      duplicates: true,
      maxMovements: 35,
      offset: 0
    };
    this.editMovement = {
      amount: 0,
      balance: 0,
      customDate: this.dateApiService.dateApi(new Date()),
      customDescription: '',
      date: this.dateApiService.dateApi(new Date()),
      description: '',
      duplicated: false,
      id: '',
      type: ''
    };
    this.toastInterface = { code: null, message: null, classes: null };
    this.editMovementFlag = false;
    this.filterflag = false;
    this.movementsList = [];
  }

  ngOnInit() {
    this.getMovements(this.paramsMovements);
    this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'block');
    window.addEventListener('scroll', this.offsetMovement, true);
  }

  ngAfterViewInit() {
    const initCollapsible = new M.Collapsible(
      this.elcollapsible.nativeElement,
      {}
    );
    this.instanceCollapsible = M.Collapsible.getInstance(
      this.elcollapsible.nativeElement
    );
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.offsetMovement, true);
  }

  /**
   * @function offsetMovement() - It's anonymous functions, its used for eventListener Scroll
   */

  offsetMovement = () => {
    const scrollVertical = window.scrollY;
    let scrollLimit: number;
    scrollLimit = $(document).height() - $(window).height();
    if (scrollVertical >= scrollLimit) {
      this.renderer.setStyle(this.elSpinner.nativeElement, 'display', 'block');
      this.getMovements(this.paramsMovements);
    }
  }

  getMovements(paramsMovements: ParamsMovements) {
    this.movementsService
      .getMovements(paramsMovements)
      .pipe(retry(2))
      .subscribe(
        res => (this.movementsList = res.body.data),
        err => {
          this.toastInterface.code = err.status;
          if (err.status === 401) {
            this.toastService.toastGeneral(this.toastInterface);
          }
          if (err.status === 500) {
            this.toastInterface.message =
              '¡Ha ocurrido un error al obterner tus movimiento!';
            this.toastService.toastGeneral(this.toastInterface);
          }
        },
        () => {
          this.renderer.setStyle(
            this.elSpinner.nativeElement,
            'display',
            'none'
          );
        }
      );
    this.paramsMovements.offset =
      this.paramsMovements.offset + this.paramsMovements.maxMovements;
  }

  /* Collapsible methods  */

  collapsibleOpen(index: number) {
    this.instanceCollapsible.destroy();
    this.instanceCollapsible.open(index);
    if ( this.editMovementFlag === true) {
      this.editMovement = this.movementsList[index];
      this.editMovementFlag = false;
    }
  }

  collapsibleClose(index: number) {
    this.editMovementFlag = false;
    this.instanceCollapsible.destroy();
    this.instanceCollapsible.close(index);
  }

  /* EventsEmitter for components */

  movementActionEmit(flag: boolean) {
    if (flag === true) {
      this.movementsList = [];
      this.getMovements(this.paramsMovements);
    }
  }

  movementTypeEmit(type: string) {
    this.ingresogasto = type;
    this.editMovement.type = type;
    this.editMovementFlag = true;
  }

  editDateMovement(date: Date) {
    this.editMovement.customDate = this.dateApiService.dateApi(date);
    this.editMovementFlag = true;
  }

  editDescriptionMovement(description: string) {
    this.editMovement.customDescription = description;
    this.editMovementFlag = true;
  }

  editAmountMovement(amount: number) {
    this.editMovement.amount = amount;
    this.editMovementFlag = true;
  }

  editDuplicatedMovement(duplicated: boolean) {
    this.editMovement.duplicated = duplicated;
    this.editMovementFlag = true;
  }
}
