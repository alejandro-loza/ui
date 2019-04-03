import { Component, OnInit, OnDestroy } from '@angular/core';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { CategoriesService } from '@services/categories/categories.service';
import { EmptyStateService } from '@services/movements/empty-state/empty-state.service';
import { ParamsMovementsService } from '@services/movements/params-movements/params-movements.service';
import { DashboardBeanService } from '@services/dashboard/dashboard-bean.service';

import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { Category } from '@interfaces/category.interface';
import {Movement} from '@interfaces/movement.interface';
import {Observable, Subscription} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {DateApiService} from '@services/date-api/date-api.service';

declare var $: any;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, OnDestroy {
  categoryList: Category[];
  movementList: Movement[];

  isLoading: boolean;
  spinnerBoolean: boolean;
  firstChange: boolean;
  movementsListReady: boolean;
  movementServiceSubscription: Subscription;

  // EMPTY STATE
  imgName: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  showEmptyState: boolean;

  paramsMovements: ParamsMovements;

  constructor(
    private categoryService: CategoriesService,
    private movementService: MovementsService,
    private emptyStateService: EmptyStateService,
    private dateApiService: DateApiService,
    private toastService: ToastService,
    private paramsMovementsService: ParamsMovementsService,
    private dashboardBeanService: DashboardBeanService
  ) {
    this.showEmptyState = false;
    this.isLoading = false;
    this.spinnerBoolean = false;
    this.firstChange = false;
    this.movementsListReady = true;
    this.categoryList = [];
    this.movementList = [];
    this.paramsMovements = { charges: true, deep: true, deposits: true, duplicates: true, maxMovements: 35, offset: 0 };
  }

  ngOnInit() {
    this.fillInformationForEmptyState();
    this.getCategories();
    if (this.dashboardBeanService.getLoadListFromDashboard()) {
      this.getMovementsFromDashboard();
    } else if ( this.movementService.getMovementList ) {
      this.movementList = this.movementService.getMovementList;
      this.paramsMovements.offset = this.movementList.length;
    }
    this.getMovements();
    this.firstChange = true;
  }

  ngOnDestroy() {
    this.dashboardBeanService.setLoadListFromDashboard(false);
    this.dashboardBeanService.setListOfMovementsFromDashboard([]);
  }

  getMovements() {
    if ( this.movementsListReady === true ) {
      this.getMovementFromService();
    }
  }

  getMovementFromService() {
    this.movementsListReady = false;
    this.movementServiceSubscription = this.movementService.getMovements(this.paramsMovements)
      .subscribe(
        res => res,
        err => err,
        () => {
          this.movementList = this.movementService.getMovementList;
          this.paramsMovements.offset += this.paramsMovements.maxMovements;
          if (this.movementList.length !== 0) {
            this.showEmptyState = true;
          } else if ( this.movementList.length === this.movementService.getMovementList.length ) {
            this.movementServiceSubscription.unsubscribe();
          }
          this.isLoading = true;
          this.movementsListReady = true;
        }
      );
  }

  getCategories() {
    this.categoryService.getCategoriesInfo().subscribe(
      (res) => {
        this.categoryList = res.body;
      },
      (err) => {
        this.toastService.setCode = err.status;
        if (err.status === 401) {
          this.toastService.toastGeneral();
          this.getCategories();
        }
        if (err.status === 500) {
          this.toastService.setMessage = '¡Ha ocurrido un error al obterner tus movimiento!';
          this.toastService.toastGeneral();
        }
      }
    );
  }

  getMovementsFromDashboard() {
    this.movementList = this.dashboardBeanService.getListOfMovementsFromDashboard();
    this.showEmptyState = false;
    this.isLoading = false;
    this.spinnerBoolean = true;
  }

  refreshMovement() {
    this.paramsMovements = this.paramsMovementsService.getParamsMovements;
    this.paramsMovements.offset = 0;
    this.movementList = [];
    this.getMovements();
  }

  fillInformationForEmptyState() {
    this.imgName = 'transactions';
    this.title = 'No tienes Movimientos';
    this.description =
      'Al dar de alta tus cuentas, verás una lista con todos tus movimientos. Olvídate de registrar cada uno.';
    this.buttonText = 'Dar de alta una cuenta bancaria';
    this.buttonUrl = '/app/banks';
  }
}
