import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ElementRef,
  ViewChild,
  Input,
  OnChanges
} from "@angular/core";

import { MovementsService } from "@services/movements/movements.service";
import { ToastService } from "@services/toast/toast.service";

import { ParamsMovements } from "@interfaces/paramsMovements.interface";
import { Movement } from "@interfaces/movement.interface";
import { ToastInterface } from "@interfaces/toast.interface";

import { retry } from "rxjs/operators";

import * as M from "materialize-css/dist/js/materialize";
import { ParamsService } from "@services/movements/params/params.service";

declare var $: any;

@Component({
  selector: "app-movement",
  templateUrl: "./movement.component.html",
  styleUrls: ["./movement.component.css"]
})
export class MovementComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild("collapsible") elementCollapsible: ElementRef;
  @Input() status: boolean;
  instanceCollapsible;
  spinnerBoolean: boolean;

  paramsMovements: ParamsMovements;
  movementsList: Movement[];
  toastInterface: ToastInterface;

  constructor(
    private renderer: Renderer2,
    private paramsService: ParamsService,
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
    this.spinnerBoolean = true;
  }

  ngOnInit() {
    this.getMovements(this.paramsMovements);
    window.addEventListener("scroll", this.offsetMovement, true);
  }

  ngOnChanges() {
    if (this.status === true) {
      this.paramsMovements.offset = 0;
      this.movementsList = [];
      this.getMovements(this.paramsMovements);
    }
    this.status = false;
  }

  ngAfterViewInit() {
    let initCollapsible = new M.Collapsible(
      this.elementCollapsible.nativeElement,
      {}
    );
  }

  ngOnDestroy() {
    window.removeEventListener("scroll", this.offsetMovement, true);
  }

  /**
   * @function offsetMovement() - It's anonymous functions, its used for eventListener Scroll
   */

  offsetMovement = () => {
    const scrollVertical = window.scrollY;
    let scrollLimit: number;
    scrollLimit = $(document).height() - $(window).height();
    if (scrollVertical >= scrollLimit) {
      this.spinnerBoolean = true;
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
          this.spinnerBoolean = true;
          if (err.status === 401) {
            this.toastService.toastGeneral(this.toastInterface);
          }
          if (err.status === 500) {
            this.toastInterface.message =
              "¡Ha ocurrido un error al obterner tus movimiento!";
            this.toastService.toastGeneral(this.toastInterface);
          }
        },
        () => {
          this.spinnerBoolean = false;
        }
      );
    this.paramsMovements.offset =
      this.paramsMovements.offset + this.paramsMovements.maxMovements;
  }
}
