import {Component, OnInit, OnDestroy} from '@angular/core';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { CategoriesService } from '@services/categories/categories.service';
import { EmptyStateService } from '@services/movements/empty-state/empty-state.service';
import { ParamsMovementsService } from '@services/movements/params-movements/params-movements.service';
import { DashboardStatesService } from '@services/dashboard/dashboard-states.service';

import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { Category } from '@interfaces/category.interface';
import {Movement} from '@interfaces/movement.interface';
import {Subscription} from 'rxjs';
import {DateApiService} from '@services/date-api/date-api.service';

declare var $: any;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: [ './movements.component.css' ]
})
export class MovementsComponent implements OnInit, OnDestroy {
  movementList: Movement[];
  categoryList: Category[];

  spinnerBoolean: boolean;
  isLoading: boolean;
  firstChange: boolean;
  movementsListReady: boolean;
  movementServiceSubscription: Subscription;

  private movementsFromDashboard: boolean;
  // EMPTY STATE
  showEmptyState: boolean;
  imgName: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;

  paramsMovements: ParamsMovements;

  constructor(
    private categoryService: CategoriesService,
    private movementService: MovementsService,
    private dateApiService: DateApiService,
    private emptyStateService: EmptyStateService,
    private toastService: ToastService,
    private paramsMovementsService: ParamsMovementsService,
    private dashboardStatesService: DashboardStatesService
  ) {
    this.showEmptyState = false;
    this.isLoading = false;
    this.spinnerBoolean = false;
    this.firstChange = false;
    this.movementsListReady = true;
    this.movementsFromDashboard = false;
    this.categoryList = [];
    this.movementList = [];
    this.paramsMovements = { charges: true, deep: true, deposits: true, duplicates: true, maxMovements: 35, offset: 0 };
  }

  ngOnInit() {
    this.fillInformationForEmptyState();
    this.getCategories();
    if ( this.dashboardStatesService.getLoadListFromDashboard() ) {
      this.getMovementsFromDashboard();
    } else {
      this.getMovements();
    }
    this.firstChange = true;
  }

  ngOnDestroy() {
    this.dashboardStatesService.setLoadListFromDashboard(false);
    this.dashboardStatesService.setListOfMovementsFromDashboard([]);
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
        res => {
          if ( res ) {
            if ( res.body.data.length > 0 ) {
              this.movementList = this.movementService.getMovementList;
            }
          } else {
            this.movementServiceSubscription.unsubscribe();
            this.spinnerBoolean = true;
          }
          return res;
        },
        err => err,
        () => {
          this.paramsMovements.offset += this.paramsMovements.maxMovements;
          if (this.movementList.length !== 0) {
            this.showEmptyState = true;
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
    this.movementList = this.dashboardStatesService.getListOfMovementsFromDashboard();
    this.movementsListReady = false;
    this.isLoading = true;
    this.spinnerBoolean = true;
    if (this.movementList.length !== 0) {
      this.showEmptyState = true;
    }
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
