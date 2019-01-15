import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ElementRef,
  ViewChild
} from '@angular/core';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';

import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { Movement } from '@interfaces/movement.interface';
import { ToastInterface } from '@interfaces/toast.interface';

import { retry } from 'rxjs/operators';

import * as M from 'materialize-css/dist/js/materialize';

declare var $: any;

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('collapsible') elcollapsible: ElementRef;
  @ViewChild('collapsibleBody') eleCollapsibleBody: ElementRef;

  instanceCollapsible: M.Collapsible;

  paramsMovements: ParamsMovements;
  movementsList: Movement[];
  toastInterface: ToastInterface;

  constructor(
    public renderer: Renderer2,
    private movementsService: MovementsService,
    private toastService: ToastService
  ) {
    this.toastInterface = { code: null, message: null, classes: null };
    this.paramsMovements = {
      charges: true,
      deep: true,
      deposits: true,
      duplicates: true,
      maxMovements: 35,
      offset: 0
    };
    this.movementsList = [];
  }

  ngOnInit() {
    this.getMovements(this.paramsMovements);
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
      this.getMovements(this.paramsMovements);
    }
  };

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
        () => {}
      );
    this.paramsMovements.offset =
      this.paramsMovements.offset + this.paramsMovements.maxMovements;
  }
}
