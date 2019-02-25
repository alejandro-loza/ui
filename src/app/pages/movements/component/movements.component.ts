import { Component, OnInit, OnDestroy } from '@angular/core';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { CategoriesService } from '@services/categories/categories.service';
import { DateApiService } from '@services/date-api/date-api.service';

import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { Movement } from '@interfaces/movement.interface';
import { ToastInterface } from '@interfaces/toast.interface';

import { retry } from 'rxjs/operators';
import { Category } from '@interfaces/category.interface';
import { isUndefined } from 'util';

declare var $: any;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, OnDestroy {
  paramsMovements: ParamsMovements;
  movementList: Movement[];
  categoryList: Category[];
  toast: ToastInterface;

  status: boolean;
  filterflag: boolean;
  spinnerBoolean: boolean;
  auxSize: number;
  statusMovements: boolean;

  constructor(
    private categoryService: CategoriesService,
    private movementService: MovementsService,
    private dateApiService: DateApiService,
    private toastService: ToastService
  ) {
    this.status = false;
    this.spinnerBoolean = true;
    this.filterflag = false;
    this.statusMovements = false;
    this.auxSize = 0;
    this.movementList = [];
    this.toast = {};
    this.paramsMovements = {
      charges: true,
      deep: true,
      deposits: true,
      duplicates: true,
      maxMovements: 35,
      offset: 0
    };
  }

  ngOnInit() {
    this.getCategories();
    this.getMovements();
    window.addEventListener('scroll', this.offsetMovement, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.offsetMovement, true);
  }

  /**
   * @function statusMovement() - Esto es la función del output en los componentes. Esto es para notificar a los demás componentes
   * @param {boolean} status - La bandera que actualiza la variable status
   *
   * En esta función se le agregó un setTimeout() debido a que la comunicación entre componentes es tan rápida que manda error de que los valores
   * se han cambiado antes de ser enviados, y la única forma es enviar un estado genérico en la app ( Redux/RXJS (reduce) ) o enviando un
   * setTimeout
   */
  statusMovement(status: boolean) {
    setTimeout(() => {
      this.status = status;
      this.filterflag = false;
    }, 0);
    this.refreshMovement();
  }

  /**
   * @function offsetMovement() - It's anonymous functions, its used for eventListener Scroll
   */

  offsetMovement = () => {
    if (this.spinnerBoolean === false) {
      const scrollVertical = window.scrollY;
      let scrollLimit: number;
      scrollLimit = $(document).height() - $(window).height();
      if (scrollVertical >= scrollLimit) {
        this.spinnerBoolean = true;
        this.getMovements();
      }
    }
  }

  getMovements() {
    this.movementService.getMovements(this.paramsMovements).subscribe(
      res => {
        // Se le asigna el tamaño de la lista a la variable _auxSize_
        this.auxSize = res.body.data.length;
        this.validateAllMovements();

        // Se le agregan propiedades a los elementos de la lista y se agregan a la lista de movimientos
        res.body.data.forEach(movement => {
          movement['formatDate'] = this.dateApiService.dateFormatMovement(
            movement.customDate
          );
          movement['editAvailable'] = false;
          this.movementList.push(movement);
        });
      },
      err => {
        this.toast.code = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral(this.toast);
          this.getMovements();
        }
        if (err.status === 500) {
          this.toast.message =
            '¡Ha ocurrido un error al obterner tus movimiento!';
          this.toastService.toastGeneral(this.toast);
        }
      },
      () => {
        this.spinnerBoolean = false;
        this.paramsMovements.offset += this.paramsMovements.maxMovements;
      }
    );
  }

  getCategories() {
    this.categoryService.getCategoriesInfo().subscribe(
      res => {
        this.categoryList = res.body.data;
      },
      err => {
        this.toast.code = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral(this.toast);
          this.getCategories();
        }
        if (err.status === 500) {
          this.toast.message =
            '¡Ha ocurrido un error al obterner tus movimiento!';
          this.toastService.toastGeneral(this.toast);
        }
      }
    );
  }

  refreshMovement() {
    this.paramsMovements.offset = 0;
    this.movementList = [];
    this.getMovements();
  }

  validateAllMovements() {
    // Si la variable _auxSize_ es menor a el parametro _maxMocements_ ó igual a cero,
    // Se manda un toast y se remueve la función del scroll.
    if (
      this.auxSize < this.paramsMovements.maxMovements ||
      this.auxSize === 0
    ) {
      window.removeEventListener('scroll', this.offsetMovement, true);
      this.toast = {
        code: 200,
        message: 'Hemos cargamos todos tus movimientos'
      };
      this.toastService.toastGeneral(this.toast);
    }
  }
}
